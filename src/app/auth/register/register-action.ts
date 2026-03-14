"use server"

import bcrypt from "bcryptjs"
import { z } from "zod"
import { redirect } from "next/navigation"

import { prisma } from "@/lib/prisma"

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["SEEKER", "EMPLOYER"]),
})

export async function registerAction(formData: FormData): Promise<void> {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  }

  const data = registerSchema.parse(rawData)

  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  })

  if (existingUser) {
    throw new Error("User with this email already exists")
  }

  const passwordHash = await bcrypt.hash(data.password, 10)

  await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      passwordHash,
      role: data.role,
    },
  })

  redirect("/auth/signin")
}

