import fs from 'fs'
import path from 'path'

const postsDirectory = path.join(process.cwd(), 'src/data')
const postsFile = path.join(postsDirectory, 'posts.json')

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

// Ensure directory exists
if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true })
}

// Ensure file exists
if (!fs.existsSync(postsFile)) {
  fs.writeFileSync(postsFile, '[]', 'utf8')
}

export function getPosts(): BlogPost[] {
  try {
    const fileContents = fs.readFileSync(postsFile, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error('Error reading posts file:', error)
    return []
  }
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getPosts()
  return posts.find((post) => post.slug === slug)
}

export function savePost(post: BlogPost): void {
  const posts = getPosts()
  const existingIndex = posts.findIndex((p) => p.slug === post.slug)
  
  if (existingIndex > -1) {
    posts[existingIndex] = post
  } else {
    posts.unshift(post) // Add new post to the beginning
  }
  
  fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2), 'utf8')
}

export function deletePost(slug: string): void {
  const posts = getPosts()
  const filteredPosts = posts.filter((p) => p.slug !== slug)
  fs.writeFileSync(postsFile, JSON.stringify(filteredPosts, null, 2), 'utf8')
}
