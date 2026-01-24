import { getPosts, savePost, BlogPost } from '@/lib/blog'
import { NextResponse } from 'next/server'

export async function GET() {
  const posts = getPosts()
  return NextResponse.json(posts)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // Basic validation
    if (!body.slug || !body.title) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    // Check if slug already exists
    const posts = getPosts()
    if (posts.some(p => p.slug === body.slug)) {
       return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
    }

    const newPost: BlogPost = {
      slug: body.slug,
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      seo: body.seo,
      date: body.date || new Date().toISOString().split('T')[0],
      author: body.author || 'Admin',
      tags: body.tags || []
    }

    savePost(newPost)
    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
