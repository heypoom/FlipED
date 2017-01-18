import React from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import CourseList from "../../components/CourseList"

import s from "./CourseList.scss"

export default withStyles(s)(() => (
  <div className={s.main}>
    <CourseList />
  </div>
))
