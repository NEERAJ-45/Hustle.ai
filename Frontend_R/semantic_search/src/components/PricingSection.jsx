import { useState } from "react";

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);
  const plans = [
    {
      name: "Free",
      monthlyPrice: 0,
      annualPrice: 0,
      description: "Perfect for getting started",
      features: [
        "5 job matches per month",
        "Basic resume builder",
        "Manual applications",
        "Email support",
        "Job alerts",
      ],
      cta: "Start Free",
      popular: false,
    },
    {
      name: "Pro",
      monthlyPrice: 29,
      annualPrice: 24,
      description: "For serious job seekers",
      features: [
        "50 job matches per month",
        "AI resume optimization",
        "One-click applications",
        "Priority support",
        "Analytics dashboard",
        "Custom cover letters",
        "Interview preparation",
      ],
      cta: "Start Pro",
      popular: true,
    },
    {
      name: "Enterprise",
      monthlyPrice: 99,
      annualPrice: 79,
      description: "For teams and organizations",
      features: [
        "Unlimited job matches",
        "Team analytics",
        "Dedicated support",
        "Custom integrations",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Pricing</h2>
        <div className="flex justify-center mb-8">
          <button
            className={`px-4 py-2 rounded-l-lg ${!isAnnual ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setIsAnnual(false)}
          >
            Monthly
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg ${isAnnual ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setIsAnnual(true)}
          >
            Annual
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div key={idx} className={`rounded-lg shadow p-6 ${plan.popular ? 'border-2 border-blue-500' : 'bg-gray-50'}`}>
              <h3 className="font-semibold text-lg mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold mb-2">${isAnnual ? plan.annualPrice : plan.monthlyPrice}<span className="text-base font-normal">/mo</span></div>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <ul className="mb-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-gray-700">• {feature}</li>
                ))}
              </ul>
              <button className="bg-gradient-to-r from-[#ef4444] to-[#2563eb] text-white px-6 py-2 rounded-lg shadow-md w-full">{plan.cta}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
