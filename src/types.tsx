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
  }
  excerpt: string
  fields: {
    slug: string
  }
}
