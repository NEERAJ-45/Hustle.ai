import { useState } from "react";

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(1);
  const steps = [
    {
      number: 1,
      title: "Create Profile",
      description: "Set up your professional profile with skills, experience, and career goals.",
    },
    {
      number: 2,
      title: "AI Job Matching",
      description: "Intelligent algorithm scans thousands of jobs to find your perfect matches.",
    },
    {
      number: 3,
      title: "Resume Optimization",
      description: "AI customizes your resume and generates tailored cover letters for each role.",
    },
    {
      number: 4,
      title: "One-Click Apply",
      description: "Apply to jobs instantly with a single click.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`bg-white rounded-lg shadow p-6 flex-1 cursor-pointer ${activeStep === step.number ? 'border-2 border-blue-500' : ''}`}
              onClick={() => setActiveStep(step.number)}
            >
              <div className="text-2xl font-bold mb-2">Step {step.number}</div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
