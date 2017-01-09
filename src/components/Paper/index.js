import React from "react"
import c from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Shadow from "../Shadow"
import Cover from "../Cover"

import s from "./Paper.scss"

const Paper = ({
  depth, onClick, title, footer, tStyle, children, anim, style, className,
  fSuccess, fClick, cover, cardStyle, full, outer
}) => (
  <Shadow
    depth={depth}
    onClick={onClick}
    className={c(full && "full", anim && s.anim)}
    style={style}
  >
    {title && (
      <div
        className={s.title}
        dangerouslySetInnerHTML={{__html: title}}
        style={tStyle}
      />
    )}
    {cover && (
      <Cover depth="z-0" card {...cover} />
    )}
    {children && (
      <div className={c(!outer && s.card, className)} style={cardStyle}>
        {children}
      </div>
    )}
    {footer && (
      <button
        onClick={fClick}
        className={c(s.footer, fSuccess && s.success)}
        dangerouslySetInnerHTML={{__html: footer}}
      />
    )}
  </Shadow>
)

export default withStyles(s)(Paper)
