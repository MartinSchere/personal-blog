import React from "react"
import "./styles.scss"

import FacebookSvg from "../../assets/facebook-card.svg"
import LinkedinSvg from "../../assets/linkedin-card.svg"
import TwitterSvg from "../../assets/twitter-card.svg"
import ShareSvg from "../../assets/share-card.svg"
import RedditSvg from "../../assets/reddit-card.svg"
import { useStaticQuery, graphql } from "gatsby"

type SharebuttonProps = {
  linkTo: "linkedin" | "reddit" | "facebook" | "twitter" | "share"
  location: { pathname: string }
  title?: string
}

const Sharebutton = (props: SharebuttonProps) => {
  const { site } = useStaticQuery(query)
  const url =
    typeof location !== `undefined` &&
    site.siteMetadata.siteUrl + location.pathname

  const svgMapping = {
    linkedin: {
      svg: <LinkedinSvg />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    },
    reddit: {
      svg: <RedditSvg />,
      href: `https://www.reddit.com/submit?url=${url}`,
    },
    facebook: {
      svg: <FacebookSvg />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    },
    twitter: {
      svg: <TwitterSvg />,
      href: `https://twitter.com/intent/tweet?url=${url}`,
    },
    share: {
      svg: <ShareSvg />,
      href: "",
    },
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
