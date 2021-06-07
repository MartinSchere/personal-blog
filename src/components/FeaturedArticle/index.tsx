import React from "react"
import "./styles.scss"

import { Post } from "../../types"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

type FeaturedArticleProps = {
  post: Post
}

const FeaturedArticle = ({ post }: FeaturedArticleProps) => {
  const title = post.frontmatter.title || post.fields.slug
  const image = getImage(post.frontmatter.thumbnail)
  return (
    <article
      className="post-list-item"
      itemScope
      itemType="http://schema.org/Article"
    >
      <Link to={post.fields.slug} itemProp="url">
        <GatsbyImage
          alt={post.frontmatter.title + "image"}
          image={image}
          className="article-image"
        />
        <header>
          <small className="category-text">{post.frontmatter.category}</small>
          <h4 className="article-title">
            <span itemProp="headline">{title}</span>
          </h4>
        </header>
        <section className="article-excerpt">
          <p
            dangerouslySetInnerHTML={{
              __html: post.frontmatter.description || post.excerpt,
            }}
            itemProp="description"
          />
        </section>
      </Link>
    </article>
  )
}

export default FeaturedArticle
