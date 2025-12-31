'use client';

import React, { useState } from 'react';
import { ArrowRight, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import GoogleLogin from '@/components/GoogleLogin';
import GitHubLogin from '@/components/GitHubLogin';
import { authApi } from '@/lib/api';

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setErrors({});
      setSuccessMessage('');

      try {
        await authApi.login(
          formData.email,
          formData.password,
          rememberMe
        );

        // Redirect to dashboard
        router.push('/dashboard');

      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Login error:', error);
        }
        
        // Handle specific error cases
        if (error.status === 401) {
          setErrors({ general: 'Invalid email or password' });
        } else if (error.status === 423) {
          setErrors({ general: error.message || 'Account is locked. Please try again later.' });
        } else if (error.status === 403) {
          setErrors({ general: 'Account is inactive. Please contact support.' });
        } else {
          setErrors({ general: 'An error occurred during login. Please try again.' });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E27] text-white flex items-center justify-center px-6 py-12 relative">
      {/* Back to Home Button - Top Left */}
      <button 
        onClick={() => router.push('/')}
        className="absolute top-6 left-6 inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors z-20"
      >
        <ArrowRight className="w-5 h-5 rotate-180" />
        <span>Back to Home</span>
      </button>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#FF6B35] rounded-full filter blur-[120px] opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#004E89] rounded-full filter blur-[120px] opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome <span className="gradient-text">Back</span>
          </h1>
          <p className="text-gray-400">
            Sign in to your HireLens account
          </p>
        </div>

        {/* Sign In Form */}
        <div className="glass-panel rounded-2xl p-8">
          {/* Social Login */}
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-4">
              <GoogleLogin />
              <GitHubLogin />
            </div>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#0a0a0a] text-gray-400">Or continue with email</span>
            </div>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg">
              <p className="text-green-400 text-sm flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {successMessage}
              </p>
            </div>
          )}

          {/* General Error Message */}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
              <p className="text-red-400 text-sm">{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                    errors.email ? 'border-red-500' : 'border-white/10'
                  } rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors`}
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-12 py-3 bg-white/5 border ${
                    errors.password ? 'border-red-500' : 'border-white/10'
                  } rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-white/10 bg-white/5 text-[#FF6B35] focus:ring-[#FF6B35] focus:ring-offset-0"
                />
                <span className="text-sm text-gray-400">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-[#FF6B35] hover:text-[#F77F00] transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group w-full px-8 py-4 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#F77F00] transition-all hover:shadow-xl hover:shadow-[#FF6B35]/50 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <button
                onClick={() => router.push('/signup')}
                className="text-[#FF6B35] hover:text-[#F77F00] font-semibold transition-colors"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
