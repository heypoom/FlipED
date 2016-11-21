import React from "react"
import CSSTransitionGroup from "react-addons-css-transition-group"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import s from "./SlideAnim.scss"

const SlideAnim = props => (
  <div className={s.enter} style={props.style}>
    {props.children}
  </div>
)

export default withStyles(s)(SlideAnim)
