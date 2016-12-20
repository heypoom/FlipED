import React from "react"

export default props => (
  <div
    style={{
      color: props.color || "#2d2d30",
      background: props.background || "#fefefe",
      position: "fixed",
      zIndex: 0,
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      overflowY: props.overflowY || "scroll",
      overflowX: "hidden",
      willChange: "transform"
    }}
  >
    {props.children}
  </div>
)
