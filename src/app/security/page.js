import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Server, Eye, Bell, FileCheck, Users, Key, Brain } from 'lucide-react';

export const metadata = {
  title: 'Security | HireLens - Data Protection & Compliance',
  description: 'Learn about HireLens comprehensive security measures, data protection standards, and compliance certifications.',
};

export default function Security() {

  const securityFeatures = [
    {
      icon: <Lock className="w-8 h-8" />,
      title: "End-to-End Encryption",
      description: "All data transmitted between your browser and our servers is encrypted using TLS 1.3 protocol.",
      color: "#FF6B35"
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: "Secure Infrastructure",
      description: "Our servers are hosted in SOC 2 Type II certified data centers with 24/7 monitoring and physical security.",
      color: "#004E89"
    },
    {
      icon: <Key className="w-8 h-8" />,
      title: "Access Control",
      description: "Multi-factor authentication and role-based access control ensure only authorized users can access sensitive data.",
      color: "#F77F00"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Regular Audits",
      description: "We conduct regular security audits and penetration testing to identify and address vulnerabilities.",
      color: "#06A77D"
    }
  ];

  const complianceStandards = [
    { name: "GDPR", description: "General Data Protection Regulation" },
    { name: "SOC 2 Type II", description: "Security and Availability Controls" },
    { name: "ISO 27001", description: "Information Security Management" },
    { name: "CCPA", description: "California Consumer Privacy Act" }
  ];

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
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-block p-4 bg-gradient-to-br from-[#06A77D]/20 to-[#004E89]/20 rounded-2xl mb-6">
              <Shield className="w-12 h-12 text-[#06A77D]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Security</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your data security is our top priority. Learn about our comprehensive security measures and compliance standards.
            </p>
          </div>

          {/* Security Features */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Security Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {securityFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="glass-panel p-6 rounded-2xl hover-lift transition-all"
                >
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                    style={{ 
                      background: `linear-gradient(135deg, ${feature.color}33, ${feature.color}11)`,
                      color: feature.color
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Data Protection */}
          <section className="mb-16">
            <div className="glass-panel p-8 rounded-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <Lock className="w-8 h-8 text-[#FF6B35]" />
                <h2 className="text-3xl font-bold">Data Protection Measures</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 text-gray-600">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-white">Encryption at Rest</h3>
                  <p className="leading-relaxed">
                    All stored data is encrypted using AES-256 encryption, the same standard used by banks and government agencies.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-white">Encryption in Transit</h3>
                  <p className="leading-relaxed">
                    Data transferred between your device and our servers is protected with TLS 1.3, ensuring secure communication.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-white">Secure Backups</h3>
                  <p className="leading-relaxed">
                    Automated encrypted backups are performed daily and stored in geographically distributed locations.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-white">Data Segregation</h3>
                  <p className="leading-relaxed">
                    Customer data is logically separated to ensure complete isolation between different organizations.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Access Security */}
          <section className="mb-16">
            <div className="glass-panel p-8 rounded-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <Users className="w-8 h-8 text-[#004E89]" />
                <h2 className="text-3xl font-bold">Access Security</h2>
              </div>
              
              <div className="space-y-6 text-gray-600">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-white flex items-center space-x-2">
                    <Key className="w-5 h-5 text-[#F77F00]" />
                    <span>Multi-Factor Authentication (MFA)</span>
                  </h3>
                  <p className="leading-relaxed">
                    Protect your account with an additional layer of security. We support authenticator apps, SMS, and hardware security keys.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-white">Role-Based Access Control (RBAC)</h3>
                  <p className="leading-relaxed">
                    Assign granular permissions to team members, ensuring users only have access to data they need for their role.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-white">Session Management</h3>
                  <p className="leading-relaxed">
                    Automatic session timeouts and secure token management prevent unauthorized access to inactive accounts.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-white">IP Whitelisting</h3>
                  <p className="leading-relaxed">
                    Enterprise plans can restrict access to specific IP addresses or ranges for additional security.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Monitoring and Response */}
          <section className="mb-16">
            <div className="glass-panel p-8 rounded-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <Bell className="w-8 h-8 text-[#06A77D]" />
                <h2 className="text-3xl font-bold">Monitoring & Incident Response</h2>
              </div>
              
              <div className="space-y-4 text-gray-600">
                <p className="leading-relaxed">
                  Our security operations center (SOC) monitors our infrastructure 24/7 for any suspicious activity or security threats.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-white/5 p-4 rounded-xl">
                    <h4 className="font-semibold mb-2 text-white">Real-Time Monitoring</h4>
                    <p className="text-sm">Continuous surveillance of all systems and network traffic for anomalies.</p>
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded-xl">
                    <h4 className="font-semibold mb-2 text-white">Automated Alerts</h4>
                    <p className="text-sm">Instant notifications for suspicious activities or potential security breaches.</p>
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded-xl">
                    <h4 className="font-semibold mb-2 text-white">Incident Response Team</h4>
                    <p className="text-sm">Dedicated team ready to respond to and mitigate security incidents rapidly.</p>
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded-xl">
                    <h4 className="font-semibold mb-2 text-white">Audit Logs</h4>
                    <p className="text-sm">Comprehensive logging of all system activities for forensics and compliance.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Compliance */}
          <section className="mb-16">
            <div className="glass-panel p-8 rounded-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <FileCheck className="w-8 h-8 text-[#F77F00]" />
                <h2 className="text-3xl font-bold">Compliance & Certifications</h2>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                HireLens AI complies with major international security and privacy regulations:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {complianceStandards.map((standard, index) => (
                  <div
                    key={index}
                    className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-[#FF6B35]/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B35]/20 to-[#F77F00]/20 rounded-lg flex items-center justify-center">
                        <Shield className="w-6 h-6 text-[#FF6B35]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-black">{standard.name}</h4>
                        <p className="text-sm text-gray-600">{standard.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Vulnerability Reporting */}
          <section className="mb-16">
            <div className="glass-panel p-8 rounded-2xl border border-[#FF6B35]/30">
              <h2 className="text-3xl font-bold mb-4">Responsible Disclosure</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We value the security community's efforts in keeping our platform secure. If you discover a security vulnerability, please report it to us responsibly.
              </p>
              
              <div className="bg-white/5 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3 text-black">How to Report</h3>
                <p className="text-gray-600 mb-4">
                  Send details of the vulnerability to <span className="text-[#FF6B35] font-mono">security@hirelens.ai</span>
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Include detailed steps to reproduce the vulnerability</li>
                  <li>Allow us reasonable time to address the issue before public disclosure</li>
                  <li>Do not access or modify data that doesn't belong to you</li>
                  <li>We'll acknowledge receipt within 48 hours and provide updates</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="glass-panel p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-4">Security Questions?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              For security-related inquiries or to report a security concern, please contact our security team:
            </p>
            <div className="text-gray-600 space-y-2">
              <p><strong>Email:</strong> security@hirelens.ai</p>
              <p><strong>Emergency:</strong> Available 24/7 for critical security incidents</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
