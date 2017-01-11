import React from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Shadow from "../Shadow"

import s from "./Cover.scss"

const Cover = ({
  height, color, src, position, attachment, alpha,
  depth, heading, subheading, children, size
}) => (
  <Shadow depth={depth || "z-1"} className={s.wrapper}>
    <div
      style={{
        height: height,
        backgroundColor: color,
        backgroundImage: src && `url(${src})`,
        backgroundPosition: position,
        backgroundAttachment: attachment,
        backgroundSize: size
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
          <div className={s.text}>
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
