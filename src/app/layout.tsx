import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";

import { auth } from "@/lib/auth";
import NavbarClient from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AuthProvider } from "@/providers/auth-provider";

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
      <body
        className={`${inter.variable} ${plusJakarta.variable} bg-background text-foreground antialiased`}
      >
        <AuthProvider>
          <div className="flex min-h-screen flex-col">

            {/* Navbar */}
            <NavbarClient session={session} />

            {/* Page Content */}
            <main className="flex-1">
              {children}
            </main>

            {/* Footer */}
            <Footer />

          </div>
        </AuthProvider>
      </body>
    </html>
  );
}