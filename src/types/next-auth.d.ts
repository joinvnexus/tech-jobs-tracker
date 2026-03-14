import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: 'SEEKER' | 'EMPLOYER' | 'ADMIN'
    } & DefaultSession['user']
  }

  interface User {
    role: 'SEEKER' | 'EMPLOYER' | 'ADMIN'
  }
}

interface JWT {
  role?: 'SEEKER' | 'EMPLOYER' | 'ADMIN'
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: 'SEEKER' | 'EMPLOYER' | 'ADMIN'
  }
}
