import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import FloatingPixels from "@/components/FloatingPixels"
import type { Viewport } from "next"



const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://cleversondavi.com.br"),
  title: "My | Portfolio 💻",
  description: "My Portfolio - Full Stack Developer",
  keywords: ["portfolio", "full stack developer", "web development", "freelancer"],
  authors: [{ name: "Cleverson Davi Alves Chaves Vita", url: "https://cleversondavi.com.br" }],
  creator: "Cleverson Davi Alves Chaves Vita",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "My | Portfolio 💻",
    description: "My Portfolio - Full Stack Developer",
    url: "https://cleversondavi.com.br",
    siteName: "Cleverson Davi Portfolio",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My | Portfolio 💻",
    description: "My Portfolio - Full Stack Developer",
    creator: "@cleversondavi",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "https://cleversondavi.com.br",
    languages: {
      "en-US": "https://cleversondavi.com.br",
      "pt-BR": "https://cleversondavi.com.br",
    },
  },
}

export const viewport: Viewport = {
  themeColor: "#10b981",
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.lineicons.com/4.0/lineicons.css"
        />
      </head>
      <body className={inter.className}>
        <FloatingPixels />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
