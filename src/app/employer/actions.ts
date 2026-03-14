"use server"

import { z } from "zod"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const companySchema = z.object({
  name: z.string().min(2),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/),
  description: z.string().optional().or(z.literal("")),
  website: z.string().url().optional().or(z.literal("")),
  location: z.string().optional().or(z.literal("")),
})

export interface CompanyFormState {
  error?: string
}

export async function upsertCompanyAction(
  _prevState: CompanyFormState | undefined,
  formData: FormData,
): Promise<CompanyFormState> {
  const session = await auth()

  if (!session?.user || session.user.role !== "EMPLOYER") {
    return { error: "Unauthorized" }
  }

  const raw = {
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    website: formData.get("website"),
    location: formData.get("location"),
  }

  let data

  try {
    data = companySchema.parse(raw)
  } catch {
    return { error: "Please check the company fields and try again." }
  }

  await prisma.company.upsert({
    where: { userId: session.user.id },
    create: {
      userId: session.user.id,
      name: data.name,
      slug: data.slug,
      description: data.description || null,
      website: data.website || null,
      location: data.location || null,
    },
    update: {
      name: data.name,
      slug: data.slug,
      description: data.description || null,
      website: data.website || null,
      location: data.location || null,
    },
  })

  revalidatePath("/employer")
  revalidatePath("/employer/jobs")

  redirect("/employer")
}

