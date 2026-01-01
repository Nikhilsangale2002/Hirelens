'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Brain, MapPin, Briefcase, Clock, ArrowRight, Users, Zap, Heart, TrendingUp, Home, DollarSign, Sun, BookOpen, Laptop, PartyPopper } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Memoized job card component
const JobCard = React.memo(({ job, onClick }) => (
  <div
    onClick={() => onClick(job.id)}
    className="glass-panel p-6 rounded-2xl hover-lift cursor-pointer transition-all group"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <h3 className="text-xl font-bold mb-2 group-hover:text-[#FF6B35] transition-colors">
          {job.title}
        </h3>
        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Briefcase className="w-4 h-4" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{job.posted_date || 'Recently'}</span>
          </div>
        </div>
      </div>
      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#FF6B35] group-hover:translate-x-1 transition-all" />
    </div>
    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
      {job.description}
    </p>
    <div className="flex flex-wrap gap-2">
      {job.department && (
        <span className="px-3 py-1 bg-[#FF6B35]/10 text-[#FF6B35] rounded-full text-xs font-medium">
          {job.department}
        </span>
      )}
      {job.experience_level && (
        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
          {job.experience_level}
        </span>
      )}
    </div>
  </div>
));
JobCard.displayName = 'JobCard';

export default function Careers() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoized job click handler
  const handleJobClick = useCallback((jobId) => {
    router.push(`/careers/${jobId}`);
  }, [router]);

  // Fetch real jobs from API
  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Fetch only active/published jobs for public viewing (no auth required)
      const response = await fetch(`${API_URL}/api/jobs/public`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to load jobs');
      }

      const data = await response.json();
      setJobs(data.jobs || []);
    } catch (err) {
      console.error('Error loading jobs:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Color palette for job cards
  const colors = ["#FF6B35", "#004E89", "#F77F00", "#06A77D"];

  const benefits = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaborative Culture",
      description: "Work with talented people who are passionate about solving real problems.",
      color: "#FF6B35"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Cutting-Edge Tech",
      description: "Work with the latest AI/ML technologies and modern development tools.",
      color: "#004E89"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, mental health support, and wellness programs.",
      color: "#F77F00"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Career Growth",
      description: "Professional development budget, mentorship, and clear career progression.",
      color: "#06A77D"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 bg-gray-50 border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
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
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-block p-4 bg-gradient-to-br from-[#FF6B35]/20 to-[#F77F00]/20 rounded-2xl mb-6">
              <Briefcase className="w-12 h-12 text-[#FF6B35]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Join Our <span className="gradient-text">Team</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Help us revolutionize recruitment with AI. We're looking for talented individuals who want to make a real impact.
            </p>
          </div>

          {/* Why Join Us */}
          <section className="mb-16">
            <div className="glass-panel p-8 rounded-2xl">
              <h2 className="text-3xl font-bold mb-6 text-center">Why Join HireLens?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${benefit.color}33, ${benefit.color}11)`,
                        color: benefit.color
                      }}
                    >
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Perks */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Perks & Benefits</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass-panel p-6 rounded-2xl text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-[#FF6B35]/20 to-[#F77F00]/20 rounded-xl flex items-center justify-center">
                  <Home className="w-8 h-8 text-[#FF6B35]" />
                </div>
                <h3 className="font-bold mb-2">Remote-First</h3>
                <p className="text-sm text-gray-400">Work from anywhere in the world</p>
              </div>
              <div className="glass-panel p-6 rounded-2xl text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-[#004E89]/20 to-[#06A77D]/20 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-8 h-8 text-[#06A77D]" />
                </div>
                <h3 className="font-bold mb-2">Competitive Salary</h3>
                <p className="text-sm text-gray-400">Top-tier compensation + equity</p>
              </div>
              <div className="glass-panel p-6 rounded-2xl text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-[#F77F00]/20 to-[#FF6B35]/20 rounded-xl flex items-center justify-center">
                  <Sun className="w-8 h-8 text-[#F77F00]" />
                </div>
                <h3 className="font-bold mb-2">Unlimited PTO</h3>
                <p className="text-sm text-gray-400">Take time off when you need it</p>
              </div>
              <div className="glass-panel p-6 rounded-2xl text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-[#004E89]/20 to-[#FF6B35]/20 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-[#004E89]" />
                </div>
                <h3 className="font-bold mb-2">Learning Budget</h3>
                <p className="text-sm text-gray-400">$2K/year for courses & conferences</p>
              </div>
              <div className="glass-panel p-6 rounded-2xl text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-[#06A77D]/20 to-[#004E89]/20 rounded-xl flex items-center justify-center">
                  <Laptop className="w-8 h-8 text-[#06A77D]" />
                </div>
                <h3 className="font-bold mb-2">Top Equipment</h3>
                <p className="text-sm text-gray-400">Latest MacBook Pro or custom setup</p>
              </div>
              <div className="glass-panel p-6 rounded-2xl text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-[#FF6B35]/20 to-[#F77F00]/20 rounded-xl flex items-center justify-center">
                  <PartyPopper className="w-8 h-8 text-[#FF6B35]" />
                </div>
                <h3 className="font-bold mb-2">Team Events</h3>
                <p className="text-sm text-gray-400">Annual off-sites and celebrations</p>
              </div>
            </div>
          </section>

          {/* Open Positions */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Open Positions</h2>
            
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="glass-panel p-6 rounded-2xl animate-pulse">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="h-6 bg-white/10 rounded w-2/3"></div>
                        <div className="flex gap-4">
                          <div className="h-4 bg-white/10 rounded w-24"></div>
                          <div className="h-4 bg-white/10 rounded w-32"></div>
                          <div className="h-4 bg-white/10 rounded w-20"></div>
                        </div>
                      </div>
                      <div className="h-10 bg-white/10 rounded w-32"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="glass-panel p-8 rounded-2xl text-center">
                <p className="text-red-400 mb-4">Failed to load job openings</p>
                <button
                  onClick={loadJobs}
                  className="px-6 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#F77F00] transition-all"
                >
                  Try Again
                </button>
              </div>
            ) : jobs.length === 0 ? (
              <div className="glass-panel p-12 rounded-2xl text-center">
                <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-bold mb-2">No Open Positions</h3>
                <p className="text-gray-400">
                  We don't have any open positions at the moment, but we're always looking for great talent!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} onClick={handleJobClick} />
                ))}
              </div>
            )}
          </section>

          {/* CTA */}
          <section className="glass-panel p-8 rounded-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Don't See the Right Role?</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              We're always looking for exceptional talent. Send us your resume and tell us what you're passionate about.
            </p>
            <button className="px-8 py-3 bg-[#FF6B35] text-white rounded-lg hover:bg-[#F77F00] transition-all font-semibold">
              Send General Application
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
