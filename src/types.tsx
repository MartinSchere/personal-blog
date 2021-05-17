export type SiteMetadata = {
  siteMetadata: {
    title: string
    author: {
      name: string
      summary: string
    }
    description: string
    siteUrl: string
    social: {
      twitter: string
    }
  }
}

export type Post = {
  frontmatter: {
    title: string
    date: string
    description: string
    category: string
    featured: boolean
    featuredImage: any
    thumbnail: any
  }
  excerpt: string
  fields: {
    slug: string
  }
  id: string
}
