import React from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"
import c from "classnames"

// import {WidgetClassList} from "../ClassList"
import {IS_CLIENT} from "../../constants/util"

import s from "./ChatInterface.scss"

export const ChatBubble = withStyles(s)(({self, typing, type, children}) => (
  <div
    className={c(
      s.chatBubble,
      self && s.chatBubbleResponse,
      (typing && !self) && s.chatBubbleTyping,
      typing && s.chatBubbleFade,
      s.chatBubbleSlideIn,
      (!self && !typing && type) && s.chatCard
    )}
  >
    {children}
  </div>
))

export const ChatContent = withStyles(s)(({src}) => {
  if (!src.type && src.text) {
    return <span dangerouslySetInnerHTML={{__html: src.text}} />
  } else if (src.type === "image") {
    return (
      <div>
        {src.text && <span dangerouslySetInnerHTML={{__html: src.text}} />}
        <img src={src.image} alt="Something" />
      </div>
    )
  } else if (src.type === "youtube") {
    return (
      <div className={s.ytContainer}>
        <iframe
          src={`https://www.youtube.com/embed/${src.youtube}?origin=${IS_CLIENT ? window.location.origin : ""}`}
          className={s.ytMedia}
          frameBorder="0"
          allowFullScreen
        />
      </div>
    )
  } else if (src.type === "embed") {
    return (
      <div className={s.chatEmbed}>
        <iframe src={src.src} frameBorder="0" allowFullScreen />
      </div>
    )
  }
  return null
})

export const ChatCustom = ({data, dispatch}) => {
  return null // <WidgetClassList data={data} dispatch={dispatch} c={ChatBubble} />
}
