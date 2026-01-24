import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { getTranslations } from "next-intl/server"
import { getPosts } from "@/lib/blog"
import { Link } from "@/i18n/routing"
import { Calendar, User, ArrowRight } from "lucide-react"

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations("Blog")
  const blogPosts = getPosts()

  // Helper to get content by locale
  const getLocalizedContent = (contentObj: any) => {
    return contentObj[locale as keyof typeof contentObj] || contentObj['en']
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              {t("title")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article 
                key={post.slug}
                className="group relative flex flex-col p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 hover:bg-white/[0.07] transition-all duration-300"
              >
                <div className="flex-1 space-y-4">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={post.date}>{post.date}</time>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                  </div>

                  {/* Title & Excerpt */}
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {getLocalizedContent(post.title)}
                    </h2>
                    <p className="text-muted-foreground line-clamp-3">
                      {getLocalizedContent(post.excerpt)}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Link */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors font-medium">
                    {t("readMore")}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
