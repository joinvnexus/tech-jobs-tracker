"use server"

import bcrypt from "bcryptjs"
import { z } from "zod"
import { redirect } from "next/navigation"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["SEEKER", "EMPLOYER"]),
})

type RegisterState = {
  error?: string
}

export async function registerAction(
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  try {
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
    }

    const data = registerSchema.parse(rawData)
    const normalizedEmail = data.email.trim().toLowerCase()
    const normalizedName = data.name.trim()

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    })

    if (existingUser) {
      return { error: "User with this email already exists" }
    }

    const passwordHash = await bcrypt.hash(data.password, 10)

    await prisma.user.create({
      data: {
        name: normalizedName,
        email: normalizedEmail,
        passwordHash,
        role: data.role,
      },
    })

    redirect("/auth/signin")
  } catch (err) {
    if (err instanceof z.ZodError) {
      const firstIssue = err.issues[0]?.message
      return { error: firstIssue || "Please fill out all fields correctly." }
    }
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return { error: "User with this email already exists" }
      }
    }
    console.error("[registerAction] Failed:", err)
    return { error: "Registration failed. Please try again." }
  }
}
