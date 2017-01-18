import React from "react"
import c from "classnames"
import {connect} from "react-redux"
import {Link} from "react-router"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import ResumeCourse from "./ResumeCourse"
import {SmallCard, CardHeading} from "./Cards"

import Grid from "../../components/Grid"
import CourseList from "../../components/CourseList"
import CourseCardHeader from "../../components/CourseList/CourseCardHeader"
import CourseCreator from "../../components/CourseCreator"
import Role from "../../components/Role"

// import {toggleUi} from "../../actions/app"

import s from "./Dashboard.scss"

const GeneralStats = withStyles(s)(({l = {total: 0}, cl = {total: 0}}) => (
  <div>
    <Link to="/course" className={s.link}>
      <SmallCard
        h={0}
        s="Unexplored Lectures"
        i="book"
      />
    </Link>
    <div style={{marginTop: "1em"}}>
      <Link to="/courses" className={s.link}>
        <SmallCard
          h={0}
          s="Enrolled Courses"
        />
      </Link>
    </div>
  </div>
))

const ChatBox = withStyles(s)(props => (
  <div className={c(s.card, s.chat)}>
    <h2>Chat Requests</h2>
    <span className={s.chatIndicator}>
      <span className={s.status} />
      <span className={s.statusText}>Online</span>
    </span>
  </div>
))

const ProgressionCard = withStyles(s)(props => (
  <div className={c(s.card, s.medium, s.break)}>
    <CardHeading text="Course Progression" />
    <div className={s.graphBody}>
      FancyCircleGraphs
    </div>
    <div className={s.graphDots}>
      FancyBottomDots
    </div>
  </div>
))

const Dashboard = () => (
  <div className={s.dash}>
    <Grid r>
      <Grid xs={12} md={5}>
        <ResumeCourse />
      </Grid>
    </Grid>
  </div>
)

export default withStyles(s)(Dashboard)
