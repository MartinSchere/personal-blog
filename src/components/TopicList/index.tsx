import React from "react"
import "./styles.scss"
import { useStaticQuery, graphql } from "gatsby"
import { Cateogry } from "../../types"
import TopicCard from "../TopicCard"

import useWindowDimensions from "../../hooks/useWindowDimensions"
import { Swiper, SwiperSlide } from "swiper/react"

type TopicListProps = {}

const TopicList = (props: TopicListProps) => {
  const { allMarkdownRemark } = useStaticQuery(query)
  const { width } = useWindowDimensions()

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={width > 992 ? 4 : width / 250}
      className="swiper"
      freeMode
    >
      {" "}
      {allMarkdownRemark.nodes.map((category: Cateogry, idx: number) => (
        <SwiperSlide key={idx}>
          <TopicCard
            image={category.frontmatter.cat_image}
            topic={category.frontmatter.cat_name}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default TopicList

const query = graphql`
  query {
    allMarkdownRemark(filter: { frontmatter: { cat_name: { ne: null } } }) {
      nodes {
        frontmatter {
          cat_name
          cat_image {
            childImageSharp {
              gatsbyImageData(
                width: 200
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }
  }
`
