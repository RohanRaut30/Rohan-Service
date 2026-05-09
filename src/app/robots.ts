import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/collab'], // Hide private collab area from search engines
    },
    sitemap: 'https://www.rohanraut.is-a.dev/sitemap.xml',
  }
}
