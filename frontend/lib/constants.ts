export const NAVIGATION = {
  main: [
    { name: 'Features', href: '#features' },
    { name: 'How it works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
  ],
  auth: [
    { name: 'Sign in', href: '/login' },
    { name: 'Get Started', href: '/register' },
  ],
} as const

export const FEATURES = [
  {
    title: 'AI-Powered Matching',
    description: 'Intelligent algorithm that analyzes your skills and preferences to find perfect job matches with 95% accuracy.',
    gradient: 'from-navy-600 to-blue-600',
    icon: 'Brain', // Add this
  },
  {
    title: 'Smart Resume Builder',
    description: 'Generate tailored resumes and cover letters optimized for each application in seconds.',
    gradient: 'from-blue-600 to-cyan-500',
    icon: 'FileText', // Add this
  },
  {
    title: 'One-Click Applications',
    description: 'Apply to multiple jobs simultaneously with pre-filled forms and automated submissions.',
    gradient: 'from-navy-700 to-blue-500',
    icon: 'Zap', // Add this
  },
  {
    title: 'Precision Targeting',
    description: 'Set your preferences and let AI target the right companies and roles for you.',
    gradient: 'from-blue-500 to-cyan-400',
    icon: 'Target', // Add this
  },
  {
    title: 'Privacy First',
    description: 'Your data is encrypted and never shared with employers without your permission.',
    gradient: 'from-navy-800 to-blue-600',
    icon: 'Shield', // Add this
  },
  {
    title: 'Analytics Dashboard',
    description: 'Track application success rates, interview conversions, and optimize your strategy.',
    gradient: 'from-blue-600 to-navy-600',
    icon: 'BarChart', // Add this
  },
] as const

export const METRICS = [
  {
    value: '85%',
    label: 'Time Saved',
    description: 'Average time reduction in job search',
    gradient: 'from-navy-600 to-blue-600',
    icon: 'Clock',
  },
  {
    value: '3x',
    label: 'More Interviews',
    description: 'Higher interview conversion rate',
    gradient: 'from-blue-600 to-cyan-500',
    icon: 'TrendingUp',
  },
  {
    value: '95%',
    label: 'Match Accuracy',
    description: 'Precision in job recommendations',
    gradient: 'from-navy-700 to-blue-500',
    icon: 'Target',
  },
  {
    value: '10K+',
    label: 'Users Hired',
    description: 'Successfully placed in dream jobs',
    gradient: 'from-blue-500 to-navy-600',
    icon: 'Users',
  },
] as const

export const TESTIMONIALS = [
  {
    name: 'Alex Johnson',
    role: 'Senior Developer @ Google',
    content: 'Hustle.ai cut my job search time from 3 months to 2 weeks.',
    avatar: 'AJ',
    rating: 5,
    gradient: 'bg-gradient-to-br from-navy-50 to-blue-50',
  },
  {
    name: 'Sarah Chen',
    role: 'Product Manager',
    content: 'The automated resume tailoring saved me 20+ hours per week.',
    avatar: 'SC',
    rating: 5,
    gradient: 'bg-gradient-to-br from-blue-50 to-navy-50',
  },
  {
    name: 'Marcus Rivera',
    role: 'DevOps Engineer',
    content: 'From 5% response rate to 40% with Hustle.ai.',
    avatar: 'MR',
    rating: 5,
    gradient: 'bg-gradient-to-br from-navy-50 to-blue-50',
  },
] as const

export const PRICING_PLANS = [
  {
    name: 'Starter',
    price: '$29',
    period: '/month',
    description: 'Perfect for getting started',
    features: [
      '50 job matches per month',
      'Basic resume builder',
      'Email support',
      '5 one-click applications/week',
      'Basic analytics',
    ],
    cta: 'Get Started',
    popular: false,
    gradient: 'from-navy-50 to-blue-50',
  },
  {
    name: 'Professional',
    price: '$79',
    period: '/month',
    description: 'For serious job seekers',
    features: [
      'Unlimited job matches',
      'Advanced AI resume builder',
      'Priority support',
      'Unlimited one-click applications',
      'Interview scheduling',
    ],
    cta: 'Start Free Trial',
    popular: true,
    gradient: 'from-navy-600 to-blue-600',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For teams and organizations',
    features: [
      'Everything in Professional',
      'Team management',
      'Custom AI models',
      'API access',
      'Dedicated account manager',
    ],
    cta: 'Contact Sales',
    popular: false,
    gradient: 'from-navy-50 to-blue-50',
  },
] as const

export const FAQS = [
  {
    question: 'How does the AI job matching work?',
    answer: 'Our AI analyzes your skills, experience, and preferences to match you with jobs that fit your profile.',
  },
  {
    question: 'Is my data safe and private?',
    answer: 'Yes. We use bank-level encryption and never share your data without your permission.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Absolutely. You can cancel your subscription anytime. No hidden fees.',
  },
  {
    question: 'How many jobs can I apply to?',
    answer: 'Professional plan: unlimited. Starter plan: 5 applications per week.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer a 30-day money-back guarantee.',
  },
] as const