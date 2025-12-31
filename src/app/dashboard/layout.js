'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Brain,
  Bell,
  ChevronDown,
  Check,
  Trash2,
  ExternalLink
} from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { authApi, userApi, notificationsApi } from '@/lib/api';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [userData, setUserData] = useState(null);
  const [planData, setPlanData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);
  const notificationRef = useRef(null);

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  // Load user data on mount
  useEffect(() => {
    loadUserData();
    loadNotifications();
    loadUnreadCount();
    
    // Poll for new notifications every 30 seconds
    const interval = setInterval(() => {
      loadUnreadCount();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const loadUserData = async () => {
    try {
      const [profileResponse, planResponse] = await Promise.all([
        userApi.getProfile(),
        userApi.getPlan()
      ]);
      
      setUserData(profileResponse.profile);
      setPlanData(planResponse.plan);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to load user data:', error);
      }
    }
  };

  const loadNotifications = async () => {
    try {
      setIsLoadingNotifications(true);
      const data = await notificationsApi.getNotifications(false, 10, 0);
      setNotifications(data.notifications || []);
      setUnreadCount(data.unread_count || 0);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to load notifications:', error);
      }
    } finally {
      setIsLoadingNotifications(false);
    }
  };

  const loadUnreadCount = async () => {
    try {
      const data = await notificationsApi.getUnreadCount();
      setUnreadCount(data.unread_count || 0);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to load unread count:', error);
      }
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await notificationsApi.markAsRead(notificationId);
      setNotifications(notifications.map(n => 
        n.id === notificationId ? { ...n, is_read: true } : n
      ));
      setUnreadCount(Math.max(0, unreadCount - 1));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationsApi.markAllAsRead();
      setNotifications(notifications.map(n => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      await notificationsApi.deleteNotification(notificationId);
      const notification = notifications.find(n => n.id === notificationId);
      setNotifications(notifications.filter(n => n.id !== notificationId));
      if (notification && !notification.is_read) {
        setUnreadCount(Math.max(0, unreadCount - 1));
      }
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  const handleNotificationClick = (notification) => {
    // Mark as read if unread
    if (!notification.is_read) {
      handleMarkAsRead(notification.id);
    }
    
    // Close dropdown
    setShowNotifications(false);
    
    // Navigate if action URL exists
    if (notification.action_url) {
      router.push(notification.action_url);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const navItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Briefcase className="w-5 h-5" />, label: 'Jobs', path: '/dashboard/jobs' },
    { icon: <Users className="w-5 h-5" />, label: 'Candidates', path: '/dashboard/candidates' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/dashboard/settings' },
  ];

  const handleLogout = async () => {
    await authApi.logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#0A0E27] text-white">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-[#0F1433] border-b border-white/10 z-50">
        <div className="h-full px-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FF6B35] to-[#F77F00] rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">HireLens</span>
              <span className="text-xs font-mono text-gray-400">AI</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  if (!showNotifications) loadNotifications();
                }}
                className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-[#FF6B35] text-white text-xs rounded-full flex items-center justify-center px-1 font-semibold">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute top-full right-0 mt-2 w-96 max-h-[500px] overflow-hidden bg-[#0F1433] rounded-xl shadow-2xl border border-white/10 z-50">
                  <div className="sticky top-0 bg-[#0F1433] p-4 border-b border-white/10 flex items-center justify-between">
                    <h3 className="font-semibold">Notifications</h3>
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllAsRead}
                        className="text-xs text-[#06A77D] hover:underline"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="max-h-[400px] overflow-y-auto">
                    {isLoadingNotifications ? (
                      <div className="p-8 text-center text-gray-400">
                        <div className="animate-spin w-6 h-6 border-2 border-[#FF6B35] border-t-transparent rounded-full mx-auto"></div>
                      </div>
                    ) : notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${
                            !notification.is_read ? 'bg-[#FF6B35]/5' : ''
                          }`}
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <div className="flex items-start justify-between space-x-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className={`text-sm font-medium truncate ${
                                  !notification.is_read ? 'text-white' : 'text-gray-300'
                                }`}>
                                  {notification.title}
                                </h4>
                                {!notification.is_read && (
                                  <span className="w-2 h-2 bg-[#FF6B35] rounded-full flex-shrink-0"></span>
                                )}
                              </div>
                              <p className="text-xs text-gray-400 line-clamp-2">
                                {notification.message}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-gray-500">
                                  {new Date(notification.created_at).toLocaleDateString()} {new Date(notification.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                {notification.action_url && (
                                  <ExternalLink className="w-3 h-3 text-gray-500" />
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-1 flex-shrink-0">
                              {!notification.is_read && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleMarkAsRead(notification.id);
                                  }}
                                  className="p-1 hover:bg-white/10 rounded transition-colors"
                                  title="Mark as read"
                                >
                                  <Check className="w-4 h-4 text-[#06A77D]" />
                                </button>
                              )}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteNotification(notification.id);
                                }}
                                className="p-1 hover:bg-white/10 rounded transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4 text-red-400" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-gray-400">
                        <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No notifications yet</p>
                      </div>
                    )}
                  </div>

                  {notifications.length > 0 && (
                    <div className="sticky bottom-0 bg-[#0F1433] p-3 border-t border-white/10">
                      <button
                        onClick={() => router.push('/dashboard/notifications')}
                        className="w-full text-sm text-center text-[#FF6B35] hover:underline"
                      >
                        View all notifications
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 px-3 py-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#004E89] to-[#06A77D] rounded-full flex items-center justify-center text-base font-semibold overflow-hidden border-2 border-white/30 shadow-lg ring-2 ring-white/10">
                  {userData?.profile_image ? (
                    <img 
                      src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/users/uploads/profiles/${userData.profile_image}`} 
                      alt={userData.name || 'User'}
                      className="w-full h-full object-cover"
                      style={{ imageRendering: 'auto', objectFit: 'cover' }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    getInitials(userData?.name || 'U')
                  )}
                </div>
                <div className="text-left hidden md:block">
                  <div className="text-sm font-medium">{userData?.name || 'Loading...'}</div>
                  <div className="text-xs text-gray-400 capitalize">{planData?.name || 'Free'} Plan</div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {showUserMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-[#0F1433] rounded-xl overflow-hidden shadow-2xl border border-white/10">
                  <div className="p-4 border-b border-white/10">
                    <div className="text-sm font-medium">{userData?.email || 'user@example.com'}</div>
                    <div className="text-xs text-gray-400 mt-1 capitalize">
                      {planData ? `${planData.name} Plan - ${planData.jobs_used}/${planData.jobs_limit === -1 ? '∞' : planData.jobs_limit} jobs used` : 'Loading...'}
                    </div>
                  </div>
                  <button
                    onClick={() => router.push('/dashboard/settings')}
                    className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors flex items-center space-x-3"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors flex items-center space-x-3 text-red-400"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-[#0F1433] border-r border-white/10 transition-transform duration-300 z-40 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="p-4 space-y-2">
          {navItems.map((item, index) => {
            const isActive = pathname === item.path;
            return (
              <button
                key={index}
                onClick={() => router.push(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-[#FF6B35] text-white shadow-lg shadow-[#FF6B35]/20'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Plan Usage */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="glass-panel rounded-xl p-4">
            <div className="text-sm font-medium mb-2">Plan Usage</div>
            {planData ? (
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Jobs</span>
                    <span>
                      {planData.jobs_used}/{planData.jobs_limit === -1 ? '∞' : planData.jobs_limit}
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#FF6B35] to-[#F77F00]" 
                      style={{ 
                        width: planData.jobs_limit === -1 
                          ? '100%' 
                          : `${Math.min((planData.jobs_used / planData.jobs_limit) * 100, 100)}%` 
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Resumes</span>
                    <span>
                      {planData.resumes_used}/{planData.resumes_limit === -1 ? '∞' : planData.resumes_limit.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#004E89] to-[#06A77D]" 
                      style={{ 
                        width: planData.resumes_limit === -1 
                          ? '100%' 
                          : `${Math.min((planData.resumes_used / planData.resumes_limit) * 100, 100)}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="h-8 bg-white/5 rounded animate-pulse"></div>
                <div className="h-8 bg-white/5 rounded animate-pulse"></div>
              </div>
            )}
            <button
              onClick={() => router.push('/dashboard/settings#plan')}
              className="w-full mt-3 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors"
            >
              Upgrade Plan
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        <div className="p-6">
          <ProtectedRoute>
            {children}
          </ProtectedRoute>
        </div>
      </main>
    </div>
  );
}
