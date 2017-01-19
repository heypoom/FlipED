import React from "react"
import c from "classnames"
import {connect} from "react-redux"
import {Link} from "react-router"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import ResumeCourse from "./ResumeCourse"
import {SmallCard, CardHeading} from "./Cards"

import Grid from "../../components/Grid"
import CourseList from "../../components/CourseList"
import CourseSearch from "../../components/CourseList/CourseSearch"
import CourseCreator from "../../components/CourseCreator"
import Role from "../../components/Role"

import s from "./Dashboard.scss"

const GeneralStats = ({l, cl}) => (
  <div>
    <Link to="/course" className={s.link}>
      <SmallCard
        h={l.total || 0}
        s="Lectures in this Course"
        i="book"
      />
    </Link>
    <div style={{marginTop: "1em"}}>
      <Link to="/courses" className={s.link}>
        <SmallCard
          h={cl.total || 0}
          s="Enrolled Courses"
        />
      </Link>
    </div>
  </div>
)

const mapStateToStats = state => ({
  l: state.lessons.queryResult || {total: 0},
  cl: state.classes.queryResult || {total: 0}
})

const ConnectedGeneralStats = connect(mapStateToStats)(withStyles(s)(GeneralStats))

const ChatBox = withStyles(s)(props => (
  <div className={c(s.card, s.chat)}>
    <h2>Chat Requests</h2>
    <span className={s.chatIndicator}>
      <span className={s.status} />
      <span className={s.statusText}>Online</span>
    </span>
    <div className={s.noChat}>
      <img src="/images/fdesk2.svg" role="presentation" />
      <p>
        No Chat Requests for Now.
      </p>
    </div>
  </div>
))

const Dashboard = () => (
  <div className={s.dash}>
    <CourseSearch hr top />
    <Grid r>
      <Grid xs={12} md={5}>
        <ResumeCourse />
      </Grid>
      <Grid xs={12} md={4}>
        <ChatBox />
      </Grid>
      <Grid xs={12} md={3}>
        <ConnectedGeneralStats />
      </Grid>
    </Grid>
    <Grid r>
      <Grid className={s.reorder} xs={12} md={4}>
        <CourseCreator />
      </Grid>
      <Grid xs={12} md={8}>
        <CourseList />
      </Grid>
    </Grid>
  </div>
)

export default withStyles(s)(Dashboard)
