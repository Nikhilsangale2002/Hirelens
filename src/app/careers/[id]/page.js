'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Brain, MapPin, Briefcase, Clock, DollarSign, Calendar, Users, ArrowRight, CheckCircle, XCircle } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function JobDetail() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.id;

  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (jobId) {
      loadJob();
    }
  }, [jobId]);

  const loadJob = async () => {
    try {
      setIsLoading(true);
      setError(null);

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
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0E27] text-white">
        <nav className="fixed top-0 left-0 right-0 bg-[#0F1433] border-b border-white/10 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => router.push('/careers')}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
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
          <div className="max-w-4xl mx-auto">
            <div className="glass-panel p-8 rounded-2xl animate-pulse">
              <div className="h-10 bg-white/10 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-white/10 rounded w-1/2 mb-8"></div>
              <div className="space-y-3">
                <div className="h-4 bg-white/10 rounded w-full"></div>
                <div className="h-4 bg-white/10 rounded w-5/6"></div>
                <div className="h-4 bg-white/10 rounded w-4/5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-[#0A0E27] text-white">
        <nav className="fixed top-0 left-0 right-0 bg-[#0F1433] border-b border-white/10 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => router.push('/careers')}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
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
          <div className="max-w-4xl mx-auto">
            <div className="glass-panel p-12 rounded-2xl text-center">
              <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-bold mb-2">{error === 'Job not found' ? 'Job Not Found' : 'Error Loading Job'}</h2>
              <p className="text-gray-400 mb-6">{error || 'Unable to load job details'}</p>
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

  return (
    <div className="min-h-screen bg-[#0A0E27] text-white">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 bg-[#0F1433] border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push('/careers')}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
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

      {/* Main Content */}
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Job Header */}
          <div className="glass-panel p-8 rounded-2xl mb-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-4">{job.title}</h1>
                <div className="flex flex-wrap gap-4 text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="w-5 h-5" />
                    <span>{job.department || 'Not specified'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>{job.location || 'Remote'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>{job.job_type || job.type || 'Full-time'}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => router.push(`/careers/${jobId}/apply`)}
                className="px-8 py-4 bg-[#FF6B35] text-white rounded-lg hover:bg-[#F77F00] transition-all font-semibold flex items-center space-x-2 self-start"
              >
                <span>Apply for this Job</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Job Meta */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10">
              {job.salary_range && (
                <div>
                  <div className="flex items-center space-x-2 text-gray-400 mb-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm">Salary</span>
                  </div>
                  <p className="font-semibold">{job.salary_range}</p>
                </div>
              )}
              {job.experience_level && (
                <div>
                  <div className="flex items-center space-x-2 text-gray-400 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Experience</span>
                  </div>
                  <p className="font-semibold">{job.experience_level}</p>
                </div>
              )}
              <div>
                <div className="flex items-center space-x-2 text-gray-400 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Posted</span>
                </div>
                <p className="font-semibold">{formatDate(job.created_at)}</p>
              </div>
              {job.candidates_count !== undefined && (
                <div>
                  <div className="flex items-center space-x-2 text-gray-400 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Applicants</span>
                  </div>
                  <p className="font-semibold">{job.candidates_count || 0}</p>
                </div>
              )}
            </div>
          </div>

          {/* Job Description */}
          {job.description && (
            <div className="glass-panel p-8 rounded-2xl mb-6">
              <h2 className="text-2xl font-bold mb-4">About the Role</h2>
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                {job.description}
              </div>
            </div>
          )}

          {/* Requirements */}
          {job.requirements && (
            <div className="glass-panel p-8 rounded-2xl mb-6">
              <h2 className="text-2xl font-bold mb-4">Requirements</h2>
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                {job.requirements}
              </div>
            </div>
          )}

          {/* Required Skills */}
          {job.skills_required && job.skills_required.length > 0 && (
            <div className="glass-panel p-8 rounded-2xl mb-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <span>Required Skills</span>
              </h2>
              <div className="flex flex-wrap gap-3">
                {job.skills_required.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-green-400/10 text-green-400 rounded-lg border border-green-400/20 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Nice to Have Skills */}
          {job.skills_preferred && job.skills_preferred.length > 0 && (
            <div className="glass-panel p-8 rounded-2xl mb-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                <XCircle className="w-6 h-6 text-blue-400" />
                <span>Nice to Have</span>
              </h2>
              <div className="flex flex-wrap gap-3">
                {job.skills_preferred.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-400/10 text-blue-400 rounded-lg border border-blue-400/20 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="glass-panel p-8 rounded-2xl text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Apply?</h2>
            <p className="text-gray-400 mb-6">
              Join our team and help us revolutionize recruitment with AI
            </p>
            <button
              onClick={() => router.push(`/careers/${jobId}/apply`)}
              className="px-8 py-4 bg-[#FF6B35] text-white rounded-lg hover:bg-[#F77F00] transition-all font-semibold inline-flex items-center space-x-2"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
