export default function FeaturesSection() {
  const features = [
    {
      title: "AI Job Matching",
      description: "Advanced algorithms analyze your profile and match you with the perfect opportunities based on skills, experience, and preferences.",
    },
    {
      title: "Smart Resume Builder",
      description: "AI-powered resume optimization that adapts to each job application, ensuring maximum ATS compatibility and recruiter appeal.",
    },
    {
      title: "One-Click Apply",
      description: "Apply to hundreds of jobs with a single click. Our automation handles forms, uploads, and submissions across all major job boards.",
    },
    {
      title: "Analytics Dashboard",
      description: "Track your job search progress with detailed analytics, response rates, and actionable insights to improve your success rate.",
    },
    {
      title: "Privacy First",
      description: "Your data is encrypted and secure. Full control over what information is shared and with whom. GDPR compliant and transparent.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg shadow p-6">
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
