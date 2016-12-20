import React from "react"
import c from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import s from "./TextField.scss"

const TextField = props => (
  <div className={s.group} style={props.style}>
    <input
      className={c(s.input, props.value && s.used)}
      style={{
        background: props.background || "transparent",
        padding: props.padding,
        color: props.color
      }}
      {...(props.input ? props.input : props)}
    />
    <span className={s.bar}></span>
    <label className={s.label}>{props.label}</label>
  </div>
)

export const TextArea = withStyles(s)(props => (
  <div className={s.group} style={props.style}>
    <textarea
      className={c(s.input, props.value && s.used)}
      style={{background: props.background || "transparent"}}
      {...(props.input ? props.input : props)}
    />
    <span className={s.bar}></span>
    <label className={s.label}>{props.label}</label>
  </div>
))

export default withStyles(s)(TextField)
