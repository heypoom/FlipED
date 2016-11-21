import React from "react"

const Fa = (props) => (
  <i
    className={`fa fa-${props.i}${props.o ? ` ${props.o}` : ""}`}
    style={props.style}
    onClick={props.onClick}
    aria-hidden
  />
)

export default Fa
