'use client'

import { useState, useEffect } from 'react'
import { notificationsApi } from '@/lib/api'
import { Bell, Check, Trash2, ExternalLink, Filter } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function NotificationsPage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // 'all' or 'unread'
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const limit = 20

  useEffect(() => {
    loadNotifications()
  }, [filter, page])

  const loadNotifications = async () => {
    try {
      setLoading(true)
      const offset = (page - 1) * limit
      const data = await notificationsApi.getNotifications(filter === 'unread', limit, offset)
      
      if (page === 1) {
        setNotifications(data.notifications)
      } else {
        setNotifications(prev => [...prev, ...data.notifications])
      }
      
      setHasMore(data.notifications.length === limit)
    } catch (error) {
      console.error('Failed to load notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (id) => {
    try {
      await notificationsApi.markAsRead(id)
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, is_read: true } : n)
      )
    } catch (error) {
      console.error('Failed to mark as read:', error)
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      await notificationsApi.markAllAsRead()
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })))
    } catch (error) {
      console.error('Failed to mark all as read:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await notificationsApi.deleteNotification(id)
      setNotifications(prev => prev.filter(n => n.id !== id))
    } catch (error) {
      console.error('Failed to delete notification:', error)
    }
  }

  const handleClearAll = async () => {
    if (!confirm('Are you sure you want to clear all notifications?')) return
    
    try {
      await notificationsApi.clearAll()
      setNotifications([])
    } catch (error) {
      console.error('Failed to clear all:', error)
    }
  }

  const handleNotificationClick = (notification) => {
    // Mark as read if unread
    if (!notification.is_read) {
      handleMarkAsRead(notification.id);
    }
    
    // Navigate if action URL exists
    if (notification.action_url) {
      // Ensure URL starts with /
      const url = notification.action_url.startsWith('/') 
        ? notification.action_url 
        : `/${notification.action_url}`;
      router.push(url);
    }
  }

  const unreadCount = notifications.filter(n => !n.is_read).length

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Notifications</h1>
          <p className="text-gray-400">Stay updated with your recruitment activities</p>
        </div>

        {/* Filters and Actions */}
        <div className="glass-panel p-4 mb-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                setFilter('all')
                setPage(1)
              }}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-[#FF6B35] text-white'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => {
                setFilter('unread')
                setPage(1)
              }}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'unread'
                  ? 'bg-[#FF6B35] text-white'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="flex items-center space-x-2 px-4 py-2 bg-[#06A77D] hover:bg-[#06A77D]/80 rounded-lg transition-colors"
              >
                <Check className="w-4 h-4" />
                <span className="text-sm">Mark all as read</span>
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={handleClearAll}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-sm">Clear all</span>
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {loading && page === 1 ? (
            <div className="glass-panel p-8 text-center">
              <div className="animate-spin w-8 h-8 border-2 border-[#FF6B35] border-t-transparent rounded-full mx-auto"></div>
              <p className="text-gray-400 mt-4">Loading notifications...</p>
            </div>
          ) : notifications.length > 0 ? (
            <>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`glass-panel p-5 hover:bg-white/5 transition-all cursor-pointer ${
                    !notification.is_read ? 'border-l-4 border-[#FF6B35]' : ''
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start justify-between space-x-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className={`font-medium ${!notification.is_read ? 'text-white' : 'text-gray-300'}`}>
                          {notification.title}
                        </h3>
                        {!notification.is_read && (
                          <span className="w-2 h-2 bg-[#FF6B35] rounded-full flex-shrink-0"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mb-3">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {new Date(notification.created_at).toLocaleDateString()} at{' '}
                          {new Date(notification.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      {!notification.is_read && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleMarkAsRead(notification.id)
                          }}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4 text-[#06A77D]" />
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(notification.id)
                        }}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Load More */}
              {hasMore && (
                <div className="text-center pt-4">
                  <button
                    onClick={() => setPage(p => p + 1)}
                    disabled={loading}
                    className="px-6 py-3 bg-[#FF6B35] hover:bg-[#FF6B35]/80 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Loading...' : 'Load More'}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="glass-panel p-12 text-center">
              <Bell className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <h3 className="text-xl font-semibold mb-2">No notifications</h3>
              <p className="text-gray-400">
                {filter === 'unread'
                  ? "You're all caught up! No unread notifications."
                  : "You don't have any notifications yet."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
