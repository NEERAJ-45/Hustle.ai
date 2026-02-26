"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronRight, User } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How it Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQs", href: "#faq" },
  ]

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/95 backdrop-blur-xl shadow-lg" 
          : "bg-white/90 backdrop-blur-lg"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile Menu Button (Left side on mobile) */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-700 hover:text-[#ef4444] rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>

          {/* Logo - Different scaling for mobile and desktop */}
          <div className="md:hidden">
            <a 
              href="/" 
              className="flex items-center group cursor-pointer"
              aria-label="Hustle.ai Home"
            >
              {/* Mobile: Smaller container, larger scale */}
              <div className="relative w-16 h-16 flex items-center justify-center">
                <img
                  src="/hustleaitrns.png"
                  alt="Hustle.ai Logo"
                  className="object-contain w-full h-full scale-150" // 1.5x for mobile
                  width={64}
                  height={64}
                />
              </div>
            </a>
          </div>

          {/* Desktop Logo */}
          <div className="hidden md:block">
            <a 
              href="/" 
              className="flex items-center group cursor-pointer"
              aria-label="Hustle.ai Home"
            >
              {/* Desktop: Larger container, scale-300 */}
              <div className="relative w-24 h-24 flex items-center justify-center">
                <img
                  src="/hustleaitrns.png"
                  alt="Hustle.ai Logo"
                  className="object-contain w-full h-full scale-200" // 3x for desktop
                  width={96}
                  height={96}
                />
              </div>
            </a>
          </div>

          {/* Desktop Navigation (Center) */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 flex-1 justify-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 rounded-lg hover:bg-gray-50"
              >
                {link.name}
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#ef4444] to-[#2563eb] hover:w-3/4 transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-sm text-gray-700 hover:text-[#ef4444] hover:bg-gray-100 rounded-lg px-3 lg:px-4"
            >
              <User className="w-4 h-4 mr-2" />
              <span className="hidden lg:inline">Sign In</span>
              <span className="lg:hidden">Login</span>
            </Button>
            <Button 
              className="bg-gradient-to-r from-[#ef4444] to-[#2563eb] hover:from-[#dc2626] hover:to-[#1d4ed8] text-white rounded-lg px-4 lg:px-6 py-2 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <span className="flex items-center gap-1 lg:gap-2 text-sm lg:text-base">
                Get Started
                <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4" />
              </span>
            </Button>
          </div>

          {/* Placeholder for mobile layout balance */}
          <div className="md:hidden w-16 h-16" />
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="py-4 space-y-1 bg-white border-t border-gray-200 rounded-b-lg shadow-lg">
              {/* Mobile Navigation Links */}
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="flex items-center justify-between px-4 py-3 text-gray-700 hover:text-[#ef4444] hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="font-medium">{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </a>
                ))}
              </div>
              
              {/* Mobile CTA Buttons */}
              <div className="pt-4 px-4 space-y-3 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  className="w-full gap-2 border-gray-300 hover:border-[#ef4444] hover:text-[#ef4444] rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  Sign In
                </Button>
                <Button 
                  className="w-full bg-gradient-to-r from-[#ef4444] to-[#2563eb] text-white rounded-lg shadow-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="flex items-center gap-2">
                    Get Started
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}