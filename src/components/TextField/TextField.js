import React from "react"
import c from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import s from "./TextField.scss"

/* eslint jsx-a11y/label-has-for: 0 */

const TextField = props => (
  <div className={s.group} style={props.style}>
    <input
      className={c(s.input, props.value && s.used, props.required && s.validate)}
      style={{
        background: props.background,
        padding: props.padding,
        color: props.color
      }}
      {...props}
      {...(props.input && props.input)}
    />
    <span className={s.bar} />
    <label className={s.label}>{props.label}</label>
  </div>
)

export const TextArea = withStyles(s)(props => (
  <div className={s.group} style={props.style}>
    <textarea
      className={c(s.input, props.value && s.used)}
      style={{background: props.background}}
      {...(props.input ? props.input : props)}
    />
    <span className={s.bar} />
    <label className={s.label}>{props.label}</label>
  </div>
))

export default withStyles(s)(TextField)
