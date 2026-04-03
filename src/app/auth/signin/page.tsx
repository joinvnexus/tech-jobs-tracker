 'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const signInSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

type SignInForm = z.infer<typeof signInSchema>

export default function SignIn() {
  const form = useForm<SignInForm>({
    resolver: zodResolver(signInSchema)
  })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()
  const { data: session } = useSession()

  // Redirect based on user role after successful login
  useEffect(() => {
    if (session?.user?.role) {
      const role = session.user.role as string
      if (role === 'ADMIN') {
        router.push('/admin')
      } else if (role === 'EMPLOYER') {
        router.push('/employer')
      } else if (role === 'SEEKER') {
        router.push('/saved-jobs')
      }
      router.refresh()
    }
  }, [session, router])

  const onSubmit = async (data: SignInForm) => {
    setErrorMessage(null)
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })

    if (result?.error) {
      setErrorMessage('Invalid email or password. Please try again.')
      return
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <Card className="w-full max-w-md border-border/60 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground">Sign In to HireHub</CardTitle>
          <CardDescription className="text-muted-foreground">Welcome back! Please enter your credentials.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {errorMessage && (
              <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {errorMessage}
              </p>
            )}
            <div>
              <Input placeholder="Email" {...form.register('email')} />
              {form.formState.errors.email && <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>}
            </div>
            <div>
              <Input type="password" placeholder="Password" {...form.register('password')} />
              {form.formState.errors.password && <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p>Dont have an account? <Link href="/auth/register" className="text-primary hover:underline">Sign up</Link></p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
