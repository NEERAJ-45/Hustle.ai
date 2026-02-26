import { useState } from "react";

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonials = [
    {
      quote: "Hustle.ai completely transformed my job search. I went from sending 10 applications a week to 50+ with personalized resumes for each. Got 3 interviews in my first week!",
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "Google",
      image: "/professional-woman-diverse.png",
    },
    {
      quote: "The AI matching is incredible. Every job recommendation was relevant to my skills and career goals. I landed my dream role in just 3 weeks of using the platform.",
      name: "Michael Rodriguez",
      role: "Product Manager",
      company: "Meta",
      image: "/professional-man.jpg",
    },
    {
      quote: "As a career changer, I was overwhelmed by the job search process. Hustle.ai made it so much easier - the resume optimization alone was worth the subscription.",
      name: "Emily Taylor",
      role: "UX Designer",
      company: "Apple",
      image: "/professional-woman-2.png",
    },
    {
      quote: "The analytics dashboard helped me understand what was working and what wasn't. I optimized my approach and doubled my response rate in just two weeks.",
      name: "David Kim",
      role: "Data Scientist",
      company: "Amazon",
      image: "/professional-man-2.png",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Testimonials</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className={`bg-white rounded-lg shadow p-6 flex-1 ${activeIndex === idx ? 'border-2 border-blue-500' : ''}`} onClick={() => setActiveIndex(idx)}>
              <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mx-auto mb-4" />
              <blockquote className="italic text-gray-700 mb-2">"{testimonial.quote}"</blockquote>
              <div className="font-semibold text-gray-800">{testimonial.name}</div>
              <div className="text-gray-500 text-sm">{testimonial.role} @ {testimonial.company}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
