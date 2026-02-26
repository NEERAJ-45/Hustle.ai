import { useEffect, useState, useRef } from "react";

export default function Hero() {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-blue-50/20 to-white">
      {/* Responsive Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-blue-50/30 to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-t from-indigo-50/20 to-transparent" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[length:50px_50px] bg-[linear-gradient(to_right,#334e6805_1px,transparent_1px),linear-gradient(to_bottom,#334e6805_1px,transparent_1px)]" />
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center pt-16 md:pt-20 lg:pt-24 pb-12 md:pb-20 lg:pb-24">
          <div className="space-y-6 md:space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Hustle.ai</h1>
            <p className="text-lg text-gray-600 mb-6">AI-powered job search platform that automates matching, resume optimization, and applications.</p>
            <button className="bg-gradient-to-r from-[#ef4444] to-[#2563eb] text-white px-6 py-3 rounded-lg shadow-md">Get Started</button>
          </div>
        </div>
      </div>
    </section>
  );
}
