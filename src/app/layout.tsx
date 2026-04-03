import type { Metadata } from "next";
import "./globals.css";

import { auth } from "@/lib/auth";
import AppShell from "@/components/layout/app-shell";
import { AuthProvider } from "@/providers/auth-provider";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
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
    <html
      lang="en"
      className={`scroll-smooth dark ${inter.variable} ${poppins.variable}`}
    >
      <body className="antialiased bg-background text-foreground">
        <AuthProvider>
          <AppShell session={session}>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
