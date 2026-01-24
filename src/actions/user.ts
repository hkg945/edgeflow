'use server'

import { auth, clerkClient } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export async function updateTradingViewUsername(username: string) {
  const { userId } = await auth()
  
  if (!userId) {
    throw new Error("Unauthorized")
  }

  // Basic validation
  if (!username || username.trim().length === 0) {
    throw new Error("Username is required")
  }

  const client = await clerkClient()

  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      tradingViewUsername: username.trim()
    }
  })

  revalidatePath("/dashboard")
  
  return { success: true }
}
