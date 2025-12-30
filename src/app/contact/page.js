'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Brain, Mail, Phone, MapPin, Send, MessageSquare, HelpCircle, Briefcase } from 'lucide-react';

export default function Contact() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const contactMethods = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Us",
      info: "hello@hirelens.ai",
      description: "We'll respond within 24 hours",
      color: "#FF6B35"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Call Us",
      info: "+1 (555) 123-4567",
      description: "Mon-Fri, 9am-6pm PST",
      color: "#004E89"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Visit Us",
      info: "Pune, India 412101",
      description: "Business District, Pune",
      color: "#F77F00"
    }
  ];

  const departments = [
    {
      icon: <Briefcase className="w-6 h-6" />,
      name: "Sales",
      email: "sales@hirelens.ai",
      color: "#FF6B35"
    },
    {
      icon: <HelpCircle className="w-6 h-6" />,
      name: "Support",
      email: "support@hirelens.ai",
      color: "#004E89"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      name: "Partnerships",
      email: "partners@hirelens.ai",
      color: "#F77F00"
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
              <MessageSquare className="w-12 h-12 text-[#FF6B35]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          {/* Contact Methods */}
          <section className="mb-16">
            <div className="grid md:grid-cols-3 gap-6">
              {contactMethods.map((method, index) => (
                <div key={index} className="glass-panel p-6 rounded-2xl text-center hover-lift transition-all">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{
                      background: `linear-gradient(135deg, ${method.color}33, ${method.color}11)`,
                      color: method.color
                    }}
                  >
                    {method.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{method.title}</h3>
                  <p className="text-[#FF6B35] font-semibold mb-1">{method.info}</p>
                  <p className="text-sm text-gray-400">{method.description}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="glass-panel p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors"
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FF6B35] transition-colors resize-none"
                    placeholder="Tell us more about your inquiry..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-[#FF6B35] text-white rounded-lg hover:bg-[#F77F00] transition-all font-semibold flex items-center justify-center space-x-2"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Departments & FAQ */}
            <div className="space-y-6">
              {/* Departments */}
              <div className="glass-panel p-8 rounded-2xl">
                <h2 className="text-2xl font-bold mb-6">Contact by Department</h2>
                <div className="space-y-4">
                  {departments.map((dept, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${dept.color}33, ${dept.color}11)`,
                          color: dept.color
                        }}
                      >
                        {dept.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{dept.name}</h3>
                        <p className="text-sm text-gray-400">{dept.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Help */}
              <div className="glass-panel p-8 rounded-2xl">
                <h2 className="text-2xl font-bold mb-4">Need Quick Help?</h2>
                <p className="text-gray-400 mb-4">
                  Check out our FAQ and documentation for instant answers to common questions.
                </p>
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-left">
                    📚 View Documentation
                  </button>
                  <button className="w-full px-4 py-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-left">
                    ❓ Browse FAQ
                  </button>
                  <button className="w-full px-4 py-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-left">
                    💬 Live Chat Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
