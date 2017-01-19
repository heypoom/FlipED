import React from "react"
import c from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Icon from "../../components/Icon"

import s from "./Dashboard.scss"

export const SmallCard = withStyles(s)(props => (
  <div className={c(s.card, s.small)}>
    <div className={s.icon}>
      <Icon i="moreVert" />
    </div>
    <div className={s.inner}>
      <div className={s.icon}>
        <Icon i={props.i || "search"} fill="#24C86E" />
      </div>
      <div className={s.cardBody}>
        <h2>{props.h}</h2>
        <small>{props.s}</small>
      </div>
    </div>
  </div>
))

export const CardHeading = withStyles(s)(props => (
  <div className={s.cardHeading}>
    <h2>{props.text}</h2>
    <div className={s.icon}>
      <Icon i="moreVert" />
    </div>
  </div>
))
