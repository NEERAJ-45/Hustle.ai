import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Hustle.ai - AI Job Search Platform',
  description: 'Automate your job search with AI-powered matching and one-click applications.',
  keywords: ['job search', 'AI', 'career', 'automation', 'resume', 'hiring'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hustle.ai',
    title: 'Hustle.ai - AI Job Search Platform',
    description: 'Automate your job search with AI-powered matching and one-click applications.',
    siteName: 'Hustle.ai',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Hustle.ai - AI Job Search Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hustle.ai - AI Job Search Platform',
    description: 'Automate your job search with AI-powered matching and one-click applications.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1e3a8a" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              classNames: {
                toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
                description: 'group-[.toast]:text-muted-foreground',
                actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
                cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
              },
            }}
            richColors
            closeButton
            expand
            duration={4000}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}