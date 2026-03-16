"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User, LayoutDashboard, Home, Settings, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserContext } from "@/context/user-context";

export function Navbar() {
  const [isShrunk, setIsShrunk] = useState(false);
  const { isAuthenticated } = useUserContext();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsShrunk(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine current icon based on path
  const getCurrentIcon = () => {
    if (pathname === "/") return <Home className="w-6 h-6" />;
    if (pathname === "/dashboard") return <LayoutDashboard className="w-6 h-6" />;
    if (pathname === "/settings") return <Settings className="w-6 h-6" />;
    return <Bell className="w-6 h-6" />; // Default
  };

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How it Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQs", href: "#faq" },
  ];

  return (
    <motion.nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center",
        isShrunk ? "h-12" : "h-20"
      )}
      animate={{
        height: isShrunk ? 48 : 80,
        borderRadius: isShrunk ? 24 : 0,
        margin: isShrunk ? "0 20px" : "0",
        width: isShrunk ? "calc(100% - 40px)" : "100%",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex items-center justify-between w-full px-4">
        {/* Current Icon */}
        <motion.div
          className="flex items-center justify-center"
          animate={{ scale: isShrunk ? 0.8 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {getCurrentIcon()}
        </motion.div>

        {/* Navigation Links (hidden on shrink) */}
        {!isShrunk && (
          <div className="flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white hover:text-gray-300 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-white hover:text-red-500"
          >
            <Link href={isAuthenticated ? "/dashboard" : "/login"}>
              {isAuthenticated ? <LayoutDashboard className="w-4 h-4" /> : <User className="w-4 h-4" />}
            </Link>
          </Button>
          {!isAuthenticated && (
            <Button
              asChild
              className="bg-linear-to-r from-red-500 to-blue-500 text-white"
            >
              <Link href="/signup">Get Started</Link>
            </Button>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
