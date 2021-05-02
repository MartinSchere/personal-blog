import React from "react"
import "./styles.scss"

import FacebookSvg from "../../assets/facebook-card.svg"
import InstagramSvg from "../../assets/instagram-card.svg"
import TwitterSvg from "../../assets/twitter-card.svg"
import ShareSvg from "../../assets/share-card.svg"

type SharebuttonProps = {
  linkTo: "instagram" | "facebook" | "twitter" | "share"
}

const Sharebutton = (props: SharebuttonProps) => {
  const svgMapping = {
    instagram: <InstagramSvg />,
    facebook: <FacebookSvg />,
    twitter: <TwitterSvg />,
    share: <ShareSvg />,
  }
  return <div className="share-card">{svgMapping[props.linkTo]}</div>
}

export default Sharebutton
