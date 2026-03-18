import { Session } from "next-auth";

import HeaderClient from "./header-client";

interface HeaderProps {
  session: Session | null;
}

export default function Header({ session }: HeaderProps) {
  return <HeaderClient session={session} />;
}
