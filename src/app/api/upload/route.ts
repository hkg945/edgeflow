import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 })
    }

    // Generate unique filename
    const uniqueSuffix = uuidv4()
    const extension = path.extname(file.name)
    const filename = `${uniqueSuffix}${extension}`
    
    // Save to public/uploads
    const uploadDir = path.join(process.cwd(), 'public/uploads')
    const filepath = path.join(uploadDir, filename)
    
    await writeFile(filepath, buffer)

    // Return the URL
    const url = `/uploads/${filename}`
    
    return NextResponse.json({ url })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
