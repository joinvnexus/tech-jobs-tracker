import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import { Footer } from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar"

import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "HireHub – Find Your Dream Job",
    template: "%s | HireHub",
  },
  description: "HireHub is a modern job marketplace connecting job seekers with top companies in Bangladesh and beyond. Find your next opportunity or hire top talent.",
  keywords: ["jobs", "career", "employment", "hiring", "job search", "recruitment", "Bangladesh"],
  authors: [{ name: "HireHub" }],
  creator: "HireHub",
  publisher: "HireHub",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://hirehub.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hirehub.com",
    title: "HireHub – Find Your Dream Job",
    description: "HireHub is a modern job marketplace connecting job seekers with top companies in Bangladesh and beyond.",
    siteName: "HireHub",
  },
  twitter: {
    card: "summary_large_image",
    title: "HireHub – Find Your Dream Job",
    description: "HireHub is a modern job marketplace connecting job seekers with top companies.",
  },
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
