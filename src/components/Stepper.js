import React from "react"

import {zLite} from "./Shadow"

const borderStyle = {
  width: "2em",
  height: "2em",
  paddingTop: "0.3em",
  paddingLeft: "0.6em",
  background: "white",
  borderRadius: "50%",
  color: "#3498db",
  fontSize: "1em",
  border: "0.1em solid #3498db",
  display: "inline-block",
  marginRight: "1em",
  boxShadow: zLite
}

const Stepper = (props) => (
  <div style={props.style}>
    <div style={{display: "inline-block"}}>
      {props.steps.map((e, i) => (
        <div
          key={i}
          style={i === props.step ? Object.assign({}, borderStyle, {
            background: "#3498db", color: "#fefefe"
          }) : borderStyle}
          onClick={() => props.set(i)}
        >
          {i}
        </div>
      ))}
    </div>
  </div>
)

export default Stepper
