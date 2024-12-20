import React from 'react';
import { Check } from 'lucide-react';

export function BillingSettings() {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-6">Billing & Plans</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="apple-card p-6 border-2 border-[#0071e3]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">Pro Plan</h3>
                <p className="text-2xl font-bold mt-2">$12<span className="text-sm font-normal text-[#6e6e73]">/month</span></p>
              </div>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-[#0071e3]/10 text-[#0071e3]">
                Current Plan
              </span>
            </div>
            <ul className="space-y-3 mb-6">
              {[
                'Unlimited meeting transcriptions',
                'AI-powered summaries',
                'Priority support',
                'All integrations'
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-[#0071e3]" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full apple-button">
              Manage Subscription
            </button>
          </div>

          <div className="apple-card p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Enterprise</h3>
              <p className="text-2xl font-bold mt-2">Custom</p>
            </div>
            <ul className="space-y-3 mb-6">
              {[
                'Custom integrations',
                'Dedicated support',
                'SLA guarantees',
                'Advanced security'
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-[#6e6e73]" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full border border-[#0071e3] text-[#0071e3] px-6 py-3 rounded-full
                             hover:bg-[#0071e3]/5 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}