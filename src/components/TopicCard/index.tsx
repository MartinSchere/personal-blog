import React from "react"
import "./styles.scss"
import { getImage, GatsbyImage } from "gatsby-plugin-image"

type TopicCardProps = {
  topic: string
  image: any
}

const TopicCard = (props: TopicCardProps) => {
  const image = getImage(props.image)
  return (
    <div className="image-wrapper">
      <h5 className="topic-name">{props.topic}</h5>
      <GatsbyImage className="topic-image" image={image} alt={props.topic} />
    </div>
  )
}

export default TopicCard
