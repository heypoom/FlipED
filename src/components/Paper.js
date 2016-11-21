import React from "react"

import Shadow from "./Shadow"

const Paper = (props) => (
  <Shadow
    className={props.className}
    style={props.style}
    depth={props.depth || "z-flow"}
  >
    {props.outerChild}
    <div
      style={{
        background: props.transparent ? "transparent" : props.background || "#fefefe",
        padding: props.padding || "1.3em",
        fontSize: props.fontSize || "1.3em",
        marginBottom: props.bottom || "1em",
        marginTop: props.top,
        color: props.color,
        height: props.height,
        textAlign: props.textAlign
      }}
    >
      {props.children}
    </div>
  </Shadow>
)

export default Paper
