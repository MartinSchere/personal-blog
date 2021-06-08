import React from "react"
import "./styles.scss"
import { Link } from "gatsby"

import { Post } from "../../types"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

type RegularArticleProps = {
  post: Post
}

const RegularArticle = ({ post }: RegularArticleProps) => {
  const title = post.frontmatter.title || post.fields.slug
  const image = getImage(post.frontmatter.thumbnail)

  return (
    <article
      className="regular-article"
      itemScope
      itemType="http://schema.org/Article"
    >
      <Link to={post.fields.slug} itemProp="url">
        <GatsbyImage
          alt={post.frontmatter.title + "image"}
          image={image}
          className="regular-article-image"
        />
        <div className="article-body">
          <header>
            <small className="category-text">{post.frontmatter.category}</small>
            <h4 className="regular-article-title">
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
        </div>
      </Link>
    </article>
  )
}

export default RegularArticle
