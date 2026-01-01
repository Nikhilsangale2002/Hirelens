'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  EyeOff,
  Camera,
  Upload,
  Send,
  CheckCircle
} from 'lucide-react';
import { userApi } from '@/lib/api';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [planData, setPlanData] = useState(null);
  const [notifications, setNotifications] = useState({
    resume_processed: true,
    new_candidates: true,
    plan_limits: true,
    weekly_summary: true
  });
  const [emailConfig, setEmailConfig] = useState({
    smtp_server: '',
    smtp_port: 587,
    smtp_username: '',
    smtp_password: '',
    from_email: '',
    from_name: ''
  });
  const [showSmtpPassword, setShowSmtpPassword] = useState(false);
  const [testEmailAddress, setTestEmailAddress] = useState('');
  const [testEmailStatus, setTestEmailStatus] = useState('');

  // Load user profile on mount
  useEffect(() => {
    loadProfile();
    loadPlan();
    loadNotifications();
    loadEmailConfig();
    
    // Check for hash navigation to plan section
    if (window.location.hash === '#plan') {
      setActiveTab('plan');
      // Scroll to top after tab change
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }, []);

  const loadProfile = async () => {
    try {
      const response = await userApi.getProfile();
      if (response.profile) {
        setFormData(prev => ({
          ...prev,
          name: response.profile.name || '',
          email: response.profile.email || '',
          company: response.profile.company || '',
          phone: response.profile.phone || ''
        }));
        
        // Set profile image if exists
        if (response.profile.profile_image) {
          setProfileImagePreview(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/users/uploads/profiles/${response.profile.profile_image}`);
        }
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to load profile:', error);
      }
    }
  };

  const loadPlan = async () => {
    try {
      const response = await userApi.getPlan();
      setPlanData(response.plan);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to load plan:', error);
      }
    }
  };

  const loadNotifications = async () => {
    try {
      const response = await userApi.getNotifications();
      setNotifications(response.notifications);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to load notifications:', error);
      }
    }
  };

  const loadEmailConfig = async () => {
    try {
      const response = await userApi.getEmailConfig();
      if (response.email_config) {
        setEmailConfig(response.email_config);
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to load email config:', error);
      }
    }
  };

  const handleEmailConfigChange = (e) => {
    const { name, value } = e.target;
    setEmailConfig(prev => ({
      ...prev,
      [name]: name === 'smtp_port' ? parseInt(value) : value
    }));
  };

  const handleSaveEmailConfig = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    
    try {
      await userApi.updateEmailConfig(emailConfig);
      setSuccessMessage('Email configuration saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to save email config:', error);
      }
      setErrors({ general: error.message || 'Failed to save email configuration' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestEmail = async () => {
    if (!testEmailAddress) {
      setErrors({ testEmail: 'Please enter an email address' });
      return;
    }
    
    setIsLoading(true);
    setTestEmailStatus('');
    setErrors({});
    
    try {
      await userApi.sendTestEmail(testEmailAddress);
      setTestEmailStatus('success');
      setSuccessMessage('Test email sent successfully! Check your inbox.');
      setTimeout(() => {
        setSuccessMessage('');
        setTestEmailStatus('');
      }, 3000);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to send test email:', error);
      }
      setTestEmailStatus('error');
      setErrors({ testEmail: error.message || 'Failed to send test email' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors(prev => ({
        ...prev,
        [e.target.name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ profileImage: 'Image size must be less than 5MB' });
        return;
      }

      // Validate file type
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setErrors({ profileImage: 'Please upload a valid image file (PNG, JPG, GIF, WEBP)' });
        return;
      }

      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, profileImage: '' }));
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setProfileImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setSuccessMessage('');

    try {
      if (activeTab === 'profile') {
        // Create FormData if there's an image
        if (profileImage) {
          const formDataToSend = new FormData();
          formDataToSend.append('profile_image', profileImage);
          formDataToSend.append('name', formData.name);
          formDataToSend.append('email', formData.email);
          formDataToSend.append('company', formData.company);
          formDataToSend.append('phone', formData.phone);
          
          await userApi.updateProfile(formDataToSend);
        } else {
          // Send regular JSON data
          await userApi.updateProfile({
            name: formData.name,
            email: formData.email,
            company: formData.company,
            phone: formData.phone
          });
        }
        
        setSuccessMessage('Profile updated successfully!');
        setProfileImage(null); // Clear the file input
        
        // Reload profile
        await loadProfile();
      } else if (activeTab === 'security') {
        // Validate passwords
        if (!formData.currentPassword) {
          setErrors({ currentPassword: 'Current password is required' });
          setIsLoading(false);
          return;
        }
        if (!formData.newPassword) {
          setErrors({ newPassword: 'New password is required' });
          setIsLoading(false);
          return;
        }
        if (formData.newPassword !== formData.confirmPassword) {
          setErrors({ confirmPassword: 'Passwords do not match' });
          setIsLoading(false);
          return;
        }

        await userApi.changePassword(formData.currentPassword, formData.newPassword);
        setSuccessMessage('Password changed successfully!');
        
        // Clear password fields
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
      }

      // Hide success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Update error:', error);
      }
      
      if (error.status === 401) {
        setErrors({ currentPassword: 'Current password is incorrect' });
      } else if (error.status === 409) {
        setErrors({ email: 'This email is already in use' });
      } else {
        setErrors({ general: error.message || 'An error occurred. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationChange = async (key) => {
    const newNotifications = {
      ...notifications,
      [key]: !notifications[key]
    };
    
    setNotifications(newNotifications);
    
    try {
      await userApi.updateNotifications(newNotifications);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to update notifications:', error);
      }
      // Revert on error
      setNotifications(notifications);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
    { id: 'plan', label: 'Plan & Billing', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'email', label: 'Email Config', icon: <Mail className="w-5 h-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-5 h-5" /> }
  ];

  return (
      <div className="max-w-5xl space-y-4 md:space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">Settings</h1>
          <p className="text-sm md:text-base text-gray-600">Manage your account settings and preferences</p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 md:gap-6">
          {/* Tabs */}
          <div className="md:col-span-1">
            <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible gap-2 pb-2 md:pb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 md:space-x-3 px-3 md:px-4 py-2 md:py-3 rounded-lg transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#FF6B35] text-white'
                    : 'text-gray-600 hover:bg-white/5 hover:text-black'
                }`}
              >
                <span className="hidden md:inline">{tab.icon}</span>
                <span className="font-medium text-sm md:text-base">{tab.label}</span>
              </button>
            ))}
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            {/* Success Message */}
            {successMessage && (
              <div className="mb-4 p-4 bg-green-500/10 border border-green-500/50 rounded-lg">
                <p className="text-green-400 text-sm">{successMessage}</p>
              </div>
            )}

            {/* General Error */}
            {errors.general && (
              <div className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
                <p className="text-red-400 text-sm">{errors.general}</p>
              </div>
            )}

            {activeTab === 'profile' && (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="glass-panel rounded-2xl p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">Profile Information</h2>
                  
                  {/* Profile Image Upload */}
                  <div className="mb-6">
                    <label className="block text-xs md:text-sm font-medium mb-4">Profile Image</label>
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
                      <div className="relative group">
                        <div className="w-40 h-40 rounded-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center overflow-hidden border-4 border-white/30 shadow-2xl ring-4 ring-white/10 transition-all group-hover:ring-white/20">
                          {profileImagePreview ? (
                            <img 
                              src={profileImagePreview} 
                              alt="Profile" 
                              className="w-full h-full object-cover"
                              style={{ imageRendering: '-webkit-optimize-contrast', objectFit: 'cover' }}
                            />
                          ) : (
                            <User className="w-20 h-20 text-gray-600" />
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute bottom-1 right-1 md:bottom-2 md:right-2 p-2 md:p-3 bg-gradient-to-br from-[#FF6B35] to-[#F77F00] rounded-full hover:from-[#F77F00] hover:to-[#FF6B35] transition-all shadow-xl border-3 border-white/30 transform hover:scale-110"
                        >
                          <Camera className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                      </div>
                      <div className="flex-1">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                        <div className="space-y-3 w-full sm:w-auto">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full sm:w-auto px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 border border-white/20 rounded-lg transition-all flex items-center justify-center space-x-2 font-medium shadow-lg text-sm md:text-base"
                          >
                            <Upload className="w-4 h-4 md:w-5 md:h-5" />
                            <span>Upload New Photo</span>
                          </button>
                          {profileImagePreview && (
                            <button
                              type="button"
                              onClick={handleRemoveImage}
                              className="text-sm text-red-400 hover:text-red-300 font-medium transition-colors"
                            >
                              Remove Photo
                            </button>
                          )}
                          <p className="text-xs text-gray-400">
                            📸 PNG, JPG, GIF or WEBP (max. 5MB)
                          </p>
                        </div>
                      </div>
                    </div>
                    {errors.profileImage && (
                      <p className="mt-2 text-sm text-red-500">{errors.profileImage}</p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs md:text-sm font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white/5 border ${
                            errors.name ? 'border-red-500' : 'border-gray-200'
                        } rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs md:text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white/5 border ${
                            errors.email ? 'border-red-500' : 'border-gray-200'
                        } rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs md:text-sm font-medium mb-2">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs md:text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors"
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-6 flex items-center justify-center space-x-2 px-4 md:px-6 py-3 bg-[#FF6B35] hover:bg-[#F77F00] rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto text-sm md:text-base"
                  >
                    <Save className="w-4 h-4 md:w-5 md:h-5" />
                    <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'plan' && (
              <div className="space-y-4 md:space-y-6">
                <div className="glass-panel rounded-2xl p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-bold mb-4">Current Plan</h2>
                  {planData ? (
                    <div className="p-4 md:p-6 bg-gradient-to-br from-[#FF6B35]/20 to-[#F77F00]/20 rounded-xl border border-[#FF6B35]/50">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold capitalize">{planData.name} Plan</h3>
                          <p className="text-sm md:text-base text-gray-400">₹{planData.price}/month</p>
                        </div>
                        <div className="text-left sm:text-right">
                          <div className="text-xs md:text-sm text-gray-400">Usage</div>
                          <div className="text-sm md:text-base font-semibold">Current Month</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm">
                          <span>Jobs Used</span>
                          <span className="font-medium">
                            {planData.jobs_used}/{planData.jobs_limit === -1 ? '∞' : planData.jobs_limit}
                          </span>
                        </div>
                        {planData.jobs_limit !== -1 && (
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#FF6B35] to-[#F77F00]" 
                              style={{ width: `${(planData.jobs_used / planData.jobs_limit) * 100}%` }}
                            ></div>
                          </div>
                        )}
                        
                        <div className="flex justify-between text-sm">
                          <span>Resumes Processed</span>
                          <span className="font-medium">
                            {planData.resumes_used}/{planData.resumes_limit === -1 ? '∞' : planData.resumes_limit.toLocaleString()}
                          </span>
                        </div>
                        {planData.resumes_limit !== -1 && (
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#004E89] to-[#06A77D]" 
                              style={{ width: `${(planData.resumes_used / planData.resumes_limit) * 100}%` }}
                            ></div>
                          </div>
                        )}
                      </div>

                      <button className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-all">
                        Upgrade Plan
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-600">Loading plan details...</div>
                  )}
                </div>

                <div className="glass-panel rounded-2xl p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-bold mb-4">Billing History</h2>
                  <div className="space-y-3">
                    <div className="text-center py-8 text-gray-400">
                      No billing history available yet
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'email' && (
              <div className="space-y-4 md:space-y-6">
                <div className="glass-panel rounded-2xl p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-bold mb-2">Email Configuration</h2>
                  <p className="text-gray-400 text-xs md:text-sm mb-4 md:mb-6">Configure SMTP settings for sending interview invitations and status notifications</p>
                  
                  <form onSubmit={handleSaveEmailConfig} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs md:text-sm font-medium mb-2">SMTP Server</label>
                        <input
                          type="text"
                          name="smtp_server"
                          value={emailConfig.smtp_server}
                          onChange={handleEmailConfigChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors"
                          placeholder="smtp.gmail.com"
                        />
                      </div>

                      <div>
                        <label className="block text-xs md:text-sm font-medium mb-2">SMTP Port</label>
                        <input
                          type="number"
                          name="smtp_port"
                          value={emailConfig.smtp_port}
                          onChange={handleEmailConfigChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors"
                          placeholder="587"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs md:text-sm font-medium mb-2">SMTP Username</label>
                      <input
                        type="text"
                        name="smtp_username"
                        value={emailConfig.smtp_username}
                        onChange={handleEmailConfigChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors"
                        placeholder="your-email@gmail.com"
                      />
                    </div>

                    <div>
                      <label className="block text-xs md:text-sm font-medium mb-2">SMTP Password</label>
                      <div className="relative">
                        <input
                          type={showSmtpPassword ? 'text' : 'password'}
                          name="smtp_password"
                          value={emailConfig.smtp_password}
                          onChange={handleEmailConfigChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors pr-12"
                          placeholder="App password or account password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowSmtpPassword(!showSmtpPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
                        >
                          {showSmtpPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">For Gmail, use App Password (not your account password)</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs md:text-sm font-medium mb-2">From Email</label>
                        <input
                          type="email"
                          name="from_email"
                          value={emailConfig.from_email}
                          onChange={handleEmailConfigChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors"
                          placeholder="noreply@yourcompany.com"
                        />
                      </div>

                      <div>
                        <label className="block text-xs md:text-sm font-medium mb-2">From Name</label>
                        <input
                          type="text"
                          name="from_name"
                          value={emailConfig.from_name}
                          onChange={handleEmailConfigChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors"
                          placeholder="HireLens Recruitment"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex items-center justify-center space-x-2 px-4 md:px-6 py-3 bg-[#FF6B35] hover:bg-[#F77F00] rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto text-sm md:text-base"
                    >
                      <Save className="w-4 h-4 md:w-5 md:h-5" />
                      <span>{isLoading ? 'Saving...' : 'Save Configuration'}</span>
                    </button>
                  </form>
                </div>

                <div className="glass-panel rounded-2xl p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-bold mb-2">Test Email</h2>
                  <p className="text-gray-400 text-xs md:text-sm mb-4">Send a test email to verify your SMTP configuration</p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs md:text-sm font-medium mb-2">Recipient Email</label>
                      <input
                        type="email"
                        value={testEmailAddress}
                        onChange={(e) => setTestEmailAddress(e.target.value)}
                        className={`w-full px-4 py-3 bg-white/5 border ${
                          errors.testEmail ? 'border-red-500' : 'border-white/10'
                        } rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors`}
                        placeholder="test@example.com"
                      />
                      {errors.testEmail && (
                        <p className="mt-1 text-sm text-red-500">{errors.testEmail}</p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={handleTestEmail}
                      disabled={isLoading || !emailConfig.smtp_server || !testEmailAddress}
                      className="flex items-center justify-center space-x-2 px-4 md:px-6 py-3 bg-[#06A77D] hover:bg-[#06A77D]/80 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto text-sm md:text-base"
                    >
                      {testEmailStatus === 'success' ? (
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                      ) : (
                        <Send className="w-4 h-4 md:w-5 md:h-5" />
                      )}
                      <span>{isLoading ? 'Sending...' : testEmailStatus === 'success' ? 'Email Sent!' : 'Send Test Email'}</span>
                    </button>

                    {!emailConfig.smtp_server && (
                      <p className="text-xs text-yellow-400">⚠️ Please save SMTP configuration first before testing</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="glass-panel rounded-2xl p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { 
                      key: 'resume_processed',
                      label: 'Resume processed', 
                      description: 'Get notified when a resume is analyzed' 
                    },
                    { 
                      key: 'new_candidates',
                      label: 'New candidates', 
                      description: 'Alert when new candidates apply' 
                    },
                    { 
                      key: 'plan_limits',
                      label: 'Plan limits', 
                      description: 'Warning when approaching plan limits' 
                    },
                    { 
                      key: 'weekly_summary',
                      label: 'Weekly summary', 
                      description: 'Receive weekly recruitment summary' 
                    }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-3 md:p-4 bg-white/5 rounded-lg gap-3">
                      <div className="flex-1">
                        <div className="font-medium text-sm md:text-base">{item.label}</div>
                        <div className="text-xs md:text-sm text-gray-400">{item.description}</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications[item.key]}
                        onChange={() => handleNotificationChange(item.key)}
                        className="w-5 h-5 rounded border-white/10 bg-white/5 text-[#FF6B35] focus:ring-[#FF6B35] focus:ring-offset-0"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="glass-panel rounded-2xl p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">Change Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs md:text-sm font-medium mb-2">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white/5 border ${
                          errors.currentPassword ? 'border-red-500' : 'border-white/10'
                        } rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors pr-12`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.currentPassword && (
                      <p className="mt-1 text-sm text-red-500">{errors.currentPassword}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-medium mb-2">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/5 border ${
                        errors.newPassword ? 'border-red-500' : 'border-white/10'
                      } rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors`}
                    />
                    {errors.newPassword && (
                      <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-medium mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/5 border ${
                        errors.confirmPassword ? 'border-red-500' : 'border-white/10'
                      } rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors`}
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center justify-center space-x-2 px-4 md:px-6 py-3 bg-[#FF6B35] hover:bg-[#F77F00] rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto text-sm md:text-base"
                  >
                    <Key className="w-4 h-4 md:w-5 md:h-5" />
                    <span>{isLoading ? 'Updating...' : 'Update Password'}</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
  );
}
