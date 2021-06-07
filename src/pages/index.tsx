import * as React from "react"
import { Link, graphql, PageProps } from "gatsby"

import "./index.scss"
import "swiper/swiper.scss"

import Avatar from "../assets/avatar.svg"

import { Swiper, SwiperSlide } from "swiper/react"

import Layout from "../components/Layout"
import Seo from "../components/Seo"

import { Post } from "../types"
import Searchbar from "../components/Searchbar"
import FeaturedArticle from "../components/FeaturedArticle"

import useWindowDimensions from "../hooks/useWindowDimensions"

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
  file: {
    childImageSharp: any
  }
}

const BlogIndex: React.FC<PageProps<DataProps>> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const featuredPosts = data.allMarkdownRemark.group.find(
    p => p.fieldValue === "true"
  )
  const { width } = useWindowDimensions()
  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title="Home"
        pathname={location?.pathname}
        metaImage={data.file.childImageSharp.resize}
      />
      <div className="subheader">
        <Searchbar />
        <div className="twitter-user">
          <Avatar />
          by @scheredev
        </div>
      </div>

      <h3 className="title">Latest articles</h3>
      {width > 767 ? (
        <section className="article-grid">
          {featuredPosts.nodes.map((post, idx) => {
            return (
              <>
                <FeaturedArticle post={post} key={idx} />
              </>
            )
          })}
        </section>
      ) : (
        <Swiper
          spaceBetween={50}
          slidesPerView={width < 400 ? 2 : 2.4}
          onSlideChange={() => console.log("slide change")}
          onSwiper={swiper => console.log(swiper)}
          className="swiper"
          freeMode
        >
          <SwiperSlide>
            {featuredPosts.nodes.map((post, idx) => {
              return <FeaturedArticle post={post} key={idx} />
            })}
          </SwiperSlide>
        </Swiper>
      )}

      <h3 className="title">Topics</h3>
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

    file(absolutePath: { regex: "/social-card/" }) {
      id
      childImageSharp {
        resize(width: 1200) {
          src
          height
          width
        }
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
            thumbnail {
              childImageSharp {
                gatsbyImageData(
                  width: 300
                  quality: 90
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
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
