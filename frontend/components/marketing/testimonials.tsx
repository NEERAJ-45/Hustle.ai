'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star, Quote } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/constants'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { useState } from 'react'

export function TestimonialsSection() {
  const [selectedTestimonial, setSelectedTestimonial] = useState(0)

  const handleTestimonialClick = (index: number) => {
    setSelectedTestimonial(index)
    const testimonial = TESTIMONIALS[index]
    toast.success(`Success story from ${testimonial.name}`, {
      description: testimonial.content,
      action: {
        label: 'Read More',
        onClick: () => window.open('/success-stories', '_blank')
      },
    })
  }

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Loved by <span className="text-gradient">Job Seekers</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our users say about their experience
            </p>
          </motion.div>
        </div>
        
        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className={`card-hover border-navy-100 ${testimonial.gradient} cursor-pointer h-full ${
                  selectedTestimonial === index ? 'ring-2 ring-navy-300' : ''
                }`}
                onClick={() => handleTestimonialClick(index)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Avatar>
                      <AvatarFallback className="bg-navy-100 text-navy-700 font-semibold">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <Quote className="h-8 w-8 text-navy-300" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-navy-900 mb-2">{testimonial.name}</CardTitle>
                  <CardDescription className="text-navy-700 mb-4">{testimonial.role}</CardDescription>
                  <p className="text-navy-600 italic line-clamp-4">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-navy-50 to-blue-50 rounded-2xl p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '98%', label: 'Satisfaction Rate' },
              { value: '2.1x', label: 'Faster Hiring' },
              { value: '40%', label: 'Higher Salary' },
              { value: '3.5x', label: 'More Interviews' },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-navy-900 mb-1">{stat.value}</div>
                <div className="text-navy-700 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}