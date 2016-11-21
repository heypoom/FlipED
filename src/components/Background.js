import React from "react"

const Background = props => (
  <div
    style={{
      color: props.color || "#2d2d30",
      background: props.background || "#fefefe",
      position: "fixed",
      zIndex: props.zIndex || 0,
      left: props.left || 0,
      right: 0,
      bottom: 0,
      top: 0,
      overflowY: props.overflowY || "scroll",
      overflowX: props.overflowX || "hidden",
      willChange: "transform"
    }}
  >
    {props.children}
  </div>
)

export default Background
