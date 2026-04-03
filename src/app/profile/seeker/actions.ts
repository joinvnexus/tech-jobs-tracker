"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function getSeekerProfileData() {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      profile: true,
    },
  })

  if (!user) throw new Error("User not found")

  return { user, profile: user.profile }
}

const profileSchema = z.object({
  name: z.string().min(2),
  title: z.string().min(2).optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  bio: z.string().optional().or(z.literal("")),
  skills: z.string().optional().or(z.literal("")),
  experience: z.string().optional().or(z.literal("")),
  education: z.string().optional().or(z.literal("")),
})

export interface ProfileFormState {
  error?: string
}

export async function updateProfileAction(
  _prevState: ProfileFormState | undefined,
  formData: FormData,
): Promise<ProfileFormState> {
  const session = await auth()

  if (!session?.user) {
    return { error: "You must be signed in to update your profile." }
  }

  const raw = {
    name: formData.get("name"),
    title: formData.get("title"),
    phone: formData.get("phone"),
    bio: formData.get("bio"),
    skills: formData.get("skills"),
    experience: formData.get("experience"),
    education: formData.get("education"),
  }

  let data

  try {
    data = profileSchema.parse(raw)
  } catch (_error) {
    return { error: "Please check the form fields and try again." }
  }

  const skillsArray =
    data.skills
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) ?? []

  const experienceArray =
    data.experience
      ?.split("\n")
      .map((e) => e.trim())
      .filter(Boolean) ?? []

  const educationArray =
    data.education
      ?.split("\n")
      .map((e) => e.trim())
      .filter(Boolean) ?? []

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name: data.name,
      profile: {
        upsert: {
          create: {
            title: data.title || null,
            phone: data.phone || null,
            bio: data.bio || null,
            skills: JSON.stringify(skillsArray),
            experience: JSON.stringify(experienceArray),
            education: JSON.stringify(educationArray),
          },
          update: {
            title: data.title || null,
            phone: data.phone || null,
            bio: data.bio || null,
            skills: JSON.stringify(skillsArray),
            experience: JSON.stringify(experienceArray),
            education: JSON.stringify(educationArray),
          },
        },
      },
    },
  })

  revalidatePath("/profile/seeker")

  return {}
}

