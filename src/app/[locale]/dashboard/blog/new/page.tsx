import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { BlogPostForm } from "@/components/dashboard/blog/BlogPostForm"

export default function NewBlogPostPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create New Post</h1>
        </div>
        <BlogPostForm />
      </main>
      <Footer />
    </div>
  )
}
