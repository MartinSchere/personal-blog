const escapeStringRegexp = require("escape-string-regexp")

const pagePath = `content`
const indexName = `posts`

const pageQuery = `{
  pages: allMarkdownRemark(
    filter: {fileAbsolutePath: 
      {regex: "/${escapeStringRegexp(
        pagePath
      )}/"}, fields: {type: {eq: "post"}}}
  ) {
    edges {
      node {
        id
        frontmatter {
          title
          category 
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
        excerpt(pruneLength: 5000)
      }
    }
  }
}
`

function pageToAlgoliaRecord({ node: { id, frontmatter, fields, ...rest } }) {
  return {
    objectID: id,
    ...frontmatter,
    ...fields,
    ...rest,
  }
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
]

module.exports = queries
