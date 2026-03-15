import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { auth } from "@/lib/auth";

import { Footer } from "@/components/layout/footer";
import { NavbarClient } from "@/components/layout/navbar";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HireHub - Job Marketplace",
      },
    ],
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
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${plusJakarta.variable} font-sans bg-background text-foreground antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <NavbarClient session={session} />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
