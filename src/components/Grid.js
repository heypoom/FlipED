import React from "react"

const Grid = (props) => {
  const r = props.r ? "row " : ""
  const c = props.c ? "container " : ""
  const g = props.g ? `${props.g} ` : ""
  const xs = props.xs ? `col-xs-${props.xs} ` : ""
  const sm = props.sm ? `col-sm-${props.sm} ` : ""
  const md = props.md ? `col-md-${props.md} ` : ""
  const lg = props.lg ? `col-lg-${props.lg} ` : ""
  return (
    <div className={`${r}${c}${g}${xs}${sm}${md}${lg}`} style={props.style} onClick={props.onClick}>
      {props.children}
    </div>
  )
}

export default Grid
