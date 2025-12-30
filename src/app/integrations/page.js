'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Brain, Mail, Calendar, MessageSquare, Users, Database, Globe, Zap, CheckCircle } from 'lucide-react';

export default function Integrations() {
  const router = useRouter();

  const integrations = [
    {
      icon: <Mail className="w-8 h-8" />,
      name: "Gmail",
      category: "Email",
      description: "Send automated emails to candidates directly from your Gmail account",
      color: "#FF6B35",
      status: "Available"
    },
    {
      icon: <Mail className="w-8 h-8" />,
      name: "Outlook",
      category: "Email",
      description: "Integrate with Microsoft Outlook for seamless email communications",
      color: "#004E89",
      status: "Available"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      name: "Google Calendar",
      category: "Calendar",
      description: "Schedule interviews and sync events with Google Calendar",
      color: "#F77F00",
      status: "Available"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      name: "Outlook Calendar",
      category: "Calendar",
      description: "Sync interview schedules with Microsoft Outlook Calendar",
      color: "#06A77D",
      status: "Available"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      name: "Slack",
      category: "Communication",
      description: "Get notifications and updates directly in your Slack workspace",
      color: "#FF6B35",
      status: "Available"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      name: "Microsoft Teams",
      category: "Communication",
      description: "Collaborate with your team using Microsoft Teams integration",
      color: "#004E89",
      status: "Available"
    },
    {
      icon: <Users className="w-8 h-8" />,
      name: "LinkedIn",
      category: "Social",
      description: "Import candidate profiles and post jobs to LinkedIn",
      color: "#F77F00",
      status: "Available"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      name: "Indeed",
      category: "Job Boards",
      description: "Post jobs and source candidates from Indeed",
      color: "#06A77D",
      status: "Available"
    },
    {
      icon: <Users className="w-8 h-8" />,
      name: "Zoom",
      category: "Video",
      description: "Schedule and conduct video interviews through Zoom",
      color: "#FF6B35",
      status: "Available"
    },
    {
      icon: <Database className="w-8 h-8" />,
      name: "Greenhouse",
      category: "ATS",
      description: "Sync candidate data with Greenhouse ATS",
      color: "#004E89",
      status: "Coming Soon"
    },
    {
      icon: <Database className="w-8 h-8" />,
      name: "Workday",
      category: "HRIS",
      description: "Connect with Workday for HR data synchronization",
      color: "#F77F00",
      status: "Coming Soon"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      name: "Zapier",
      category: "Automation",
      description: "Connect with 5000+ apps through Zapier",
      color: "#06A77D",
      status: "Available"
    }
  ];

  const categories = ['All', 'Email', 'Calendar', 'Communication', 'Social', 'Job Boards', 'ATS', 'HRIS', 'Automation'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredIntegrations = selectedCategory === 'All' 
    ? integrations 
    : integrations.filter(int => int.category === selectedCategory);

  const benefits = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Streamlined Workflow",
      description: "Connect all your tools and automate repetitive tasks"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Centralized Data",
      description: "Keep all candidate information in one place"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Better Collaboration",
      description: "Work seamlessly with your team across platforms"
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
              <Zap className="w-12 h-12 text-[#FF6B35]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Integrations</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Connect HireLens with your favorite tools and supercharge your recruitment workflow
            </p>
          </div>

          {/* Benefits */}
          <section className="mb-16">
            <div className="grid md:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="glass-panel p-6 rounded-2xl text-center">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FF6B35]/20 to-[#F77F00]/20 flex items-center justify-center mx-auto mb-4 text-[#FF6B35]">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedCategory === category
                      ? 'bg-[#FF6B35] text-white'
                      : 'glass-panel text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Integrations Grid */}
          <section className="mb-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIntegrations.map((integration, index) => (
                <div key={index} className="glass-panel p-6 rounded-2xl hover-lift transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${integration.color}33, ${integration.color}11)`,
                        color: integration.color
                      }}
                    >
                      {integration.icon}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      integration.status === 'Available' 
                        ? 'bg-[#06A77D]/20 text-[#06A77D]' 
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {integration.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-1">{integration.name}</h3>
                  <p className="text-xs text-gray-500 mb-3">{integration.category}</p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {integration.description}
                  </p>
                  {integration.status === 'Available' && (
                    <button className="text-[#FF6B35] hover:text-[#F77F00] text-sm font-semibold transition-colors">
                      Connect →
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Custom Integration CTA */}
          <section className="glass-panel p-8 rounded-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Need a Custom Integration?</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Enterprise customers can request custom integrations with their existing tools and systems.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={() => router.push('/contact')} className="px-8 py-3 bg-[#FF6B35] text-white rounded-lg hover:bg-[#F77F00] transition-all font-semibold">
                Contact Sales
              </button>
              <button onClick={() => router.push('/api')} className="px-8 py-3 glass-panel text-white rounded-lg hover:bg-white/10 transition-all font-semibold">
                View API Docs
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
