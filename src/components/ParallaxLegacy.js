import React from "react"

import {DEFAULT_IMAGE} from "../constants/visual"

const c = Object.assign

const parallax = {
  overflowX: "hidden",
  overflowY: "auto",
  perspective: "300px"
}

const group = {
  position: "relative",
  transformStyle: "preserve-3d"
}

const layer = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
}

const index = {
  fore: {
    transform: "translateZ(90px) scale(.7)",
    zIndex: 1
  },
  deep: {
    transform: "translateZ(-600px) scale(3)",
    zIndex: 2
  },
  back: {
    transform: "translateZ(-300px) scale(2)",
    zIndex: 3
  },
  base: {
    transform: "translateZ(0)",
    zIndex: 4
  }
}

const Parallax = (props) => (
  <div style={c({}, parallax, {height: props.height || "100vh"})}>
    {
      props.source ? props.source.map((e, i) => (
        <div key={i} style={c({}, group, {height: e.height})}>
          <div style={c({}, layer, index[e.z || "fore"])}>
            <div
              style={{
                textAlign: e.textAlign || "center",
                position: "absolute",
                left: e.left || "50%",
                top: e.top || "50%",
                transform: e.transform || "translate(-50%, -50%)"
              }}
            >
              {e.children}
            </div>
          </div>
          <div
            style={c(
              {}, layer, index[e.zB || "back"], {
                background: e.background,
                backgroundSize: "cover"
              }
            )}
          />
        </div>
      )) : {}
    }
  </div>
)

export default Parallax
