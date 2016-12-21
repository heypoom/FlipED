import React from "react"

export default ({r, c, g, xs, sm, md, lg, n, style, onClick, children}) => {
  const R = r ? "row " : ""
  const C = c ? "container " : ""
  const G = g ? `${g} ` : ""
  const XS = xs ? `col-xs-${xs} ` : ""
  const SM = sm ? `col-sm-${sm} ` : ""
  const MD = md ? `col-md-${md} ` : ""
  const LG = lg ? `col-lg-${lg} ` : ""
  const N = n ? "narrow " : ""
  return (
    <div className={`${R}${C}${G}${XS}${SM}${MD}${LG}${N}`} style={style} onClick={onClick}>
      {children}
    </div>
  )
}
