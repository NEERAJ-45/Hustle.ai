export default function FaqSection() {
  const faqs = [
    {
      question: "How does the AI job matching work?",
      answer: "Our AI analyzes your profile, skills, experience, and preferences to match you with relevant job opportunities. It uses natural language processing and machine learning to understand job descriptions and calculate compatibility scores between your profile and available positions.",
    },
    {
      question: "Is my data safe and private?",
      answer: "Absolutely. We use bank-level encryption to protect your data and are fully GDPR compliant. You have complete control over what information is shared with potential employers. We never sell your data to third parties, and you can delete your account and all associated data at any time.",
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes! You can cancel your subscription at any time with no penalties or hidden fees. Your access will continue until the end of your billing period, and you won't be charged again. No questions asked.",
    },
    {
      question: "How many applications can I send?",
      answer: "It depends on your plan. Free users get 5 job matches per month, Pro users get 50 applications per month, and Enterprise users have unlimited applications. Each application includes a customized resume and cover letter optimized for that specific job.",
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 14-day money-back guarantee for all paid plans. If you're not satisfied with Hustle.ai for any reason within the first 14 days, contact our support team for a full refund - no questions asked.",
    },
    {
      question: "What countries do you support?",
      answer: "Hustle.ai supports job searches in over 50 countries across North America, Europe, Asia, and Australia. We integrate with major job boards in each region and support multiple languages including English, Spanish, French, German, and Mandarin.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, idx) => (
            <div key={idx} className="mb-6">
              <div className="font-semibold text-lg mb-2">{faq.question}</div>
              <div className="text-gray-600">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
