"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      quote:
        "Hustle.ai completely transformed my job search. I went from sending 10 applications a week to 50+ with personalized resumes for each. Got 3 interviews in my first week!",
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "Google",
      image: "/professional-woman-diverse.png",
    },
    {
      quote:
        "The AI matching is incredible. Every job recommendation was relevant to my skills and career goals. I landed my dream role in just 3 weeks of using the platform.",
      name: "Michael Rodriguez",
      role: "Product Manager",
      company: "Meta",
      image: "/professional-man.jpg",
    },
    {
      quote:
        "As a career changer, I was overwhelmed by the job search process. Hustle.ai made it so much easier - the resume optimization alone was worth the subscription.",
      name: "Emily Taylor",
      role: "UX Designer",
      company: "Apple",
      image: "/professional-woman-2.png",
    },
    {
      quote:
        "The analytics dashboard helped me understand what was working and what wasn't. I optimized my approach and doubled my response rate in just two weeks.",
      name: "David Kim",
      role: "Data Scientist",
      company: "Amazon",
      image: "/professional-man-2.png",
    },
  ]

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Trusted by Job Seekers Worldwide</h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            See how Hustle.ai has transformed job searches for thousands of professionals
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { label: "4.9/5 Average Rating", value: "4.9/5" },
              { label: "2.5k+ Active Users", value: "2.5k+" },
              { label: "94% Match Rate", value: "94%" },
              { label: "47 Avg. Days to Offer", value: "47" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white border border-gray-200 rounded-xl shadow-xl">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col items-center text-center space-y-6">
                {/* Star Rating */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#2563eb] text-[#2563eb]" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl text-gray-900 leading-relaxed">
                  "{testimonials[activeIndex].quote}"
                </blockquote>

                {/* Author */}
                <div className="flex flex-col items-center gap-4 pt-4">
                  <img
                    src={testimonials[activeIndex].image || "/placeholder.svg"}
                    alt={testimonials[activeIndex].name}
                    className="w-16 h-16 rounded-full border-2 border-gray-200"
                  />
                  <div>
                    <p className="font-bold text-gray-900">{testimonials[activeIndex].name}</p>
                    <p className="text-gray-600">
                      {testimonials[activeIndex].role} @ {testimonials[activeIndex].company}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  className="rounded-full border-gray-300 bg-transparent"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === activeIndex ? "bg-[#2563eb] w-8" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  className="rounded-full border-gray-300 bg-transparent"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
