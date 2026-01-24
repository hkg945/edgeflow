import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { BlogPostForm } from "@/components/dashboard/blog/BlogPostForm"
import { getPostBySlug } from "@/lib/blog"
import { notFound } from "next/navigation"

export default async function EditBlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Edit Post</h1>
        </div>
        <BlogPostForm initialData={post} isEditing />
      </main>
      <Footer />
    </div>
  )
}
