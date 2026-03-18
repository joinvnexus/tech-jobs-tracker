import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";

import "./globals.css";

import { auth } from "@/lib/auth";
import AppShell from "@/components/layout/app-shell";
import { AuthProvider } from "@/providers/auth-provider";

const bodyFont = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const headingFont = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "HireHub - Find Your Dream Job",
    template: "%s | HireHub",
  },
  description:
    "HireHub is a modern job marketplace connecting job seekers with top companies.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${bodyFont.variable} ${headingFont.variable} antialiased`}>
        <AuthProvider>
          <AppShell session={session}>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
