
"use client"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sparkles, Twitter, Linkedin, Github, Mail } from 'lucide-react'
import { toast } from 'sonner'

export function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => resolve(true), 1500)
      }),
      {
        loading: 'Subscribing to newsletter...',
        success: 'Subscribed successfully! Check your email.',
        error: 'Failed to subscribe. Please try again.',
      }
    )
    
    form.reset()
  }

  const footerLinks = {
    Product: [
      { name: 'Features', href: '#features' },
      { name: 'How it works', href: '#how-it-works' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'API', href: '#' },
    ],
    Company: [
      { name: 'About', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
    ],
    Resources: [
      { name: 'Documentation', href: '#' },
      { name: 'Help Center', href: '#' },
      { name: 'Community', href: '#' },
      { name: 'Contact', href: '#' },
    ],
    Legal: [
      { name: 'Privacy', href: '#' },
      { name: 'Terms', href: '#' },
      { name: 'Security', href: '#' },
      { name: 'Cookies', href: '#' },
    ],
  }

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Mail, href: '#', label: 'Email' },
  ]

  return (
    <footer className="bg-navy-900 text-white">
      <div className="container py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-10 w-10 rounded-xl navy-gradient flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold">Hustle.ai</div>
                <div className="text-sm text-blue-200">AI Job Search Platform</div>
              </div>
            </div>
            <p className="text-blue-200 mb-6 max-w-md">
              Automate your job search with intelligent matching, personalized resumes, 
              and one-click applications.
            </p>
            
            {/* Newsletter */}
            <div className="mb-8">
              <h3 className="font-semibold mb-3">Stay updated</h3>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="bg-navy-800 border-navy-700 text-white placeholder:text-blue-300"
                  required
                />
                <Button type="submit" className="navy-gradient hover:opacity-90">
                  Subscribe
                </Button>
              </form>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  className="text-blue-300 hover:text-white hover:bg-navy-800"
                  asChild
                >
                  <Link href={social.href} aria-label={social.label}>
                    <social.icon className="h-5 w-5" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-blue-300 hover:text-white transition-colors"
                      onClick={(e) => {
                        if (link.href.startsWith('#')) {
                          e.preventDefault()
                          document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                        }
                      }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-800 mt-8 pt-8 text-center text-blue-300 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} Hustle.ai. All rights reserved.</p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}