import React from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Grid from "../../components/Grid"
import Role from "../../components/Role"

import CourseList from "../../components/CourseList"
import CourseSearch from "../../components/CourseList/CourseSearch"
import CourseCreator from "../../components/CourseCreator"

import s from "./CourseList.scss"

export default withStyles(s)(() => (
  <div className={s.main}>
    <CourseSearch hr top />
    <Grid r>
      <Grid className={s.reorder} xs={12} md={4}>
        <CourseCreator />
      </Grid>
      <Grid xs={12} md={8}>
        <CourseList />
      </Grid>
    </Grid>
  </div>
))
