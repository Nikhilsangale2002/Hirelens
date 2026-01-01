import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Brain, Target, Layers, LineChart, Zap, Shield, Clock, Users, CheckCircle, TrendingUp, BarChart } from 'lucide-react';

export const metadata = {
  title: 'Features | HireLens - AI-Powered Recruitment Features',
  description: 'Explore HireLens powerful features: Neural Screening, Precision Matching, Equity Engine, and Live Pipeline for smarter hiring.',
  openGraph: {
    title: 'HireLens Features',
    description: 'AI-powered recruitment features for modern hiring teams',
  },
};

// Move static data outside component for better performance
const mainFeatures = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Neural Screening",
      description: "Advanced deep learning models analyze resumes with human-level comprehension, extracting nuanced insights about skills, experience, and potential.",
      features: [
        "Natural language processing for accurate skill extraction",
        "Context-aware experience evaluation",
        "Automatic qualification matching",
        "Bias-free candidate assessment"
      ],
      color: "#FF6B35"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Precision Matching",
      description: "Proprietary scoring algorithm evaluates candidates across 50+ dimensions with transparent reasoning you can trust.",
      features: [
        "Multi-dimensional candidate scoring",
        "Transparent AI decision-making",
        "Custom weighted criteria",
        "Real-time match confidence scores"
      ],
      color: "#004E89"
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Equity Engine",
      description: "Blind evaluation process removes unconscious bias, ensuring merit-based selection and diverse talent pools.",
      features: [
        "Anonymized candidate review",
        "Bias detection and removal",
        "Fair comparison algorithms",
        "Diversity analytics and insights"
      ],
      color: "#F77F00"
    },
    {
      icon: <LineChart className="w-8 h-8" />,
      title: "Live Pipeline",
      description: "Real-time analytics and automated workflows keep your hiring process moving at the speed of opportunity.",
      features: [
        "Automated candidate communications",
        "Pipeline stage tracking",
        "Team collaboration tools",
        "Performance analytics dashboard"
      ],
      color: "#06A77D"
    }
];

const additionalFeatures = [
  {
    icon: <Zap className="w-6 h-6" />,
      title: "Bulk Resume Processing",
      description: "Upload and process hundreds of resumes simultaneously in any format.",
      color: "#FF6B35"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Data Security",
      description: "Enterprise-grade encryption and compliance with GDPR, SOC 2, and ISO 27001.",
      color: "#004E89"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Time Tracking",
      description: "Monitor time-to-hire metrics and optimize your recruitment timeline.",
      color: "#F77F00"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Collaboration",
      description: "Share feedback, assign tasks, and coordinate hiring decisions seamlessly.",
      color: "#06A77D"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Predictive Analytics",
      description: "Forecast hiring needs and success rates using historical data.",
      color: "#FF6B35"
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: "Custom Reports",
      description: "Generate detailed reports on hiring metrics, sources, and performance.",
      color: "#004E89"
  }
];

export default function Features() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 bg-gray-50 border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
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
              Powerful <span className="gradient-text">Features</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to revolutionize your hiring process with AI-powered intelligence
            </p>
          </div>

          {/* Main Features */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Core Capabilities</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {mainFeatures.map((feature, index) => (
                <div key={index} className="glass-panel p-8 rounded-2xl hover-lift transition-all">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{
                      background: `linear-gradient(135deg, ${feature.color}33, ${feature.color}11)`,
                      color: feature.color
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-[#06A77D] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Additional Features */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">More Features</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {additionalFeatures.map((feature, index) => (
                <div key={index} className="glass-panel p-6 rounded-2xl hover-lift transition-all">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{
                      background: `linear-gradient(135deg, ${feature.color}33, ${feature.color}11)`,
                      color: feature.color
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Integration */}
          <section className="glass-panel p-8 rounded-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Seamless Integration</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              HireLens integrates with your existing tools and workflows. Connect with your ATS, email, calendar, and more.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {['Gmail', 'Outlook', 'Slack', 'Teams', 'Zoom', 'Calendar', 'LinkedIn', 'Indeed'].map((tool, index) => (
                <div key={index} className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium text-gray-700">
                  {tool}
                </div>
              ))}
            </div>
            <Link href="/signup" className="inline-block px-8 py-3 bg-[#FF6B35] text-white rounded-lg hover:bg-[#F77F00] transition-all font-semibold">
              Get Started Free
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
