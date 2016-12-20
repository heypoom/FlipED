import React from "react"

export default ({i, o, style, onClick}) => (
  <i
    className={`fa fa-${i}${o ? ` ${o}` : ""}`}
    style={style}
    onClick={onClick}
    aria-hidden
  />
)
