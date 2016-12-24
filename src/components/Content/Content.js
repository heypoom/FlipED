import React from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import s from "./Content.scss"

/*
  <Cover
    src={props.thumbnail}
    attachment="fixed"
    position="0% 80%"
    depth="z"
    card
  />
*/

const Content = props => ({
  card: (
    <section
      className={s.text}
      dangerouslySetInnerHTML={{__html: props.content}}
    />
  ),
  youtube: (
    <div className={s.ytContainer}>
      <iframe
        src={`https://www.youtube.com/embed/${props.youtube}`}
        className={s.youtube}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  ),
  image: (
    <img
      src={props.image}
      className={s.image}
      alt={props.alt}
    />
  ),
  cover: (
    <img
      src={props.thumbnail}
      className={s.image}
      alt={props.alt}
    />
  ),
  quiz: (
    <div>...</div>
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
