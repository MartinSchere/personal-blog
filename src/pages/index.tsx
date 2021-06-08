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
import TopicList from "../components/TopicList"
import RegularArticle from "../components/RegularArticle"

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
  const regularPosts = data.allMarkdownRemark.group.find(
    p => p.fieldValue === "false"
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
          slidesPerView={width / 200}
          className="swiper"
          freeMode
        >
          {featuredPosts.nodes.map((post, idx) => {
            return (
              <SwiperSlide key={idx}>
                <FeaturedArticle post={post} />
              </SwiperSlide>
            )
          })}
        </Swiper>
      )}
      <section className="topic-section">
        <h3 className="title">Topics</h3>
        <TopicList />
      </section>

      <section className="more-posts">
        <h3 className="title">More to read</h3>
        {regularPosts &&
          regularPosts.nodes.map((post, idx) => (
            <RegularArticle post={post} key={idx} />
          ))}
      </section>
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

    allMarkdownRemark(limit: 10) {
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
