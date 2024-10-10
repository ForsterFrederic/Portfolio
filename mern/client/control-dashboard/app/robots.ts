import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/home /projects /translations /settings',
    },
    sitemap: 'https://starter.rasmic.xyz/sitemap.xml',
  }
}