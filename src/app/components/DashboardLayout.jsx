'use client';

import React, { useState } from 'react';
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
  ChevronDown
} from 'lucide-react';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Briefcase className="w-5 h-5" />, label: 'Jobs', path: '/dashboard/jobs' },
    { icon: <Users className="w-5 h-5" />, label: 'Candidates', path: '/dashboard/candidates' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/dashboard/settings' },
  ];

  const handleLogout = () => {
    // Clear auth and redirect
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
            <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF6B35] rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 px-3 py-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-[#004E89] to-[#06A77D] rounded-full flex items-center justify-center text-sm font-semibold">
                  HR
                </div>
                <div className="text-left hidden md:block">
                  <div className="text-sm font-medium">HR Manager</div>
                  <div className="text-xs text-gray-400">Pro Plan</div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {showUserMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 glass-panel rounded-xl overflow-hidden shadow-2xl">
                  <div className="p-4 border-b border-white/10">
                    <div className="text-sm font-medium">hr@company.com</div>
                    <div className="text-xs text-gray-400 mt-1">Pro Plan - 7/10 jobs used</div>
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
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Jobs</span>
                  <span>7/10</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#FF6B35] to-[#F77F00]" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Resumes</span>
                  <span>1,234/2,000</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#004E89] to-[#06A77D]" style={{ width: '62%' }}></div>
                </div>
              </div>
            </div>
            <button
              onClick={() => router.push('/dashboard/settings')}
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
          {children}
        </div>
      </main>
    </div>
  );
}
