'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';

export default function InterviewLoginPage() {
  const router = useRouter();
  const params = useParams();
  const interviewId = params.id;
  
  const [formData, setFormData] = useState({
    email: '',
    access_code: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/ai/interviews/${interviewId}/verify-access`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          access_code: formData.access_code
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Invalid credentials');
      }

      const data = await response.json();
      
      // Store interview session
      sessionStorage.setItem(`interview_${interviewId}_auth`, JSON.stringify({
        email: formData.email,
        verified: true,
        timestamp: Date.now()
      }));

      // Redirect to interview
      router.push(`/interview/${interviewId}`);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-black mb-2">
            AI Interview Login
          </h1>
          <p className="text-gray-600">
            Enter your credentials to start the interview
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="your.email@example.com"
                  disabled={loading}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Use the email address where you received the interview invitation
              </p>
            </div>

            {/* Access Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Access Code
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.access_code}
                  onChange={(e) => setFormData({ ...formData, access_code: e.target.value.toUpperCase() })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black font-mono uppercase"
                  placeholder="XXXXXX"
                  maxLength={6}
                  disabled={loading}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                6-character code from your email invitation
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Lock className="h-5 w-5" />
                  Start Interview
                </>
              )}
            </button>
          </form>

          {/* Help Text */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-600 text-center">
              💡 <strong>Can't find your access code?</strong><br />
              Check the email invitation sent by the recruiter. The code is in the email body.
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>🔒 This is a secure interview session</p>
          <p className="mt-1">Do not share your access code with anyone</p>
        </div>
      </div>
    </div>
  );
}
