import React from "react"
import "./styles.scss"

import FacebookSvg from "../../assets/facebook-card.svg"
import InstagramSvg from "../../assets/instagram-card.svg"
import TwitterSvg from "../../assets/twitter-card.svg"
import ShareSvg from "../../assets/share-card.svg"
import { useStaticQuery, graphql } from "gatsby"

type SharebuttonProps = {
  linkTo: "instagram" | "facebook" | "twitter" | "share"
  location: { pathname: string }
}

const Sharebutton = (props: SharebuttonProps) => {
  const { site } = useStaticQuery(query)
  const url = site.siteMetadata.siteUrl + location.pathname

  const svgMapping = {
    instagram: {
      svg: <InstagramSvg />,
      href: `https://www.instagram.com/?url=${url}`,
    },
    facebook: { svg: <FacebookSvg />, href: "" },
    twitter: {
      svg: <TwitterSvg />,
      href: `https://twitter.com/intent/tweet?url=${url}`,
    },
    share: { svg: <ShareSvg />, href: "" },
  }
  return (
    <a
      className="share-card"
      href={svgMapping[props.linkTo].href}
      target="_blank"
    >
      {svgMapping[props.linkTo].svg}
    </a>
  )
}

export default Sharebutton

const query = graphql`
  query MyQuery {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
