'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronDown, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FAQS } from '@/lib/constants'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const handleQuestionClick = (index: number, question: string) => {
    setOpenIndex(openIndex === index ? null : index)
    toast.info(`FAQ: ${question}`, {
      description: 'Need more help?',
      action: {
        label: 'Contact Support',
        onClick: () => window.open('mailto:support@hustle.ai', '_blank')
      },
    })
  }

  return (
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about Hustle.ai
            </p>
          </motion.div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4 mb-12">
            {FAQS.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className={cn(
                    "border-navy-100 hover:border-navy-300 transition-colors cursor-pointer",
                    openIndex === index && "border-navy-300 bg-navy-50/50"
                  )}
                  onClick={() => handleQuestionClick(index, faq.question)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-navy-900">{faq.question}</h3>
                      <ChevronDown className={cn(
                        "h-5 w-5 text-navy-500 transition-transform",
                        openIndex === index && "transform rotate-180"
                      )} />
                    </div>
                    {openIndex === index && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 text-navy-600"
                      >
                        {faq.answer}
                      </motion.p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-navy-50 to-blue-50 rounded-2xl p-8 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full navy-gradient mb-6">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-navy-900 mb-4">Still have questions?</h3>
            <p className="text-navy-600 mb-6 max-w-md mx-auto">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => toast.info('Opening email client...', {
                  action: {
                    label: 'Open Email',
                    onClick: () => window.open('mailto:support@hustle.ai', '_blank')
                  },
                })}
                className="navy-gradient text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                Contact Support
              </button>
              <button
                onClick={() => toast.info('Opening documentation...', {
                  action: {
                    label: 'View Docs',
                    onClick: () => window.open('/docs', '_blank')
                  },
                })}
                className="border border-navy-300 text-navy-700 px-6 py-3 rounded-lg hover:bg-navy-50 transition-colors font-medium"
              >
                View Documentation
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}