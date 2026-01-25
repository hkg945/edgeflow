import postsData from '@/data/posts.json'

export interface BlogPost {
  slug: string
  title: {
    en: string
    'zh-TW': string
    'zh-CN': string
  }
  excerpt: {
    en: string
    'zh-TW': string
    'zh-CN': string
  }
  content: {
    en: string
    'zh-TW': string
    'zh-CN': string
  }
  seo?: {
    title: {
      en: string
      'zh-TW': string
      'zh-CN': string
    }
    description: {
      en: string
      'zh-TW': string
      'zh-CN': string
    }
    keywords: {
      en: string
      'zh-TW': string
      'zh-CN': string
    }
  }
  date: string
  author: string
  image?: string
  tags: string[]
}

// Initialize in-memory store
// Note: In a serverless/edge environment (like Cloudflare Pages), 
// file system writing is not supported. Data will be reset on redeployment/restart.
let posts: BlogPost[] = postsData as BlogPost[]

export function getPosts(): BlogPost[] {
  return posts
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug)
}

export function savePost(post: BlogPost): void {
  const existingIndex = posts.findIndex((p) => p.slug === post.slug)
  
  if (existingIndex > -1) {
    posts[existingIndex] = post
  } else {
    posts.unshift(post) // Add new post to the beginning
  }
  
  console.warn('Post saved to in-memory storage. Changes will be lost on restart.')
}

export function deletePost(slug: string): void {
  posts = posts.filter((p) => p.slug !== slug)
  console.warn('Post deleted from in-memory storage. Changes will be lost on restart.')
}
