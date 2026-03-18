import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user?.role) {
    redirect("/auth/signin")
  }

  const rolePath = session.user.role.toLowerCase()

  // Role-specific redirects
  switch (session.user.role) {
    case "SEEKER":
      redirect("/profile/seeker")
    case "EMPLOYER":
      redirect("/profile/employer")
    case "ADMIN":
      redirect("/profile/admin")
    default:
      redirect("/")
  }
}

