import React from "react"
import c from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import s from "./TextField.scss"

export const TextField = (props) => (
  <div className={s.group} style={props.style}>
    {
      props.textarea ?
      (
        <textarea
          className={c(s.input, props.value && s.used)}
          onChange={props.onChange}
          onKeyPress={props.onKeyPress}
          style={{background: props.background || "transparent"}}
          placeholder={props.placeholder}
          value={props.value}
        />
      ) : (
        <input
          className={c(s.input, props.value && s.used)}
          onChange={props.onChange}
          onKeyPress={props.onKeyPress}
          type={props.type || "text"}
          style={{
            background: props.background || "transparent",
            padding: props.padding,
            color: props.color
          }}
          placeholder={props.placeholder}
          value={props.value}
        />
      )
    }
    <span className={s.bar}></span>
    <label className={s.label}>{props.label}</label>
  </div>
)

export default withStyles(s)(TextField)
