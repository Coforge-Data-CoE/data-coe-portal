// app/api/accelerator/route.ts
import { NextResponse } from 'next/server'
import Accelerator from '@/models/accelerator'
import { connectToDB } from '@/lib/mongodb'
import { uploadBufferToBlob } from '@/lib/azure'

export const runtime = 'nodejs'

// Basic validation helpers
function assertImage(file: File) {
  if (!file.type.startsWith('image/')) {
    throw new Error('Invalid image type')
  }
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('Image too large (max 10MB)')
  }
}
function assertVideo(file: File) {
  if (!file.type.startsWith('video/')) {
    throw new Error('Invalid video type')
  }
  if (file.size > 100 * 1024 * 1024) {
    throw new Error('Video too large (max 100MB)')
  }
}

export async function POST(req: Request) {
  try {
    await connectToDB()

  const form = await req.formData()
  const name = (form.get('name') as string)?.trim()
  const summary = (form.get('summary') as string)?.trim() || ''

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const bannerFile = form.get('image') as File | null
    const iconFile = form.get('icon') as File | null
    const videoFile = form.get('video') as File | null

    let iconUrl = ''
    let imageUrl = ''
    let videoUrl = ''

    // Upload icon
    if (iconFile && iconFile.size > 0) {
      try {
        assertImage(iconFile)
        const buffer = Buffer.from(await iconFile.arrayBuffer())
        const { url } = await uploadBufferToBlob('data-coe-portal', buffer, iconFile.type, iconFile.name)
        iconUrl = url
      } catch (e: any) {
        return NextResponse.json({ error: `Icon upload failed: ${e.message}` }, { status: 400 })
      }
    }

    // Upload banner image
    if (bannerFile && bannerFile.size > 0) {
      try {
        assertImage(bannerFile)
        const buffer = Buffer.from(await bannerFile.arrayBuffer())
        const { url } = await uploadBufferToBlob('data-coe-portal', buffer, bannerFile.type, bannerFile.name)
        imageUrl = url
      } catch (e: any) {
        return NextResponse.json({ error: `Banner upload failed: ${e.message}` }, { status: 400 })
      }
    }

    // Upload video
    if (videoFile && videoFile.size > 0) {
      try {
        assertVideo(videoFile)
        const buffer = Buffer.from(await videoFile.arrayBuffer())
        const { url } = await uploadBufferToBlob('data-coe-portal', buffer, videoFile.type, videoFile.name)
        videoUrl = url
      } catch (e: any) {
        return NextResponse.json({ error: `Video upload failed: ${e.message}` }, { status: 400 })
      }
    }

    const doc = await Accelerator.create({ name, summary, iconUrl, imageUrl, videoUrl })
    return NextResponse.json(doc, { status: 201 })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 })
  }
}