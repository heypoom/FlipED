import React from "react"
import c from "classnames"
import {connect} from "react-redux"
import {Link} from "react-router"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Icon from "../../components/Icon"
import Grid from "../../components/Grid"
import CourseList from "../../components/CourseList"
import CourseCreator from "../../components/CourseCreator"
import Role from "../../components/Role"

import {toggleUi} from "../../actions/app"

import s from "./Dashboard.scss"

const SmallCard = props => (
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
)

const CardHeading = props => (
  <div className={s.cardHeading}>
    <h2>{props.text}</h2>
    <div className={s.icon}>
      <Icon i="moreVert" />
    </div>
  </div>
)

const ResumeCourse = ({data, u}) => (data ? (
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
          <svg viewBox="0 0 200 200" alt="Play">
            <circle cx="100" cy="100" r="90" fill="none" strokeWidth="15" stroke="#fff" />
            <polygon points="70, 55 70, 145 145, 100" fill="#fff" />
          </svg>
        </div>
      </div>
    </div>
  </Link>
) : (
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
))

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

const Dashboard = props => (
  <div className={s.body}>
    <Grid r>
      <Grid xs={12} md={5}>
        <ResumeCourse data={props.classes.data} u={props.user.roles} />
      </Grid>
      <Grid xs={12} md={3}>
        <ProgressionCard />
      </Grid>
      <Grid xs={12} md={4}>
        <ChatBox />
      </Grid>
    </Grid>
    <div style={{marginTop: "1.5em"}}>
      <Role is="teacher">
        <Grid xs={12} sm={4}>
          <CourseCreator />
        </Grid>
      </Role>
      <CourseList />
    </div>
    <Grid style={{marginTop: "1.5em"}} r>
      <Grid xs={12} md={4}>
        <ProgressionCard />
      </Grid>
    </Grid>
  </div>
)

const mapStateToProps = state => ({
  user: state.user || {state: {}},
  classes: state.classes || {queryResult: {}},
  lessons: state.lessons || {queryResult: {}}
})

export default connect(mapStateToProps)(withStyles(s)(Dashboard))
