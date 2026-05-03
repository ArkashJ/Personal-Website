'use server'
import { auth } from '@clerk/nextjs/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function publishPost(formData: {
  slug: string
  title: string
  description: string
  tags: string
  date: string
  content: string
}) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  const frontmatter = `---
title: "${formData.title}"
date: "${formData.date}"
description: "${formData.description}"
tags: [${formData.tags
    .split(',')
    .map((t) => `"${t.trim()}"`)
    .join(', ')}]
---

${formData.content}`

  const filePath = path.join(process.cwd(), 'content', 'writing', `${formData.slug}.mdx`)
  await writeFile(filePath, frontmatter, 'utf8')
  return { success: true, path: `/writing/${formData.slug}` }
}
