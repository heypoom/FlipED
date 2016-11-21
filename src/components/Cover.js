import React from "react"

const defaultHeight = "15em"
const defaultAlpha = 0.5

import Shadow from "./Shadow"

const Cover = (props) => {
  const depth = props.depth || "z-1" // z

  const shadowStyle = {
    marginBottom: props.marginBottom || "2em",
    marginTop: props.marginTop,
    paddingTop: props.paddingTop
  }

  const wrapperStyle = {
    height: props.height || defaultHeight,
    background: props.color ? props.color :
      `url(${props.src}) ${props.position || "center"} / ` +
      `${props.size || "cover"} ${props.repeat || "no-repeat"} ${props.attachment || "fixed"}`
  }

  const overlayStyle = {
    background: `rgba(0,0,0,${props.alpha || (props.color ? 0 : defaultAlpha)})`,
    height: "100%",
    width: "100%"
  }

  const textAlign = props.textAlign || "center"

  const textStyle = {
    color: props.textColor || "white",
    textAlign: textAlign,
    width: props.textWidth || textAlign === "center" ? "100%" : "80%",
    position: "relative",
    top: props.top || "50%",
    left: props.left,
    transform: "translateY(-50%)"
  }

  const h1Style = {
    marginTop: props.heading ? "0em" : "-0.7em",
    fontSize: "2.7em",
    fontWeight: 300
  }

  const h2Style = {
    fontSize: "1.7em",
    fontWeight: 300
  }

  return (
    <Shadow depth={depth} style={shadowStyle}>
      <div style={wrapperStyle} className={props.className}>
        <div style={overlayStyle}>
          <div className={props.textClass} style={textStyle}>
            <h1 style={h1Style}>{props.heading}</h1>
            <h2 style={h2Style}>{props.subheading}</h2>
            {props.children}
          </div>
        </div>
      </div>
      {props.outerChild}
    </Shadow>
  )
}

export default Cover
