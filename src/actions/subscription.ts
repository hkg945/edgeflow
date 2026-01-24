'use server'

import { auth, clerkClient } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export async function subscribeToPlan(planId: string) {
  const { userId } = await auth()
  
  if (!userId) {
    throw new Error("Unauthorized")
  }

  const client = await clerkClient()

  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      plan: planId,
      subscriptionStatus: 'active',
      subscriptionDate: new Date().toISOString()
    }
  })

  revalidatePath("/")
  revalidatePath("/dashboard")
  
  return { success: true }
}
