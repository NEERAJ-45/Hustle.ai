import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Brain, FileText, Zap, BarChart3, Shield, Globe } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "AI Job Matching",
      description:
        "Advanced algorithms analyze your profile and match you with the perfect opportunities based on skills, experience, and preferences.",
      gradient: "from-[#334e68] to-[#2563eb]",
    },
    {
      icon: FileText,
      title: "Smart Resume Builder",
      description:
        "AI-powered resume optimization that adapts to each job application, ensuring maximum ATS compatibility and recruiter appeal.",
      gradient: "from-[#2563eb] to-[#3b82f6]",
    },
    {
      icon: Zap,
      title: "One-Click Apply",
      description:
        "Apply to hundreds of jobs with a single click. Our automation handles forms, uploads, and submissions across all major job boards.",
      gradient: "from-green-600 to-emerald-600",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description:
        "Track your job search progress with detailed analytics, response rates, and actionable insights to improve your success rate.",
      gradient: "from-amber-600 to-orange-600",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description:
        "Your data is encrypted and secure. Full control over what information is shared and with whom. GDPR compliant and transparent.",
      gradient: "from-[#334e68] to-[#1e40af]",
    },
    {
      icon: Globe,
      title: "Global Job Market",
      description:
        "Access opportunities from around the world. Support for multiple languages, currencies, and region-specific job boards.",
      gradient: "from-[#2563eb] to-cyan-600",
    },
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Everything You Need to Succeed</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Powerful features designed to optimize every aspect of your job search journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              <CardHeader className="space-y-4">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
