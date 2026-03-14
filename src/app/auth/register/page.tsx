import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { registerAction } from "./register-action"

export default function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create HireHub Account</CardTitle>
          <CardDescription>
            Join thousands finding their dream jobs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={registerAction} className="space-y-4">
            <div className="space-y-1">
              <Input name="name" placeholder="Full Name" />
            </div>
            <div className="space-y-1">
              <Input name="email" placeholder="Email" type="email" />
            </div>
            <div className="space-y-1">
              <Input name="password" placeholder="Password" type="password" />
            </div>
            <div className="space-y-1">
              <select
                name="role"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                defaultValue="SEEKER"
                aria-label="Select your role"
              >
                <option value="SEEKER">Job seeker</option>
                <option value="EMPLOYER">Employer</option>
              </select>
            </div>
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <p>
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
