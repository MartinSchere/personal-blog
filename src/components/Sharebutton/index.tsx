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
  title?: string
}

const Sharebutton = (props: SharebuttonProps) => {
  const { site } = useStaticQuery(query)
  const url =
    typeof location !== `undefined` &&
    site.siteMetadata.siteUrl + location.pathname

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

  const shareTo = svgMapping[props.linkTo].href

  const promptShare = async () => {
    const shareData = {
      title: props.title || "Article by @scheredev",
      text: "Check out this cool post by @scheredev",
      url,
    }
    try {
      await navigator.share(shareData)
    } catch (err) {}
  }

  return shareTo ? (
    <a className="share-card" href={shareTo} target="_blank">
      {svgMapping[props.linkTo].svg}
    </a>
  ) : (
    <button onClick={promptShare} className="share-card">
      {svgMapping[props.linkTo].svg}
    </button>
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
