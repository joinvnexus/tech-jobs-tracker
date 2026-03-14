 'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

const signInSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

type SignInForm = z.infer<typeof signInSchema>

export default function SignIn() {
  const form = useForm<SignInForm>({
    resolver: zodResolver(signInSchema)
  })

  const onSubmit = async (data: SignInForm) => {
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })

    if (result?.error) {
      // toast error
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign In to HireHub</CardTitle>
          <CardDescription>Welcome back! Please enter your credentials.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <p>Don't have an account? <Link href="/auth/register" className="text-primary hover:underline">Sign up</Link></p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
