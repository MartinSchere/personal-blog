import React from "react"
import "./styles.scss"

import { Post } from "../../types"
import { Link } from "gatsby"

type FeaturedArticleProps = {
  post: Post
}

const FeaturedArticle = ({ post }: FeaturedArticleProps) => {
  const title = post.frontmatter.title || post.fields.slug
  return (
    <article
      className="post-list-item"
      itemScope
      itemType="http://schema.org/Article"
    >
      <header>
        <h2>
          <Link to={post.fields.slug} itemProp="url">
            <span itemProp="headline">{title}</span>
          </Link>
        </h2>
        <small>{post.frontmatter.date}</small>
      </header>
      <section>
        <p
          dangerouslySetInnerHTML={{
            __html: post.frontmatter.description || post.excerpt,
          }}
          itemProp="description"
        />
      </section>
    </article>
  )
}

export default FeaturedArticle
