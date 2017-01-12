import React from "react"
import c from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import s from "./Shadow.scss"

const Shadow = ({depth, children, className, style, onClick}) => (
  <div
    onClick={onClick}
    className={c(
      className,
      !depth && s.zLite,
      depth === "z" && s.zLite,
      depth === "z-1" && s.z1,
      depth === "z-2" && s.z2,
      depth === "z-max" && s.zMax,
      depth === "z-flow" && s.zFlow,
      depth === "z-card" && s.zCard,
      depth === "z-grid" && s.zGrid,
      depth === "z-cover" && s.zCover,
      depth === "z-addr" && s.zAddr
    )}
    style={style}
  >
    {children}
  </div>
)

export default withStyles(s)(Shadow)
