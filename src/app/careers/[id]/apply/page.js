'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Brain, Upload, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function JobApplication() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.id;

  const [job, setJob] = useState(null);
  const [isLoadingJob, setIsLoadingJob] = useState(true);
  const [jobError, setJobError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    portfolio: '',
    coverLetter: ''
  });

  const [resume, setResume] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (jobId) {
      loadJob();
    }
  }, [jobId]);

  const loadJob = async () => {
    try {
      setIsLoadingJob(true);
      setJobError(null);

      const response = await fetch(`${API_URL}/api/jobs/public/${jobId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Job not found');
        }
        throw new Error('Failed to load job details');
      }

      const data = await response.json();
      setJob(data.job);
    } catch (err) {
      console.error('Error loading job:', err);
      setJobError(err.message);
    } finally {
      setIsLoadingJob(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setSubmitError('Please upload a PDF or Word document');
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setSubmitError('File size must be less than 5MB');
        return;
      }

      setResume(file);
      setSubmitError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    // Validation
    if (!formData.name || !formData.email || !formData.phone) {
      setSubmitError('Please fill in all required fields');
      return;
    }

    if (!resume) {
      setSubmitError('Please upload your resume');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitError('Please enter a valid email address');
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      // Create FormData for file upload
      const uploadData = new FormData();
      uploadData.append('resume', resume);
      uploadData.append('candidate_name', formData.name);
      uploadData.append('email', formData.email);
      uploadData.append('phone', formData.phone);
      uploadData.append('location', formData.location || '');
      uploadData.append('linkedin', formData.linkedin || '');
      uploadData.append('portfolio', formData.portfolio || '');
      uploadData.append('cover_letter', formData.coverLetter || '');

      const response = await fetch(`${API_URL}/api/resumes/${jobId}/upload`, {
        method: 'POST',
        body: uploadData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      setSubmitSuccess(true);

      // Redirect to success page after 3 seconds
      setTimeout(() => {
        router.push('/careers');
      }, 3000);

    } catch (err) {
      console.error('Error submitting application:', err);
      setSubmitError(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingJob) {
    return (
      <div className="min-h-screen bg-white text-black">
        <nav className="fixed top-0 left-0 right-0 bg-gray-50 border-b border-gray-200 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => router.push(`/careers/${jobId}`)}
              className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Job</span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FF6B35] to-[#F77F00] rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">HireLens</span>
            </div>
          </div>
        </nav>

        <div className="pt-24 pb-16 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="glass-panel p-8 rounded-2xl animate-pulse">
              <div className="h-8 bg-white/10 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-white/10 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (jobError || !job) {
    return (
      <div className="min-h-screen bg-white text-black">
        <nav className="fixed top-0 left-0 right-0 bg-gray-50 border-b border-gray-200 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => router.push('/careers')}
              className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Careers</span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FF6B35] to-[#F77F00] rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">HireLens</span>
            </div>
          </div>
        </nav>

        <div className="pt-24 pb-16 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="glass-panel p-12 rounded-2xl text-center">
              <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
              <h2 className="text-2xl font-bold mb-2">Job Not Found</h2>
              <p className="text-gray-400 mb-6">Unable to load job details</p>
              <button
                onClick={() => router.push('/careers')}
                className="px-6 py-3 bg-[#FF6B35] text-white rounded-lg hover:bg-[#F77F00] transition-all"
              >
                Back to Careers
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center px-6">
        <div className="max-w-2xl w-full glass-panel p-12 rounded-2xl text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-green-400/20 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-400" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Application Submitted!</h1>
          <p className="text-xl text-gray-600 mb-6">
            Thank you for applying to <span className="text-black font-semibold">{job.title}</span>
          </p>
          <p className="text-gray-600 mb-8">
            We've received your application and our AI is analyzing your resume. 
            You'll hear from us soon if your profile matches our requirements.
          </p>
          <button
            onClick={() => router.push('/careers')}
            className="px-8 py-3 bg-[#FF6B35] text-white rounded-lg hover:bg-[#F77F00] transition-all font-semibold"
          >
            Browse More Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 bg-gray-50 border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push(`/careers/${jobId}`)}
            className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Job</span>
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#FF6B35] to-[#F77F00] rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">HireLens</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Apply for {job.title}</h1>
            <p className="text-gray-400">
              Fill out the form below and upload your resume. Our AI will analyze your application and match it with job requirements.
            </p>
          </div>

          {/* Application Form */}
          <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-2xl">
            {submitError && (
              <div className="mb-6 p-4 bg-red-400/10 border border-red-400/20 rounded-lg flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-400">{submitError}</p>
              </div>
            )}

            {/* Personal Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] text-white"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] text-white"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Phone <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] text-white"
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] text-white"
                    placeholder="San Francisco, CA"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] text-white"
                      placeholder="https://linkedin.com/in/johndoe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Portfolio / Website
                    </label>
                    <input
                      type="url"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] text-white"
                      placeholder="https://johndoe.com"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Resume Upload */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Resume</h2>
              <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-[#FF6B35] transition-colors">
                <input
                  type="file"
                  id="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="resume" className="cursor-pointer">
                  <div className="w-16 h-16 mx-auto mb-4 bg-[#FF6B35]/20 rounded-full flex items-center justify-center">
                    {resume ? (
                      <FileText className="w-8 h-8 text-[#FF6B35]" />
                    ) : (
                      <Upload className="w-8 h-8 text-[#FF6B35]" />
                    )}
                  </div>
                  {resume ? (
                    <div>
                      <p className="text-white font-semibold mb-1">{resume.name}</p>
                      <p className="text-sm text-gray-400">
                        {(resume.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <p className="text-sm text-[#FF6B35] mt-2">Click to change file</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-white font-semibold mb-2">Upload your resume</p>
                      <p className="text-sm text-gray-400">
                        PDF or Word document (Max 5MB)
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Cover Letter */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Cover Letter (Optional)</h2>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] text-white resize-none"
                placeholder="Tell us why you're a great fit for this role..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-[#FF6B35] text-white rounded-lg hover:bg-[#F77F00] transition-all font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Submitting Application...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Submit Application</span>
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-400 mt-4">
              By submitting this form, you agree to our processing of your personal data for recruitment purposes.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
