import React, { useState, createRef, useMemo } from "react"
import "./search.scss"
import algoliasearch from "algoliasearch/lite"
import { InstantSearch } from "react-instantsearch-dom"
import useClickOutside from "../hooks/useClickOutside"

import { graphql, PageProps } from "gatsby"
import Layout from "../components/Layout"
import * as queryString from "query-string"
import RegularArticle from "../components/RegularArticle"
import Searchbox from "../components/Searchbar/searchbox"
import SearchResult from "../components/SearchResults"

type DataProps = {
  site: {
    siteMetadata: {
      title: string
    }
  }
}

const Search: React.FC<PageProps<DataProps>> = ({ data, location }) => {
  const { query: URLQuery } = queryString.parse(location.search)
  const searchIndices = [{ name: `posts`, title: `Posts` }]
  const rootRef = createRef<HTMLDivElement>()

  const [hasFocus, setFocus] = useState(false)
  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
      ),
    []
  )
  useClickOutside(rootRef, () => setFocus(false))

  return (
    <Layout
      location={location}
      title={data.site.siteMetadata.title}
      showHeader={false}
      showNavbar
    >
      <div className="root-ref-holder" ref={rootRef}>
        <InstantSearch
          searchClient={searchClient}
          indexName={searchIndices[0].name}
        >
          <Searchbox
            onFocus={() => setFocus(true)}
            hasFocus={hasFocus}
            initialValue={URLQuery}
          />

          <SearchResult indices={searchIndices} />
        </InstantSearch>
        <section className="post-list">
          {/* <RegularArticle post={post} /> */}
        </section>
      </div>
    </Layout>
  )
}

export default Search

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
