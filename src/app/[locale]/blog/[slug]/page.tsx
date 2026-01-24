import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { getTranslations } from "next-intl/server"
import { blogPosts } from "@/data/blog-posts"
import { notFound } from "next/navigation"
import { Calendar, User, ArrowLeft, Tag } from "lucide-react"
import { Link } from "@/i18n/routing"
import { Button } from "@/components/ui/button"

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await params
  const t = await getTranslations("Blog")
  
  const post = blogPosts.find(p => p.slug === slug)
  
  if (!post) {
    notFound()
  }

  const getLocalizedContent = (contentObj: any) => {
    return contentObj[locale as keyof typeof contentObj] || contentObj['en']
  }

  const content = getLocalizedContent(post.content)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <article className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <Link href="/blog">
            <Button variant="ghost" className="mb-8 hover:bg-white/5 text-muted-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          {/* Header */}
          <header className="mb-12 space-y-6 border-b border-white/10 pb-12">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>{post.date}</time>
              </span>
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <User className="w-4 h-4" />
                {post.author}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white leading-tight">
              {getLocalizedContent(post.title)}
            </h1>

            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            {/* Simple rendering for now - in a real app use react-markdown or similar */}
            <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
              {content}
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
