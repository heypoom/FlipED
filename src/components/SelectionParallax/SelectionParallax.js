import React from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Cover from "../Cover"

import s from "./SelectionParallax.scss"

const SelectionParallax = props => (
  <div>
    <Cover
      src={props.src}
      position="50% 50%"
      alpha="0"
      height={props.height || "50%"}
      depth="z-1"
    />
  </div>
)

export default withStyles(s)(SelectionParallax)
