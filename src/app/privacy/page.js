import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Eye, Lock, Database, Users, FileText, Brain } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | HireLens',
  description: 'Learn how HireLens collects, uses, and protects your data. Read our comprehensive Privacy Policy.',
};

export default function Privacy() {

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 bg-gray-50 border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors">
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
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-block p-4 bg-gradient-to-br from-[#FF6B35]/20 to-[#F77F00]/20 rounded-2xl mb-6">
              <Shield className="w-12 h-12 text-[#FF6B35]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-gray-600">Last Updated: December 30, 2025</p>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            {/* Introduction */}
            <section className="glass-panel p-8 rounded-2xl">
              <h2 className="text-3xl font-bold mb-4 gradient-text">Introduction</h2>
              <p className="text-gray-600 leading-relaxed">
                At HireLens AI, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered recruitment platform. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="glass-panel p-8 rounded-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <Database className="w-8 h-8 text-[#FF6B35]" />
                <h2 className="text-3xl font-bold">Information We Collect</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-[#F77F00]">Personal Information</h3>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    We collect personal information that you voluntarily provide to us when you register on the platform, including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                    <li>Name and contact information (email, phone number)</li>
                    <li>Company information and job title</li>
                    <li>Resume and candidate data (when uploaded)</li>
                    <li>Payment and billing information</li>
                    <li>Usage data and preferences</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-[#F77F00]">Automatically Collected Information</h3>
                  <p className="text-gray-600 leading-relaxed">
                    When you access our platform, we automatically collect certain information about your device, including IP address, browser type, operating system, access times, and pages viewed.
                  </p>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="glass-panel p-8 rounded-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <Eye className="w-8 h-8 text-[#004E89]" />
                <h2 className="text-3xl font-bold">How We Use Your Information</h2>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>Provide, operate, and maintain our recruitment platform</li>
                <li>Process and analyze resumes using AI technology</li>
                <li>Improve and personalize your experience</li>
                <li>Process your transactions and manage billing</li>
                <li>Send you updates, newsletters, and marketing communications (with your consent)</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Monitor and analyze usage patterns to improve our services</li>
                <li>Detect, prevent, and address technical issues and security threats</li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="glass-panel p-8 rounded-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <Lock className="w-8 h-8 text-[#06A77D]" />
                <h2 className="text-3xl font-bold">Data Security</h2>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>End-to-end encryption for data transmission</li>
                <li>Secure data storage with industry-standard encryption</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Employee training on data protection and privacy</li>
              </ul>
            </section>

            {/* Data Sharing */}
            <section className="glass-panel p-8 rounded-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <Users className="w-8 h-8 text-[#FF6B35]" />
                <h2 className="text-3xl font-bold">Data Sharing and Disclosure</h2>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-4">
                We do not sell your personal information. We may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li><strong>Service Providers:</strong> Third-party vendors who perform services on our behalf</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>With Your Consent:</strong> When you explicitly agree to share your information</li>
              </ul>
            </section>

            {/* Your Rights */}
            <section className="glass-panel p-8 rounded-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="w-8 h-8 text-[#F77F00]" />
                <h2 className="text-3xl font-bold">Your Privacy Rights</h2>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-4">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Object:</strong> Object to certain processing of your data</li>
              </ul>
              
              <p className="text-gray-300 leading-relaxed mt-4">
                To exercise these rights, please contact us at privacy@hirelens.ai
              </p>
            </section>

            {/* Contact */}
            <section className="glass-panel p-8 rounded-2xl">
              <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have questions or concerns about this Privacy Policy, please contact us at:
              </p>
              <div className="text-gray-300 space-y-2">
                <p><strong>Email:</strong> privacy@hirelens.ai</p>
                <p><strong>Address:</strong> HireLens AI Inc., 123 AI Street, Tech City, TC 12345</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
