import React from "react"
import cl from "classnames"

export default ({
  r, c, className, xs, sm, md, lg, n, vc, a,
  style, onClick, children
}) => (
  <div
    className={cl(
      r && "row",
      c && "container",
      className && className,
      a && `col-${a}`,
      xs && `col-xs-${xs}`,
      sm && `col-sm-${sm}`,
      md && `col-md-${md}`,
      lg && `col-lg-${lg}`,
      n && "narrow",
      vc && "vcenter"
    )}
    style={style}
    onClick={onClick}
  >
    {children}
  </div>
)
