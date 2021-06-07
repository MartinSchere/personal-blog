import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import Bio from "../components/Bio"
import "./blog-post.scss"
import Sharebutton from "../components/Sharebutton"
import Img from "gatsby-image"
import useWindowDimensions from "../hooks/useWindowDimensions"
import { FaArrowLeft } from "react-icons/fa"
import { useScrollPosition } from "@n8tb1t/use-scroll-position"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  const { width, height } = useWindowDimensions()

  const [showNavbar, setShowNavbar] = React.useState(width > 997)

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isVisible =
        width > 997 ||
        (currPos.y * -1 > prevPos.y * -1 && currPos.y * -1 > height * 0.75)

      if (showNavbar === isVisible) return

      setShowNavbar(isVisible)
    },
    [showNavbar]
  )

  return (
    <Layout
      location={location}
      title={siteTitle}
      showHeader={false}
      showNavbar={showNavbar}
    >
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        {width < 992 && post.frontmatter.featuredImage && (
          <div className="top-image-wrapper">
            <Link to={"/"}>
              <FaArrowLeft className="back-button" color={"white"} />
            </Link>
            <Img
              className="featured-image"
              fluid={post.frontmatter.featuredImage.childImageSharp.fluid}
              alt={post.frontmatter.title}
            />
          </div>
        )}
        <header className="post-header">
          <div className="title-container">
            <small className="category-text">{post.frontmatter.category}</small>
            <h2 itemProp="headline">{post.frontmatter.title}</h2>
          </div>
          <div className="share">
            <Sharebutton location={location} linkTo="twitter" />
            <Sharebutton location={location} linkTo="instagram" />
            <Sharebutton location={location} linkTo="facebook" />
            <Sharebutton location={location} linkTo="share" />
          </div>
        </header>
        <div className="featured-image-wrapper">
          {" "}
          {post.frontmatter.featuredImage && width > 992 && (
            <Img
              className="featured-image"
              fluid={post.frontmatter.featuredImage.childImageSharp.fluid}
              alt={post.frontmatter.title}
            />
          )}
        </div>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
          className="content"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        category
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 900, quality: 90) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
