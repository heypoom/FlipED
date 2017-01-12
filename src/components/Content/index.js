import React from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"
import Image from "react-medium-image-zoom"

import Video from "../Video"

import s from "./Content.scss"

const PLACEHOLDER_IMAGE = "/images/cover/violet.jpg"
const PLACEHOLDER_COVER = "/images/cover/violet.jpg"

const Content = props => ({
  card: (
    <section
      className={s.text}
      dangerouslySetInnerHTML={{__html: props.content}}
    />
  ),
  youtube: (
    <Video src={props.src} />
  ),
  image: (
    // TODO: Implement Large Image Compressor
    <Image
      image={{
        src: props.src || PLACEHOLDER_IMAGE,
        alt: props.alt,
        className: s.image
      }}
      zoomImage={{
        src: props.src || PLACEHOLDER_IMAGE,
        alt: props.alt
      }}
    />
  ),
  cover: (
    <div
      className={s.cover}
      style={{backgroundImage: `url(${props.src || PLACEHOLDER_COVER})`}}
    />
  ),
  quiz: (
    <div>
      ...
    </div>
  ),
  video: (
    <div>
      <video />
    </div>
  ),
  embed: (
    <iframe
      src={props.src}
      style={{width: "100%", height: "100%"}}
      scrolling="no"
      frameBorder="0"
    />
  )
}[props.type] || <div />)

export default withStyles(s)(Content)
