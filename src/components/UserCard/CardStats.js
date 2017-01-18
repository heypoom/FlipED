import React from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Icon from "../../components/Icon"

import s from "./UserCard.scss"

const stats = [{
  time: "14:04",
  type: "Course",
  info: "Allahu Akbar with Pmc",
  note: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.`,
  icon: "book"
}, {
  time: "10:04",
  type: "Navigation",
  info: "Visits Dashboard",
  note: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.`,
  icon: "details"
}, {
  time: "8:04",
  type: "Connectivity",
  info: "Online",
  note: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.`,
  icon: "wifiOn"
}]

const CardStats = props => (
  <div className={s.stats}>
    {
      stats.map((stat, i) => (
        <div className={s.stat} key={i}>
          <div className={s.indicator} />
          <div className={s.date}>
            {stat.time}
          </div>
          <div className={s.info}>
            <div className={s.catIcon}>
              <Icon i={stat.icon || "Courses"} />
            </div>
            <div className={s.detail}>
              <h3>{stat.type}</h3>
              <h2>{stat.info}</h2>
              <small>{stat.note}</small>
            </div>
          </div>
          <div className={s.line} />
        </div>
      ))
    }
  </div>
)

export default withStyles(s)(CardStats)
