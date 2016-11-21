import React from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import s from "./Switch.scss"

export const Switch = props => (
  <div className={s.press}>
    <input
      type="checkbox"
      className={s.cbx}
      checked={props.checked}
      disabled={props.disabled}
    />
    <div className={s.lbl} onClick={props.onClick} />
  </div>
)

export default withStyles(s)(Switch)
