'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Brain, Calendar, Clock, ArrowRight } from 'lucide-react';

export default function Blog() {
  const router = useRouter();

  const blogPosts = [
    {
      title: "The Future of AI in Recruitment: 2025 Trends",
      excerpt: "Explore the cutting-edge AI technologies transforming how companies hire talent in 2025 and beyond.",
      date: "December 28, 2025",
      readTime: "5 min read",
      category: "AI & Technology",
      color: "#FF6B35"
    },
    {
      title: "How to Eliminate Bias in Your Hiring Process",
      excerpt: "Learn practical strategies to create a fairer, more equitable recruitment process using data-driven insights.",
      date: "December 25, 2025",
      readTime: "7 min read",
      category: "Best Practices",
      color: "#004E89"
    },
    {
      title: "Resume Screening at Scale: A Complete Guide",
      excerpt: "Master the art of efficiently screening thousands of resumes while maintaining quality and fairness.",
      date: "December 20, 2025",
      readTime: "6 min read",
      category: "Guides",
      color: "#F77F00"
    },
    {
      title: "Understanding AI Confidence Scores",
      excerpt: "Demystifying how our AI calculates candidate match scores and what they mean for your hiring decisions.",
      date: "December 15, 2025",
      readTime: "4 min read",
      category: "Product Updates",
      color: "#06A77D"
    },
    {
      title: "Remote Hiring: Best Practices for 2025",
      excerpt: "Navigate the challenges of remote recruitment with AI-powered tools and proven strategies.",
      date: "December 10, 2025",
      readTime: "8 min read",
      category: "Remote Work",
      color: "#FF6B35"
    },
    {
      title: "Case Study: TechCorp's 70% Time Savings",
      excerpt: "How TechCorp reduced their time-to-hire by 70% using HireLens AI's automated screening platform.",
      date: "December 5, 2025",
      readTime: "5 min read",
      category: "Case Studies",
      color: "#004E89"
    }
  ];

  const categories = [
    "All Posts",
    "AI & Technology",
    "Best Practices",
    "Guides",
    "Product Updates",
    "Case Studies",
    "Remote Work"
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
              <Brain className="w-12 h-12 text-[#FF6B35]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">HireLens Blog</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Insights, guides, and best practices for modern recruitment and AI-powered hiring.
            </p>
          </div>

          {/* Categories */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    index === 0
                      ? 'bg-[#FF6B35] text-white'
                      : 'glass-panel text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {blogPosts.map((post, index) => (
              <div
                key={index}
                className="glass-panel rounded-2xl overflow-hidden hover-lift transition-all cursor-pointer group"
              >
                <div
                  className="h-48 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${post.color}33, ${post.color}11)`
                  }}
                >
                  <div className="text-6xl font-bold opacity-10" style={{ color: post.color }}>
                    {index + 1}
                  </div>
                  <div
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: post.color,
                      color: 'white'
                    }}
                  >
                    {post.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-[#FF6B35] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <button className="flex items-center space-x-2 text-[#FF6B35] font-semibold group-hover:space-x-3 transition-all">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <section className="glass-panel p-8 rounded-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest insights on AI, recruitment trends, and product updates.
            </p>
            <div className="max-w-md mx-auto flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors"
              />
              <button className="px-6 py-3 bg-[#FF6B35] text-white rounded-lg hover:bg-[#F77F00] transition-all font-semibold">
                Subscribe
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
