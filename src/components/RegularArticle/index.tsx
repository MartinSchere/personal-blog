import React from "react"
import "./styles.scss"
import { Link } from "gatsby"

import { Post } from "../../types"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Highlight, Snippet } from "react-instantsearch-dom"

type RegularArticleProps = {
  frontmatter:
    | Post["frontmatter"]
    | {
        category: string
        thumbnail: any
        title: typeof Highlight
        excerpt: typeof Snippet
      }
  slug: string
  excerpt: string
}

const RegularArticle = ({
  frontmatter,
  slug,
  excerpt,
}: RegularArticleProps) => {
  const image = getImage(frontmatter.thumbnail)
  const descriptionOrExcerpt =
    // @ts-ignore
    frontmatter.description || frontmatter.excerpt || excerpt

  return (
    <article
      className="regular-article"
      itemScope
      itemType="http://schema.org/Article"
    >
      <Link to={slug} itemProp="url">
        <GatsbyImage
          alt={"article image"}
          image={image}
          className="regular-article-image-wrapper"
        />
        <div className="article-body">
          <header>
            <small className="category-text">{frontmatter.category}</small>
            <h4 className="regular-article-title">
              <span itemProp="headline">{frontmatter.title}</span>
            </h4>
          </header>
          <section className="article-excerpt">
            <p itemProp="description">{descriptionOrExcerpt}</p>
          </section>
        </div>
      </Link>
    </article>
  )
}

export default RegularArticle
