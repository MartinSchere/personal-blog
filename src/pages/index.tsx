import * as React from "react"
import { Link, graphql, PageProps } from "gatsby"

import "./index.scss"

import Bio from "../components/Bio"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

import { Post } from "../types"
import Searchbar from "../components/Searchbar"
import FeaturedArticle from "../components/FeaturedArticle"

type DataProps = {
  site: {
    siteMetadata: {
      title?: string
    }
  }
  allMarkdownRemark: {
    group: {
      nodes: Post[]
      fieldValue: "true" | "false"
    }[]
  }
}

const BlogIndex: React.FC<PageProps<DataProps>> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const featuredPosts = data.allMarkdownRemark.group.find(
    p => p.fieldValue === "true"
  )
  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <Searchbar />

      <h5 className="title">Latest articles</h5>
      <ul style={{ listStyle: `none`, paddingInline: 0 }}>
        {featuredPosts.nodes.map(post => {
          return (
            <li key={post.fields.slug}>
              <FeaturedArticle post={post} />
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark {
      group(field: frontmatter___featured) {
        nodes {
          frontmatter {
            category
            date
            description
            featured
            title
          }
          fields {
            slug
          }
          excerpt
        }
        fieldValue
      }
    }
  }
`
