'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Brain, MapPin, Briefcase, Clock, ArrowRight, Users, Zap, Heart, TrendingUp } from 'lucide-react';

export default function Careers() {
  const router = useRouter();

  const openings = [
    {
      title: "Senior AI/ML Engineer",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      color: "#FF6B35"
    },
    {
      title: "Product Manager - AI Platform",
      department: "Product",
      location: "Remote / New York",
      type: "Full-time",
      color: "#004E89"
    },
    {
      title: "Frontend Engineer (React/Next.js)",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      color: "#F77F00"
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote / London",
      type: "Full-time",
      color: "#06A77D"
    },
    {
      title: "Data Scientist",
      department: "Data & Analytics",
      location: "Remote / Berlin",
      type: "Full-time",
      color: "#FF6B35"
    },
    {
      title: "Marketing Content Writer",
      department: "Marketing",
      location: "Remote",
      type: "Full-time / Contract",
      color: "#004E89"
    }
  ];

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
    <div className="min-h-screen bg-[#0A0E27] text-white">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 bg-[#0F1433] border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
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
                <div className="text-4xl mb-3">🏠</div>
                <h3 className="font-bold mb-2">Remote-First</h3>
                <p className="text-sm text-gray-400">Work from anywhere in the world</p>
              </div>
              <div className="glass-panel p-6 rounded-2xl text-center">
                <div className="text-4xl mb-3">💰</div>
                <h3 className="font-bold mb-2">Competitive Salary</h3>
                <p className="text-sm text-gray-400">Top-tier compensation + equity</p>
              </div>
              <div className="glass-panel p-6 rounded-2xl text-center">
                <div className="text-4xl mb-3">🌴</div>
                <h3 className="font-bold mb-2">Unlimited PTO</h3>
                <p className="text-sm text-gray-400">Take time off when you need it</p>
              </div>
              <div className="glass-panel p-6 rounded-2xl text-center">
                <div className="text-4xl mb-3">📚</div>
                <h3 className="font-bold mb-2">Learning Budget</h3>
                <p className="text-sm text-gray-400">$2K/year for courses & conferences</p>
              </div>
              <div className="glass-panel p-6 rounded-2xl text-center">
                <div className="text-4xl mb-3">💻</div>
                <h3 className="font-bold mb-2">Top Equipment</h3>
                <p className="text-sm text-gray-400">Latest MacBook Pro or custom setup</p>
              </div>
              <div className="glass-panel p-6 rounded-2xl text-center">
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="font-bold mb-2">Team Events</h3>
                <p className="text-sm text-gray-400">Annual off-sites and celebrations</p>
              </div>
            </div>
          </section>

          {/* Open Positions */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Open Positions</h2>
            <div className="space-y-4">
              {openings.map((job, index) => (
                <div
                  key={index}
                  className="glass-panel p-6 rounded-2xl hover-lift transition-all cursor-pointer group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[#FF6B35] transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-2">
                          <Briefcase className="w-4 h-4" />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{job.type}</span>
                        </div>
                      </div>
                    </div>
                    <button className="px-6 py-3 bg-[#FF6B35] text-white rounded-lg hover:bg-[#F77F00] transition-all font-semibold flex items-center space-x-2 self-start md:self-center">
                      <span>Apply Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
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
