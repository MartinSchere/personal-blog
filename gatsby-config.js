const siteUrl = `https://schere.dev`

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
console.log(process.env.NODE_ENV)
console.log(process.env)

module.exports = {
  siteMetadata: {
    title: `schere.dev`,
    author: {
      name: `Martín Schere`,
      summary: `who loves remote work, programming and powerlifting`,
    },
    description: `My personal blockchain, web (2.0 & 3.0) development, programming experiences and fintech blog. `,
    siteUrl: `https://schere.dev`,
    social: {
      twitter: `scheredev`,
    },
  },
  plugins: [
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-react-helmet",
    `gatsby-plugin-image`,

    {
      resolve: "gatsby-plugin-robots-txt",
    },
    {
      resolve: "gatsby-plugin-sitemap",
      exclude: ["*/admin/*"],
      options: {
        query: `
        {
          site {
            siteMetadata{
              siteUrl
            }
          }
          allSitePage {
            nodes{
              path
            }
          }
        }
      `,
        output: "/sitemap.xml",
        resolveSiteUrl: () => siteUrl,
        resolvePages: ({ allSitePage: { nodes: allPages } }) => {
          return allPages.map(page => {
            return { ...page }
          })
        },
        serialize: ({ site, allSitePage: { nodes: allPages } }) => {
          return allPages.map(node => {
            let priority = 0.2
            if (node.path === "/") {
              priority = 1
            }
            return {
              url: siteUrl + node.path,
              changefreq: "monthly",
              priority,
            }
          })
        },
      },
    },

    {
      resolve: "gatsby-plugin-sass",
      options: {
        additionalData: `@import "${__dirname}/src/scss/main";`,
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/, // See below to configure properly
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/categories`,
        name: `categories`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        icon: `src/assets/avatar.svg`,
      },
    },

    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-YRVV7JWPQS", // Google Analytics / GA
        ],
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `schere.dev`,
        short_name: `schere.dev`,
        start_url: `/`,
        background_color: `#fffdfd`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/img/avatar.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-gatsby-cloud`,
    `gatsby-plugin-offline`,

    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_API_KEY,
        queries: require("./src/utils/algolia-query"),
      },
    },
  ],
}
