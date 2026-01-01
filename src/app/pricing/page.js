'use client';

import React, { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Brain, CheckCircle, X, HelpCircle } from 'lucide-react';

// Static data moved outside for performance
const PLANS_DATA = [
    {
      name: "Starter",
      monthlyPrice: "₹1,999",
      annualPrice: "₹19,990",
      savingsText: "Save ₹3,998/year",
      description: "Perfect for small teams and startups",
      features: [
        "3 active job postings",
        "500 resume scans/month",
        "AI-powered scoring",
        "Basic analytics",
        "Email support",
        "Standard integrations"
      ],
      notIncluded: [
        "Team collaboration",
        "Custom workflows",
        "API access"
      ],
      highlighted: false,
      color: "#FF6B35"
    },
    {
      name: "Pro",
      monthlyPrice: "₹4,999",
      annualPrice: "₹49,990",
      savingsText: "Save ₹9,998/year",
      description: "For growing companies with high volume",
      features: [
        "10 active job postings",
        "2,000 resume scans/month",
        "Advanced AI insights",
        "Team collaboration",
        "Priority support",
        "Custom workflows",
        "All integrations",
        "Advanced analytics"
      ],
      notIncluded: [
        "White-label options",
        "API access"
      ],
      highlighted: true,
      color: "#F77F00"
    },
    {
      name: "Enterprise",
      monthlyPrice: "Custom",
      annualPrice: "Custom",
      savingsText: "Contact for pricing",
      description: "Tailored solutions for large organizations",
      features: [
        "Unlimited job postings",
        "Unlimited resume scans",
        "White-label options",
        "Full API access",
        "Dedicated account manager",
        "Custom integrations",
        "SLA guarantees",
        "Advanced security features",
        "Custom training",
        "Priority feature requests"
      ],
      notIncluded: [],
      highlighted: false,
      color: "#004E89"
    }
];

const FAQS_DATA = [
  {
    question: "Can I change plans anytime?",
    answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, UPI, net banking, and can arrange invoicing for enterprise customers."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! All plans include a 14-day free trial with full access to features. No credit card required."
  },
  {
    question: "What happens if I exceed my resume scan limit?",
    answer: "You can purchase additional scans or upgrade to a higher tier. We'll notify you before you hit your limit."
  }
];

// Memoized plan card component
const PlanCard = React.memo(({ plan, billingCycle, isHighlighted }) => (
  <div
    className={`glass-panel p-8 rounded-2xl hover-lift transition-all relative ${
      isHighlighted ? 'ring-2 ring-[#FF6B35]' : ''
    }`}
  >
    {isHighlighted && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#FF6B35] text-white rounded-full text-sm font-semibold">
        Most Popular
      </div>
    )}
    <div className="text-center mb-6">
      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
      <div className="text-4xl font-bold mb-2" style={{ color: plan.color }}>
        {billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
        {plan.monthlyPrice !== 'Custom' && (
          <span className="text-lg text-gray-600 font-normal">/month</span>
        )}
      </div>
      {billingCycle === 'annual' && plan.monthlyPrice !== 'Custom' && (
        <p className="text-sm text-[#06A77D] font-medium">{plan.savingsText}</p>
      )}
      <p className="text-gray-600 text-sm mt-2">{plan.description}</p>
    </div>
    <ul className="space-y-3 mb-6">
      {plan.features.map((feature, idx) => (
        <li key={idx} className="flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-[#06A77D] flex-shrink-0 mt-0.5" />
          <span className="text-gray-600 text-sm">{feature}</span>
        </li>
      ))}
      {plan.notIncluded.map((feature, idx) => (
        <li key={`not-${idx}`} className="flex items-start space-x-3 opacity-50">
          <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
          <span className="text-gray-400 text-sm">{feature}</span>
        </li>
      ))}
    </ul>
    <Link
      href={plan.name === 'Enterprise' ? '/contact' : '/signup'}
      className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-all ${
        isHighlighted
          ? 'bg-[#FF6B35] text-white hover:bg-[#F77F00]'
          : 'glass-panel text-black hover:bg-gray-100'
      }`}
    >
      {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
    </Link>
  </div>
));
PlanCard.displayName = 'PlanCard';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const handleBillingChange = useCallback((cycle) => {
    setBillingCycle(cycle);
  }, []);

  const plans = useMemo(() => PLANS_DATA, []);
  const faqs = useMemo(() => FAQS_DATA, []);

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
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Simple, <span className="gradient-text">Transparent</span> Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Choose the plan that's right for your team. All plans include a 14-day free trial.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center space-x-4 glass-panel p-2 rounded-lg">
              <button
                onClick={() => handleBillingChange('monthly')}
                className={`px-6 py-2 rounded-lg transition-all font-semibold ${
                  billingCycle === 'monthly'
                    ? 'bg-[#FF6B35] text-white'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => handleBillingChange('annual')}
                className={`px-6 py-2 rounded-lg transition-all font-semibold ${
                  billingCycle === 'annual'
                    ? 'bg-[#FF6B35] text-white'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                Annual
                <span className="ml-2 text-xs text-[#06A77D]">Save 20%</span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <PlanCard 
                key={index} 
                plan={plan} 
                billingCycle={billingCycle}
                isHighlighted={plan.highlighted}
              />
            ))}
          </div>

          {/* FAQ Section */}
          <section className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="glass-panel p-6 rounded-2xl">
                  <div className="flex items-start space-x-4">
                    <HelpCircle className="w-6 h-6 text-[#FF6B35] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
