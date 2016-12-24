import React from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Shadow from "../Shadow"

import s from "./Cover.scss"

// style={{marginBottom: card ? "0em" : "2em"}}

const Cover = ({
  height, color, src, position, size, attachment, card, children, alpha,
  textColor, textAlign = "center", top, left, depth, heading, subheading
}) => (
  <Shadow depth={depth || "z-1"}>
    <div
      style={{
        height: height,
        backgroundColor: color,
        backgroundImage: src && `url(${src})`,
        backgroundPosition: position,
        backgroundSize: size,
        backgroundAttachment: attachment
      }}
      className={s.background}
    >
      <div
        style={{
          background: (alpha || card || color) &&
            `rgba(0,0,0,${(card || color) ? 0 : alpha})`
        }}
        className={s.overlay}
      >
        {(heading || subheading) ? (
          <div
            style={{
              color: textColor,
              textAlign: textAlign,
              width: textAlign !== "center" && "80%",
              top: top,
              left: left,
            }}
            className={s.text}
          >
            <h1 className={s.h1}>
              {heading}
            </h1>
            <h2 className={s.h2}>
              {subheading}
            </h2>
            {children}
          </div>
        ) : children}
      </div>
    </div>
  </Shadow>
)

export default withStyles(s)(Cover)
