import { Link } from "gatsby"
import { default as React } from "react"
import Doge from "../../assets/doge.svg"
import "./styles.scss"
import {
  connectStateResults,
  Highlight,
  Hits,
  Index,
  Snippet,
} from "react-instantsearch-dom"
import RegularArticle from "../RegularArticle"

const HitCount = connectStateResults(({ searchResults }) => {
  const hitCount = searchResults && searchResults.nbHits

  return hitCount > 0 ? (
    <div className="HitCount">
      {hitCount} result{hitCount !== 1 ? `s` : ``}
    </div>
  ) : (
    <div className="no-results">
      <Doge />
      <h4>No results were found</h4>
    </div>
  )
})

const PageHit = ({ hit }) => {
  return (
    <RegularArticle
      frontmatter={{
        title: <Highlight attribute="title" hit={hit} tagName="mark" />,
        category: hit.category,

        thumbnail: hit.thumbnail,
        excerpt: <Snippet attribute="excerpt" hit={hit} tagName="mark" />,
      }}
      slug={hit.slug}
      excerpt={hit.excerpt}
    />
  )
}
const HitsInIndex = ({ index }) => (
  <Index indexName={index.name}>
    <HitCount />
    <Hits className="Hits" hitComponent={PageHit} />
  </Index>
)

const SearchResult = ({
  indices,
  className,
}: {
  indices: any[]
  className?: string
}) => (
  <div className={className}>
    {indices.map(index => (
      <HitsInIndex index={index} key={index.name} />
    ))}
  </div>
)

export default SearchResult
