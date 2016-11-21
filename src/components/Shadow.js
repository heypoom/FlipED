import React from "react"

export const zLite = "0 1px 1.5px 1px rgba(0,0,0,.12)"
export const z1 = "0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)"
export const z2 = "0 8px 17px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)"
export const z3 = "0 12px 15px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)"
export const zMax = "0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28)"
export const zFlow = "0 38px 43px rgba(0,0,0,.09)"
export const zGrid = "rgba(0, 0, 0, 0.117647) 0px 1px 1.5px 1px"
export const zCover = "rgba(0, 0, 0, 0.156863) 0px 2px 5px 0px, rgba(0, 0, 0, 0.117647) 0px 2px 10px 0px"

const Shadow = (props) => {
  // const depth = "z-0"
  let shadow
  switch (props.depth) {
    case "z":
      shadow = zLite
      break
    case "z-0":
      shadow = "none"
      break
    case "z-1":
      shadow = z1
      break
    case "z-2":
      shadow = z2
      break
    case "z-3":
      shadow = z3
      break
    case "z-max":
      shadow = zMax
      break
    case "z-flow":
      shadow = zFlow
      break
    default:
      shadow = props.depth
  }
  const shadowStyle = Object.assign(props.style || {}, {boxShadow: shadow})
  return (
    <div className={props.className} style={shadowStyle}>
      {props.children}
    </div>
  )
}

export default Shadow
