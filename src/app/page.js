'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ArrowRight, Sparkles, Zap, Target, TrendingUp, Shield, Clock, Users, CheckCircle, Menu, X, Brain, Layers, LineChart, Linkedin, Github } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  const handleScroll = useCallback(() => {
    // Throttle scroll updates for better performance
    window.requestAnimationFrame(() => {
      setScrollY(window.scrollY);
    });
  }, []);
  
  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const features = useMemo(() => [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Neural Screening",
      description: "Deep learning models analyze resumes with human-level comprehension, extracting nuanced insights about skills, experience, and potential.",
      stat: "70% faster",
      color: "#FF6B35"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Precision Matching",
      description: "Proprietary scoring algorithm evaluates candidates across 50+ dimensions with transparent reasoning you can trust.",
      stat: "95% accuracy",
      color: "#004E89"
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Equity Engine",
      description: "Blind evaluation process removes unconscious bias, ensuring merit-based selection and diverse talent pools.",
      stat: "50% more diverse",
      color: "#F77F00"
    },
    {
      icon: <LineChart className="w-6 h-6" />,
      title: "Live Pipeline",
      description: "Real-time analytics and automated workflows keep your hiring process moving at the speed of opportunity.",
      stat: "2x productivity",
      color: "#06A77D"
    }
  ], []);

  const stats = useMemo(() => [
    { value: "10K+", label: "Resumes Analyzed", color: "#FF6B35" },
    { value: "500+", label: "Companies", color: "#004E89" },
    { value: "70%", label: "Time Reduction", color: "#F77F00" },
    { value: "4.9", label: "Rating", color: "#06A77D" }
  ], []);

  const plans = useMemo(() => [
    {
      name: "Starter",
      price: "₹1,999",
      period: "/month",
      description: "Perfect for small teams and startups",
      features: [
        "3 active job postings",
        "500 resume scans/month",
        "AI-powered scoring",
        "Basic analytics",
        "Email support"
      ],
      highlighted: false
    },
    {
      name: "Pro",
      price: "₹4,999",
      period: "/month",
      description: "For growing companies with high volume",
      features: [
        "10 active job postings",
        "2,000 resume scans/month",
        "Advanced AI insights",
        "Team collaboration",
        "Priority support",
        "Custom workflows"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Tailored solutions for large organizations",
      features: [
        "Unlimited job postings",
        "Unlimited resume scans",
        "White-label options",
        "API access",
        "Dedicated manager",
        "Custom integrations"
      ],
      highlighted: false
    }
  ], []);

  return (
    <div className="min-h-screen bg-white text-black font-sans overflow-x-hidden">
      {/* Noise Texture */}
      <div className="noise"></div>

      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50 ? 'bg-white/95 backdrop-blur-lg shadow-2xl border-b border-gray-200' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 animate-fadeIn">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35] to-[#F77F00] rounded-lg animate-pulse-glow"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35] to-[#F77F00] rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold tracking-tight">HireLens</span>
              <span className="text-xs font-mono text-gray-600 tracking-wider">AI</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => router.push('/features')} className="text-gray-600 hover:text-[#FF6B35] transition-colors font-medium">Features</button>
              <button onClick={() => router.push('/pricing')} className="text-gray-600 hover:text-[#FF6B35] transition-colors font-medium">Pricing</button>
              <button onClick={() => router.push('/about')} className="text-gray-600 hover:text-[#FF6B35] transition-colors font-medium">About</button>
              <button onClick={() => router.push('/contact')} className="text-gray-600 hover:text-[#FF6B35] transition-colors font-medium">Contact</button>
              <button onClick={() => router.push('/careers')} className="text-gray-600 hover:text-[#FF6B35] transition-colors font-medium">Careers</button>
              <button onClick={() => router.push('/signin')} className="px-6 py-2 text-gray-600 hover:text-black transition-colors font-medium">
                Sign In
              </button>
              <button onClick={() => router.push('/signup')} className="px-6 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#F77F00] transition-all font-semibold hover:shadow-lg hover:shadow-[#FF6B35]/50">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-6 pb-4 space-y-4 animate-fadeIn border-t border-gray-200 pt-4">
              <button onClick={() => router.push('/features')} className="block text-left text-gray-600 hover:text-[#FF6B35] font-medium">Features</button>
              <button onClick={() => router.push('/pricing')} className="block text-left text-gray-600 hover:text-[#FF6B35] font-medium">Pricing</button>
              <button onClick={() => router.push('/about')} className="block text-left text-gray-600 hover:text-[#FF6B35] font-medium">About</button>
              <button onClick={() => router.push('/contact')} className="block text-left text-gray-600 hover:text-[#FF6B35] font-medium">Contact</button>
              <button onClick={() => router.push('/careers')} className="block text-left text-gray-600 hover:text-[#FF6B35] font-medium">Careers</button>
              <button onClick={() => router.push('/signin')} className="block w-full px-6 py-2 text-gray-600 border border-gray-600 rounded-lg font-medium">
                Sign In
              </button>
              <button onClick={() => router.push('/signup')} className="block w-full px-6 py-2 bg-[#FF6B35] text-white rounded-lg font-semibold">
                Get Started
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 grid-bg"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#FF6B35] rounded-full filter blur-[120px] opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-[#004E89] rounded-full filter blur-[120px] opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-[#F77F00] rounded-full filter blur-[120px] opacity-15 animate-float" style={{ animationDelay: '4s' }}></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-block mb-8 animate-fadeIn">
              <div className="px-4 py-2 glass-panel rounded-full text-sm font-mono tracking-wide">
                <span className="text-[#FF6B35]">●</span> Neural Recruitment Engine
              </div>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              Hire Smarter,
              <br />
              Not <span className="gradient-text">Harder</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              AI-powered recruitment that understands talent beyond keywords. Screen thousands of candidates in seconds with unprecedented accuracy.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
              <button onClick={() => router.push('/signup')} className="group px-8 py-4 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#F77F00] transition-all hover:shadow-xl hover:shadow-[#FF6B35]/50 flex items-center space-x-2">
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 glass-panel text-black rounded-lg font-semibold hover:bg-gray-100 transition-all">
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fadeIn" style={{ animationDelay: '0.8s' }}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center group cursor-pointer">
                  <div className="text-4xl md:text-5xl font-bold mb-2 font-mono" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium tracking-wide">{stat.label}</div>
                  <div className="h-1 w-12 mx-auto mt-3 rounded-full bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: stat.color }}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 glass-panel rounded-full text-sm font-mono tracking-wide mb-6">
              <span className="text-[#F77F00]">●</span> Capabilities
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Built for <span className="gradient-text">Modern</span> Teams
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enterprise-grade AI that transforms how you discover and evaluate talent
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`feature-card glass-panel p-8 rounded-2xl hover-lift transition-all ${
                  activeFeature === index ? 'ring-2 ring-opacity-50' : ''
                }`}
                style={{ 
                  color: activeFeature === index ? feature.color : 'inherit',
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ 
                      background: `linear-gradient(135deg, ${feature.color}22, ${feature.color}11)`,
                      color: feature.color
                    }}
                  >
                    {feature.icon}
                  </div>
                  <div 
                    className="px-3 py-1 rounded-full text-xs font-mono font-bold"
                    style={{ 
                      background: `${feature.color}22`,
                      color: feature.color
                    }}
                  >
                    {feature.stat}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 glass-panel rounded-full text-sm font-mono tracking-wide mb-6">
              <span className="text-[#004E89]">●</span> Process
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Three Steps to <span className="gradient-text">Better</span> Hires
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Define Requirements",
                description: "Upload your job description. Our AI analyzes and understands the role's nuances, technical requirements, and cultural fit indicators.",
                icon: <Target className="w-8 h-8" />,
                color: "#FF6B35"
              },
              {
                step: "02",
                title: "Process Candidates",
                description: "Bulk upload resumes in any format. Our neural engine extracts, parses, and structures every relevant detail instantly.",
                icon: <Zap className="w-8 h-8" />,
                color: "#F77F00"
              },
              {
                step: "03",
                title: "Review Rankings",
                description: "Get AI-scored candidates with transparent reasoning. Dive into detailed insights on skills match, experience, and potential.",
                icon: <TrendingUp className="w-8 h-8" />,
                color: "#004E89"
              }
            ].map((item, index) => (
              <div key={index} className="relative group">
                {index < 2 && (
                  <div className="hidden md:block absolute top-16 left-[calc(100%-2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-white/20 to-transparent"></div>
                )}
                
                <div className="glass-panel p-8 rounded-2xl hover-lift relative overflow-hidden">
                  <div className="absolute top-0 right-0 text-[120px] font-bold opacity-5 font-mono" style={{ color: item.color }}>
                    {item.step}
                  </div>
                  
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 relative z-10"
                    style={{ 
                      background: `linear-gradient(135deg, ${item.color}33, ${item.color}11)`,
                      color: item.color
                    }}
                  >
                    {item.icon}
                  </div>
                  
                  <div className="font-mono text-sm mb-3 opacity-60" style={{ color: item.color }}>
                    STEP {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 glass-panel rounded-full text-sm font-mono tracking-wide mb-6">
              <span className="text-[#06A77D]">●</span> Pricing
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Simple, <span className="gradient-text">Transparent</span>
            </h2>
            <p className="text-xl text-gray-600">Choose the plan that scales with your team</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`glass-panel rounded-2xl p-8 hover-lift relative ${
                  plan.highlighted 
                    ? 'ring-2 ring-[#FF6B35] scale-105 shadow-2xl shadow-[#FF6B35]/20' 
                    : ''
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#FF6B35] text-white text-xs font-mono font-bold rounded-full">
                    MOST POPULAR
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-6">{plan.description}</p>
                
                <div className="mb-8">
                  <span className="text-5xl font-bold font-mono">{plan.price}</span>
                  <span className="text-gray-600 font-mono">{plan.period}</span>
                </div>

                <button onClick={() => plan.name === 'Enterprise' ? null : router.push('/signup')} className={`w-full py-3 rounded-lg font-semibold transition-all mb-8 ${
                  plan.highlighted
                    ? 'bg-[#FF6B35] text-white hover:bg-[#F77F00] hover:shadow-lg hover:shadow-[#FF6B35]/50'
                    : 'bg-gray-100 text-black hover:bg-gray-200 border border-gray-200'
                }`}>
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </button>

                <div className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#06A77D] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="glass-panel rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B35] rounded-full filter blur-[100px] opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#004E89] rounded-full filter blur-[100px] opacity-20"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Ready to Transform
                <br />Your <span className="gradient-text">Hiring Process</span>?
              </h2>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                Join 500+ companies using HireLens AI to find exceptional talent faster
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button onClick={() => router.push('/signup')} className="group px-8 py-4 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#F77F00] transition-all hover:shadow-xl hover:shadow-[#FF6B35]/50 flex items-center space-x-2">
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 glass-panel text-black rounded-lg font-semibold hover:bg-gray-100 transition-all">
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35] to-[#F77F00] rounded-lg animate-pulse-glow"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35] to-[#F77F00] rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                </div>
                <span className="text-xl font-bold">HireLens</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                AI-powered recruitment platform helping companies discover exceptional talent.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><button onClick={() => router.push('/features')} className="hover:text-[#FF6B35] transition-colors">Features</button></li>
                <li><button onClick={() => router.push('/pricing')} className="hover:text-[#FF6B35] transition-colors">Pricing</button></li>
                <li><button onClick={() => router.push('/api-docs')} className="hover:text-[#FF6B35] transition-colors">API</button></li>
                <li><button onClick={() => router.push('/integrations')} className="hover:text-[#FF6B35] transition-colors">Integrations</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><button onClick={() => router.push('/about')} className="hover:text-[#FF6B35] transition-colors">About</button></li>
                <li><button onClick={() => router.push('/blog')} className="hover:text-[#FF6B35] transition-colors">Blog</button></li>
                <li><button onClick={() => router.push('/careers')} className="hover:text-[#FF6B35] transition-colors">Careers</button></li>
                <li><button onClick={() => router.push('/contact')} className="hover:text-[#FF6B35] transition-colors">Contact</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><button onClick={() => router.push('/privacy')} className="hover:text-[#FF6B35] transition-colors">Privacy</button></li>
                <li><button onClick={() => router.push('/terms')} className="hover:text-[#FF6B35] transition-colors">Terms</button></li>
                <li><button onClick={() => router.push('/security')} className="hover:text-[#FF6B35] transition-colors">Security</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
            <p>© 2024 HireLens AI. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a href="#" className="p-2 hover:bg-[#FF6B35]/10 hover:text-[#FF6B35] rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 hover:bg-[#FF6B35]/10 hover:text-[#FF6B35] rounded-lg transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 hover:bg-[#FF6B35]/10 hover:text-[#FF6B35] rounded-lg transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
