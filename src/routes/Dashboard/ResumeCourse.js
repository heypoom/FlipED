import React from "react"
import {Link} from "react-router"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import {CardHeading} from "./Cards"

import s from "./Dashboard.scss"

const Play = () => (
  <svg viewBox="0 0 200 200" alt="Play">
    <circle cx="100" cy="100" r="90" fill="none" strokeWidth="15" stroke="#fff" />
    <polygon points="70, 55 70, 145 145, 100" fill="#fff" />
  </svg>
)

const ResumeCourse = ({data, u}) => {
  if (data) {
    return (
      <Link to="/course" className={s.link}>
        <div
          className={s.continue}
          style={{backgroundImage: `url(${data.thumbnail})`}}
        >
          <div className={s.cardOverlay}>
            <CardHeading text={`Resume ${u === "student" ? "Course" : "Teaching"}`} />
            <div style={{marginTop: "2em"}} className={s.cardBody}>
              <h2>{data.name}</h2>
              <small>{data.description}</small>
            </div>
            <div className={s.play}>
              <Play />
            </div>
          </div>
        </div>
      </Link>
    )
  }
  return (
    <div className={c(s.continue, s.new)}>
      <div className={s.cardOverlay}>
        <CardHeading text={u === "student" ? "Select a Course" : "Start Your Course"} />
        <div style={{marginTop: "2em"}} className={s.cardBody}>
          <h2>Welcome to FlipED! Let&apos;s get going.</h2>
          <small>
            {u === "student" ? (
              <span>
                Start Learning
              </span>
            ) : (
              <span>
                Start Your Course
              </span>
            )}
          </small>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  u: state.user.roles || "student",
  data: state.classes.data || {}
})

export default connect(mapStateToProps)(withStyles(s)(ResumeCourse))
