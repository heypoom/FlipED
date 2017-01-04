import React from "react"
import c from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Shadow from "../Shadow"

import s from "./Cover.scss"

const Cover = ({
  height, color, src, position, size, attachment, children, alpha,
  textColor, textAlign = "center", top, left, depth, heading, subheading
}) => (
  <Shadow depth={depth || "z-1"} className={s.wrapper}>
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
        style={{background: alpha && `rgba(0, 0, 0, ${alpha})`}}
        className={s.overlay}
      >
        {children && (
          <div>
            {children}
          </div>
        )}
        {(heading || subheading) && (
          <div
            style={{
              color: textColor,
              textAlign: textAlign,
              width: textAlign !== "center" ? "80%" : "100%",
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
          </div>
        )}
      </div>
    </div>
  </Shadow>
)

export default withStyles(s)(Cover)
