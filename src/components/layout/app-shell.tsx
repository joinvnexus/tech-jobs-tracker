import { ReactNode } from "react";
import { Session } from "next-auth";

import Header from "./header";
import { Footer } from "./footer";

interface AppShellProps {
  children: ReactNode;
  session: Session | null;
}

export default function AppShell({ children, session }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header session={session} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
