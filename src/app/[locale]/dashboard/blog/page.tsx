import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { getTranslations } from "next-intl/server"
import { getPosts } from "@/lib/blog"
import { Link } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, FileText } from "lucide-react"
import { DeletePostButton } from "@/components/dashboard/blog/DeletePostButton"

export default async function BlogDashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations("Dashboard") // You might want to add BlogDashboard keys
  const posts = getPosts()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Blog Management</h1>
            <p className="text-muted-foreground">Manage your blog posts and articles</p>
          </div>
          <Link href="/dashboard/blog/new">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </Link>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          {posts.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No posts found. Create your first blog post!</p>
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {posts.map((post) => (
                <div key={post.slug} className="p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                  <div className="flex-1 min-w-0 mr-6">
                    <h3 className="text-lg font-medium text-white mb-1 truncate">
                      {post.title[locale as keyof typeof post.title] || post.title['en']}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.author}</span>
                      <span>•</span>
                      <span className="truncate">/{post.slug}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/dashboard/blog/edit/${post.slug}`}>
                      <Button variant="ghost" size="icon" className="hover:bg-white/10">
                        <Pencil className="w-4 h-4 text-blue-400" />
                      </Button>
                    </Link>
                    <DeletePostButton slug={post.slug} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
