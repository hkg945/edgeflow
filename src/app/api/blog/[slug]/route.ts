import { getPostBySlug, savePost, deletePost, BlogPost } from '@/lib/blog'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }
  return NextResponse.json(post)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  try {
    const body = await request.json()
    const existingPost = getPostBySlug(slug)
    
    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // Allow updating slug if needed, but for simplicity let's keep slug stable or handle rename carefully.
    // Here we assume slug in URL is the target to update. If body has different slug, it effectively renames it if we use body.slug for save.
    // But savePost implementation updates based on existing slug match OR adds new. 
    // Our savePost logic: `existingIndex = posts.findIndex((p) => p.slug === post.slug)`
    // So if we change slug in body, savePost will treat it as NEW post if the new slug doesn't exist.
    // To support rename, we'd need a different logic in lib/blog.ts or here.
    // For now, let's disallow slug change via PUT to keep it simple, or ensure body.slug matches params.slug.
    
    if (body.slug && body.slug !== slug) {
       // If user wants to change slug, they should probably delete and recreate, or we implement rename logic.
       // Let's keep it simple: Update content for the SAME slug.
       return NextResponse.json({ error: 'Changing slug is not supported via PUT' }, { status: 400 })
    }

    const updatedPost: BlogPost = {
      ...existingPost,
      ...body,
      slug: slug // Ensure slug remains consistent
    }

    savePost(updatedPost)
    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }
  
  deletePost(slug)
  return NextResponse.json({ success: true })
}
