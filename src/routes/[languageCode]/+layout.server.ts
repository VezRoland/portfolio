import type { LayoutServerLoad } from './$types'
import prisma from '$lib/prisma.client'
import { redirect, error } from '@sveltejs/kit'

export const load: LayoutServerLoad = async ({ params, url }) => {
  const languageCode = params.languageCode
  const language = await prisma.language.findFirst({ where: { code: { equals: languageCode } } })

  const pageName = url.pathname.split('/')[2] || ''

  if (!language) throw redirect(308, `/en/${pageName}`)

  const page = await prisma.page.findFirst({ where: { name: { equals: pageName }, Language: { is: language } } })

  const pages = await prisma.page.findMany({ select: { name: true, content: true }, where: { Language: { is: language } }, orderBy: { position: 'asc' } })

  return { page, pages, language }
}