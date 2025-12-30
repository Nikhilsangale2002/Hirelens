'use client';

import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Building, 
  CreditCard, 
  Bell,
  Shield,
  Save,
  Key,
  Eye,
  EyeOff
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: 'HR Manager',
    email: 'hr@company.com',
    company: 'TechCorp Inc.',
    phone: '+91 9876543210',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Settings saved:', formData);
    alert('Settings saved successfully!');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
    { id: 'plan', label: 'Plan & Billing', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-5 h-5" /> }
  ];

  return (
      <div className="max-w-5xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-gray-400">Manage your account settings and preferences</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Tabs */}
          <div className="md:col-span-1 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#FF6B35] text-white'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            {activeTab === 'profile' && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="glass-panel rounded-2xl p-6">
                  <h2 className="text-xl font-bold mb-6">Profile Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-6 flex items-center space-x-2 px-6 py-3 bg-[#FF6B35] hover:bg-[#F77F00] rounded-lg font-semibold transition-all"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'plan' && (
              <div className="space-y-6">
                <div className="glass-panel rounded-2xl p-6">
                  <h2 className="text-xl font-bold mb-4">Current Plan</h2>
                  <div className="p-6 bg-gradient-to-br from-[#FF6B35]/20 to-[#F77F00]/20 rounded-xl border border-[#FF6B35]/50">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold">Pro Plan</h3>
                        <p className="text-gray-400">₹4,999/month</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-400">Next billing</div>
                        <div className="font-semibold">Jan 30, 2025</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span>Jobs Used</span>
                        <span className="font-medium">7/10</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#FF6B35] to-[#F77F00]" style={{ width: '70%' }}></div>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>Resumes Processed</span>
                        <span className="font-medium">1,234/2,000</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#004E89] to-[#06A77D]" style={{ width: '62%' }}></div>
                      </div>
                    </div>

                    <button className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-all">
                      Upgrade Plan
                    </button>
                  </div>
                </div>

                <div className="glass-panel rounded-2xl p-6">
                  <h2 className="text-xl font-bold mb-4">Billing History</h2>
                  <div className="space-y-3">
                    {[
                      { date: 'Dec 30, 2024', amount: '₹4,999', status: 'Paid' },
                      { date: 'Nov 30, 2024', amount: '₹4,999', status: 'Paid' },
                      { date: 'Oct 30, 2024', amount: '₹4,999', status: 'Paid' }
                    ].map((invoice, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div>
                          <div className="font-medium">{invoice.date}</div>
                          <div className="text-sm text-gray-400">Pro Plan</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{invoice.amount}</div>
                          <div className="text-sm text-[#06A77D]">{invoice.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="glass-panel rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { label: 'Resume processed', description: 'Get notified when a resume is analyzed' },
                    { label: 'New candidates', description: 'Alert when new candidates apply' },
                    { label: 'Plan limits', description: 'Warning when approaching plan limits' },
                    { label: 'Weekly summary', description: 'Receive weekly recruitment summary' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-sm text-gray-400">{item.description}</div>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 rounded border-white/10 bg-white/5 text-[#FF6B35] focus:ring-[#FF6B35] focus:ring-offset-0"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="glass-panel rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-6">Change Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center space-x-2 px-6 py-3 bg-[#FF6B35] hover:bg-[#F77F00] rounded-lg font-semibold transition-all"
                  >
                    <Key className="w-5 h-5" />
                    <span>Update Password</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
  );
}
