import * as React from "react"
import { Link, graphql, PageProps } from "gatsby"

import "./index.scss"
import "swiper/swiper.scss"

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
}

const BlogIndex: React.FC<PageProps<DataProps>> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const featuredPosts = data.allMarkdownRemark.group.find(
    p => p.fieldValue === "true"
  )
  const { width } = useWindowDimensions()
  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <Searchbar />

      <h5 className="title">Latest articles</h5>
      {width > 767 ? (
        <section className="article-grid">
          {featuredPosts.nodes.map((post, idx) => {
            return (
              <>
                <FeaturedArticle post={post} key={idx} />
                <FeaturedArticle post={post} key={idx} />
                <FeaturedArticle post={post} key={idx} />
                <FeaturedArticle post={post} key={idx} />
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

          <SwiperSlide>
            {featuredPosts.nodes.map((post, idx) => {
              return <FeaturedArticle post={post} key={idx} />
            })}
          </SwiperSlide>
          <SwiperSlide>
            {featuredPosts.nodes.map((post, idx) => {
              return <FeaturedArticle post={post} key={idx} />
            })}
          </SwiperSlide>
        </Swiper>
      )}

      <h5 className="title">Topics</h5>
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
