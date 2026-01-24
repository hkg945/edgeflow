'use client'

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function DeletePostButton({ slug }: { slug: string }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return

    setIsDeleting(true)
    try {
      const res = await fetch(`/api/blog/${slug}`, {
        method: 'DELETE',
      })
      
      if (!res.ok) throw new Error('Failed to delete')
      
      router.refresh()
    } catch (error) {
      console.error(error)
      alert('Failed to delete post')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="hover:bg-red-500/10 hover:text-red-500"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}
