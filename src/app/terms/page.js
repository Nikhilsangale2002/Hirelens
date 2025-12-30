'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, FileText, AlertCircle, Scale, Ban, CheckCircle, Brain } from 'lucide-react';

export default function Terms() {
  const router = useRouter();

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
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-block p-4 bg-gradient-to-br from-[#004E89]/20 to-[#06A77D]/20 rounded-2xl mb-6">
              <Scale className="w-12 h-12 text-[#004E89]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-gray-400">Last Updated: December 30, 2025</p>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            {/* Acceptance */}
            <section className="glass-panel p-8 rounded-2xl">
              <h2 className="text-3xl font-bold mb-4 gradient-text">Acceptance of Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                By accessing and using HireLens AI ("the Service"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these Terms of Service, please do not use the Service. We reserve the right to update and change these terms at any time without notice.
              </p>
            </section>

            {/* Description of Service */}
            <section className="glass-panel p-8 rounded-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="w-8 h-8 text-[#FF6B35]" />
                <h2 className="text-3xl font-bold">Description of Service</h2>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-4">
                HireLens AI provides an AI-powered recruitment platform that enables users to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Upload and analyze job descriptions</li>
                <li>Process and score candidate resumes using artificial intelligence</li>
                <li>Manage recruitment workflows and candidate pipelines</li>
                <li>Generate insights and analytics on hiring processes</li>
                <li>Collaborate with team members on recruitment decisions</li>
              </ul>
            </section>

            {/* User Accounts */}
            <section className="glass-panel p-8 rounded-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <CheckCircle className="w-8 h-8 text-[#06A77D]" />
                <h2 className="text-3xl font-bold">User Accounts</h2>
              </div>
              
              <div className="space-y-4 text-gray-300">
                <p className="leading-relaxed">
                  <strong>Registration:</strong> You must register for an account to use certain features of the Service. You agree to provide accurate, current, and complete information during registration and to update such information as necessary.
                </p>
                <p className="leading-relaxed">
                  <strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
                </p>
                <p className="leading-relaxed">
                  <strong>Account Termination:</strong> We reserve the right to terminate or suspend your account at any time for violations of these terms or for any other reason at our sole discretion.
                </p>
              </div>
            </section>

            {/* Acceptable Use */}
            <section className="glass-panel p-8 rounded-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <AlertCircle className="w-8 h-8 text-[#F77F00]" />
                <h2 className="text-3xl font-bold">Acceptable Use Policy</h2>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-4">
                You agree NOT to use the Service to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Upload malicious code or engage in any activity that disrupts the Service</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the intellectual property rights of others</li>
                <li>Upload discriminatory content or engage in biased hiring practices</li>
                <li>Attempt to gain unauthorized access to other users' accounts or data</li>
                <li>Use the Service for any unlawful or fraudulent purpose</li>
                <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
                <li>Scrape or harvest data from the Service without authorization</li>
              </ul>
            </section>

            {/* Data and Privacy */}
            <section className="glass-panel p-8 rounded-2xl">
              <h2 className="text-3xl font-bold mb-4">Data Ownership and Privacy</h2>
              
              <div className="space-y-4 text-gray-300">
                <p className="leading-relaxed">
                  <strong>Your Data:</strong> You retain all rights to the data you upload to the Service, including resumes, job descriptions, and candidate information. You grant us a license to process this data solely to provide the Service.
                </p>
                <p className="leading-relaxed">
                  <strong>AI Training:</strong> By using the Service, you acknowledge that anonymized and aggregated data may be used to improve our AI models. No personally identifiable information will be used without your explicit consent.
                </p>
                <p className="leading-relaxed">
                  <strong>Data Protection:</strong> We implement industry-standard security measures to protect your data. Please refer to our Privacy Policy for detailed information.
                </p>
              </div>
            </section>

            {/* Subscription and Billing */}
            <section className="glass-panel p-8 rounded-2xl">
              <h2 className="text-3xl font-bold mb-4">Subscription and Billing</h2>
              
              <div className="space-y-4 text-gray-300">
                <p className="leading-relaxed">
                  <strong>Payment:</strong> Certain features of the Service require payment of fees. You agree to pay all applicable fees according to your chosen plan.
                </p>
                <p className="leading-relaxed">
                  <strong>Billing Cycle:</strong> Subscription fees are billed in advance on a monthly or annual basis depending on your plan selection.
                </p>
                <p className="leading-relaxed">
                  <strong>Cancellation:</strong> You may cancel your subscription at any time. Cancellations will be effective at the end of the current billing period. No refunds will be provided for partial billing periods.
                </p>
                <p className="leading-relaxed">
                  <strong>Price Changes:</strong> We reserve the right to modify our pricing with 30 days' notice.
                </p>
              </div>
            </section>

            {/* Disclaimer */}
            <section className="glass-panel p-8 rounded-2xl border border-[#FF6B35]/30">
              <div className="flex items-center space-x-3 mb-6">
                <Ban className="w-8 h-8 text-[#FF6B35]" />
                <h2 className="text-3xl font-bold">Disclaimer of Warranties</h2>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-4">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>The Service will be uninterrupted, secure, or error-free</li>
                <li>The results obtained from the AI analysis will be accurate or reliable</li>
                <li>Defects in the Service will be corrected</li>
                <li>The Service will meet your specific requirements</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section className="glass-panel p-8 rounded-2xl">
              <h2 className="text-3xl font-bold mb-4">Limitation of Liability</h2>
              <p className="text-gray-300 leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, HIRELENS AI SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM YOUR USE OF THE SERVICE.
              </p>
            </section>

            {/* Governing Law */}
            <section className="glass-panel p-8 rounded-2xl">
              <h2 className="text-3xl font-bold mb-4">Governing Law</h2>
              <p className="text-gray-300 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which HireLens AI operates, without regard to its conflict of law provisions.
              </p>
            </section>

            {/* Contact */}
            <section className="glass-panel p-8 rounded-2xl">
              <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                For questions about these Terms of Service, please contact us at:
              </p>
              <div className="text-gray-300 space-y-2">
                <p><strong>Email:</strong> legal@hirelens.ai</p>
                <p><strong>Address:</strong> HireLens AI Inc., 123 AI Street, Tech City, TC 12345</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
