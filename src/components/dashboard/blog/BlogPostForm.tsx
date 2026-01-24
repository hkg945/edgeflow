'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Save, ArrowLeft } from "lucide-react"
import { BlogPost } from "@/lib/blog"
import Link from "next/link"

interface BlogPostFormProps {
  initialData?: BlogPost
  isEditing?: boolean
}

export function BlogPostForm({ initialData, isEditing = false }: BlogPostFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<BlogPost>(initialData || {
    slug: '',
    title: { en: '', 'zh-TW': '', 'zh-CN': '' },
    excerpt: { en: '', 'zh-TW': '', 'zh-CN': '' },
    content: { en: '', 'zh-TW': '', 'zh-CN': '' },
    date: new Date().toISOString().split('T')[0],
    author: 'Admin',
    tags: []
  })
  
  const [tagsInput, setTagsInput] = useState(initialData?.tags.join(', ') || '')

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleLocalizedChange = (field: 'title' | 'excerpt' | 'content', lang: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [lang]: value
      }
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const dataToSubmit = {
        ...formData,
        tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean)
      }

      const url = isEditing ? `/api/blog/${formData.slug}` : '/api/blog'
      const method = isEditing ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSubmit)
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Something went wrong')
      }

      router.push('/dashboard/blog')
      router.refresh()
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/dashboard/blog">
          <Button variant="ghost" type="button">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
          {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          <Save className="w-4 h-4 mr-2" />
          {isEditing ? 'Update Post' : 'Create Post'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="en" className="w-full">
            <TabsList className="w-full justify-start bg-white/5 border border-white/10">
              <TabsTrigger value="en">English</TabsTrigger>
              <TabsTrigger value="zh-TW">繁體中文</TabsTrigger>
              <TabsTrigger value="zh-CN">简体中文</TabsTrigger>
            </TabsList>

            {['en', 'zh-TW', 'zh-CN'].map((lang) => (
              <TabsContent key={lang} value={lang} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Title ({lang})</Label>
                  <Input 
                    value={formData.title[lang as keyof typeof formData.title]} 
                    onChange={(e) => handleLocalizedChange('title', lang, e.target.value)}
                    className="bg-white/5 border-white/10"
                    placeholder="Enter post title"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Excerpt ({lang})</Label>
                  <Textarea 
                    value={formData.excerpt[lang as keyof typeof formData.excerpt]} 
                    onChange={(e) => handleLocalizedChange('excerpt', lang, e.target.value)}
                    className="bg-white/5 border-white/10 h-24"
                    placeholder="Short description for list view"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Content ({lang}) - Markdown Supported</Label>
                  <Textarea 
                    value={formData.content[lang as keyof typeof formData.content]} 
                    onChange={(e) => handleLocalizedChange('content', lang, e.target.value)}
                    className="bg-white/5 border-white/10 min-h-[400px] font-mono text-sm"
                    placeholder="# Your content here..."
                  />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <Card className="bg-white/5 border-white/10 text-white">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input 
                  value={formData.slug} 
                  onChange={(e) => handleChange('slug', e.target.value)}
                  disabled={isEditing}
                  className="bg-white/5 border-white/10"
                  placeholder="my-awesome-post"
                />
                <p className="text-xs text-muted-foreground">URL friendly identifier. Cannot be changed later.</p>
              </div>

              <div className="space-y-2">
                <Label>Date</Label>
                <Input 
                  type="date"
                  value={formData.date} 
                  onChange={(e) => handleChange('date', e.target.value)}
                  className="bg-white/5 border-white/10"
                />
              </div>

              <div className="space-y-2">
                <Label>Author</Label>
                <Input 
                  value={formData.author} 
                  onChange={(e) => handleChange('author', e.target.value)}
                  className="bg-white/5 border-white/10"
                />
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <Input 
                  value={tagsInput} 
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="bg-white/5 border-white/10"
                  placeholder="Trading, Strategy, News"
                />
                <p className="text-xs text-muted-foreground">Comma separated values</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  )
}
