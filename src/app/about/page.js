import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Brain, Target, Users, TrendingUp, Award, Globe, Zap } from 'lucide-react';

export const metadata = {
  title: 'About Us | HireLens - AI-Powered Recruitment Platform',
  description: 'Learn about HireLens mission to revolutionize recruitment through AI technology. Meet our team and discover our values.',
  openGraph: {
    title: 'About HireLens',
    description: 'Making hiring smarter, faster, and fairer using AI',
  },
};

export default function About() {

  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Innovation First",
      description: "We push the boundaries of AI technology to solve real recruitment challenges.",
      color: "#FF6B35"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "People-Centric",
      description: "Technology should enhance human decision-making, not replace it.",
      color: "#004E89"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Continuous Growth",
      description: "We're committed to constant improvement and learning from our customers.",
      color: "#F77F00"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excellence",
      description: "We hold ourselves to the highest standards in everything we do.",
      color: "#06A77D"
    }
  ];

  const team = [
    {
      name: "Nikhil Sangale",
      role: "CEO & Co-founder",
      bio: "Former VP of Engineering at TechCorp, 15+ years in AI/ML"
    },
    {
      name: "Michael Rodriguez",
      role: "CTO & Co-founder",
      bio: "PhD in Computer Science, ex-Google AI Research"
    },
    {
      name: "Emily Thompson",
      role: "Head of Product",
      bio: "10+ years building HR tech solutions at scale"
    },
    {
      name: "Nikhil Sangale",
      role: "Head of AI",
      bio: "Published researcher in NLP and machine learning"
    }
  ];

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
              <Globe className="w-12 h-12 text-[#FF6B35]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About HireLens</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're on a mission to make hiring smarter, faster, and fairer using the power of artificial intelligence.
            </p>
          </div>

          {/* Story */}
          <section className="mb-16">
            <div className="glass-panel p-8 rounded-2xl">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  HireLens AI was founded in 2023 by a team of AI researchers and HR professionals who saw firsthand how broken the recruitment process had become. Traditional methods were time-consuming, biased, and often missed the best candidates.
                </p>
                <p>
                  We believed there was a better way. By combining cutting-edge natural language processing with deep learning, we created a platform that understands resumes and job descriptions the way a human would—but at scale and without bias.
                </p>
                <p>
                  Today, we're proud to serve over 500 companies worldwide, helping them find exceptional talent faster while ensuring every candidate gets a fair evaluation based solely on their skills and experience.
                </p>
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="glass-panel p-8 rounded-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-8 h-8 text-[#FF6B35]" />
                <h2 className="text-2xl font-bold">Our Mission</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To revolutionize recruitment by making it faster, more accurate, and completely bias-free through advanced AI technology that empowers hiring teams to make better decisions.
              </p>
            </div>
            
            <div className="glass-panel p-8 rounded-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="w-8 h-8 text-[#004E89]" />
                <h2 className="text-2xl font-bold">Our Vision</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                A world where every person has an equal opportunity to showcase their talents, and every company has access to the best talent regardless of location or background.
              </p>
            </div>
          </section>

          {/* Values */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div key={index} className="glass-panel p-6 rounded-2xl hover-lift transition-all">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                    style={{ 
                      background: `linear-gradient(135deg, ${value.color}33, ${value.color}11)`,
                      color: value.color
                    }}
                  >
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Team */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                We're a diverse group of AI researchers, engineers, and HR experts passionate about transforming recruitment.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <div key={index} className="glass-panel p-6 rounded-2xl text-center hover-lift transition-all">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#FF6B35] to-[#F77F00] rounded-full flex items-center justify-center text-2xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                  <p className="text-[#FF6B35] text-sm mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Stats */}
          <section className="glass-panel p-8 rounded-2xl">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2 gradient-text">500+</div>
                <div className="text-gray-400">Companies Trust Us</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2 gradient-text">10K+</div>
                <div className="text-gray-400">Resumes Processed</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2 gradient-text">95%</div>
                <div className="text-gray-400">Customer Satisfaction</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2 gradient-text">50+</div>
                <div className="text-gray-400">Team Members</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
