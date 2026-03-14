import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { type NextAuthConfig } from "next-auth"
import { type Adapter } from "next-auth/adapters"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { type Role } from "@prisma/client"

import { prisma } from "@/lib/prisma"

type UserWithPassword = {
  id: string
  email: string
  name: string | null
  role: Role
  isActive: boolean
  passwordHash: string | null
}

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/auth/signin',
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials')
        }

        const normalizedEmail = (credentials.email as string).trim().toLowerCase()
        const user = (await prisma.user.findUnique({
          where: {
            email: normalizedEmail,
          },
        })) as UserWithPassword | null

        if (!user) {
          console.warn("[auth] User not found for email:", normalizedEmail)
          return null
        }

        if (!user.isActive) {
          console.warn("[auth] User inactive for email:", normalizedEmail)
          return null
        }

        if (!user.passwordHash) {
          console.warn("[auth] User missing passwordHash for email:", normalizedEmail)
          return null
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        )

        if (!isValid) {
          console.warn("[auth] Invalid password for email:", normalizedEmail)
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
  ],
  callbacks: {
    session({ session, token }) {
      if (session.user && token?.sub) {
        session.user.id = token.sub
      }
      if (session.user && token?.role) {
        session.user.role = token.role as string
      }
      return session
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      const isOnAuth = nextUrl.pathname.startsWith('/auth')

      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false
      } else if (isOnAuth) {
        if (isLoggedIn) {
          return Response.redirect(new URL('/dashboard', nextUrl))
        }
        return true
      }
      return true
    },
  },
}

export const { handlers, auth, signOut } = NextAuth(authConfig)

export default authConfig

