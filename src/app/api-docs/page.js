'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Brain, Code, Key, Shield, Zap, CheckCircle, Copy } from 'lucide-react';

export default function API() {
  const router = useRouter();
  const [copiedCode, setCopiedCode] = useState('');

  const copyToClipboard = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const codeExamples = [
    {
      id: 'auth',
      title: 'Authentication',
      language: 'bash',
      code: `curl -X POST https://api.hirelens.ai/v1/auth \\
  -H "Content-Type: application/json" \\
  -d '{"api_key": "your_api_key_here"}'`
    },
    {
      id: 'upload',
      title: 'Upload Resume',
      language: 'javascript',
      code: `const formData = new FormData();
formData.append('resume', fileInput.files[0]);
formData.append('job_id', '12345');

fetch('https://api.hirelens.ai/v1/resumes', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: formData
});`
    },
    {
      id: 'analyze',
      title: 'Analyze Candidate',
      language: 'python',
      code: `import requests

response = requests.post(
    'https://api.hirelens.ai/v1/analyze',
    headers={'Authorization': 'Bearer YOUR_API_KEY'},
    json={
        'resume_id': 'res_123abc',
        'job_description': 'Senior Python Developer...'
    }
)

result = response.json()
print(f"Match Score: {result['score']}")`
    }
  ];

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Fast & Reliable",
      description: "99.9% uptime SLA with sub-100ms response times",
      color: "#FF6B35"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure by Default",
      description: "Enterprise-grade security with OAuth 2.0 and API key authentication",
      color: "#004E89"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "RESTful Design",
      description: "Clean, predictable API following industry best practices",
      color: "#F77F00"
    },
    {
      icon: <Key className="w-8 h-8" />,
      title: "Easy Integration",
      description: "Comprehensive docs and SDKs for all major languages",
      color: "#06A77D"
    }
  ];

  const endpoints = [
    {
      method: 'POST',
      path: '/v1/resumes',
      description: 'Upload and parse a resume file'
    },
    {
      method: 'GET',
      path: '/v1/resumes/:id',
      description: 'Retrieve parsed resume data'
    },
    {
      method: 'POST',
      path: '/v1/analyze',
      description: 'Analyze candidate fit for a job'
    },
    {
      method: 'GET',
      path: '/v1/jobs',
      description: 'List all job postings'
    },
    {
      method: 'POST',
      path: '/v1/jobs',
      description: 'Create a new job posting'
    },
    {
      method: 'GET',
      path: '/v1/candidates',
      description: 'List candidates with filtering'
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
              <Code className="w-12 h-12 text-[#FF6B35]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              HireLens <span className="gradient-text">API</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Integrate powerful AI-driven recruitment capabilities directly into your applications
            </p>
          </div>

          {/* Features */}
          <section className="mb-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="glass-panel p-6 rounded-2xl text-center hover-lift transition-all">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{
                      background: `linear-gradient(135deg, ${feature.color}33, ${feature.color}11)`,
                      color: feature.color
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Getting Started */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Getting Started</h2>
            <div className="glass-panel p-8 rounded-2xl">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-[#FF6B35] flex items-center justify-center flex-shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Get Your API Key</h3>
                    <p className="text-gray-400">Sign up for an Enterprise plan to access API credentials in your dashboard.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-[#F77F00] flex items-center justify-center flex-shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Read the Documentation</h3>
                    <p className="text-gray-400">Explore our comprehensive API docs with examples and best practices.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-[#004E89] flex items-center justify-center flex-shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Start Building</h3>
                    <p className="text-gray-400">Use our SDKs or make direct API calls to integrate HireLens into your workflow.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Code Examples */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Code Examples</h2>
            <div className="space-y-6">
              {codeExamples.map((example) => (
                <div key={example.id} className="glass-panel rounded-2xl overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                    <h3 className="font-bold">{example.title}</h3>
                    <button
                      onClick={() => copyToClipboard(example.code, example.id)}
                      className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                    >
                      {copiedCode === example.id ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-[#06A77D]" />
                          <span className="text-[#06A77D] text-sm">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span className="text-sm">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-6 overflow-x-auto">
                    <code className="text-sm text-gray-300 font-mono">{example.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          </section>

          {/* Endpoints */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">API Endpoints</h2>
            <div className="glass-panel rounded-2xl overflow-hidden">
              <div className="divide-y divide-white/10">
                {endpoints.map((endpoint, index) => (
                  <div key={index} className="p-6 hover:bg-white/5 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-lg text-xs font-mono font-bold ${
                          endpoint.method === 'GET' ? 'bg-[#06A77D]/20 text-[#06A77D]' : 'bg-[#FF6B35]/20 text-[#FF6B35]'
                        }`}>
                          {endpoint.method}
                        </span>
                        <code className="text-gray-300 font-mono">{endpoint.path}</code>
                      </div>
                      <p className="text-gray-400 text-sm">{endpoint.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="glass-panel p-8 rounded-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Contact our sales team to learn more about API access and Enterprise plans.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={() => router.push('/contact')} className="px-8 py-3 bg-[#FF6B35] text-white rounded-lg hover:bg-[#F77F00] transition-all font-semibold">
                Contact Sales
              </button>
              <button className="px-8 py-3 glass-panel text-white rounded-lg hover:bg-white/10 transition-all font-semibold">
                View Documentation
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
