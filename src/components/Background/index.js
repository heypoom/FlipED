import React from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import s from "./Background.scss"

const Background = ({src, text, color, fixed, children}) => (
  <div
    className={s.bg}
    style={{
      backgroundColor: color,
      color: text,
      backgroundImage: src && `url(${src})`,
      overflowY: fixed && "fixed"
    }}
  >
    {children}
  </div>
)

export default withStyles(s)(Background)
