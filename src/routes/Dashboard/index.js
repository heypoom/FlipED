import React from "react"
import c from "classnames"
import {connect} from "react-redux"
import {Link} from "react-router"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Icon from "../../components/Icon"
import Grid from "../../components/Grid"
import Navbar from "../../components/Navbar"

import {toggleUi} from "../../actions/app"
import {services} from "../../client/api"

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

const ResumeCourse = ({data}) => (data ? (
  <Link to="/course" className={s.link}>
    <div
      className={s.continue}
      style={{backgroundImage: `url(${data.thumbnail})`}}
    >
      <div className={s.cardOverlay}>
        <CardHeading text="Resume Course" />
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
  <Link to="/courses" className={s.link}>
    <div className={c(s.continue, s.new)}>
      <div className={s.cardOverlay}>
        <CardHeading text="Select a Course" />
        <div style={{marginTop: "2em"}} className={s.cardBody}>
          <h2>Let&apos;s Learn Something New!</h2>
          <small>Click here to choose a course.</small>
        </div>
      </div>
    </div>
  </Link>
))

const Dashboard = props => (
  <div className={s.body}>
    <Grid r>
      <Grid xs={12} md={5}>
        <ResumeCourse data={props.classes.data} />
      </Grid>
      <Grid xs={12} md={3}>
        <div className={s.break}>
          <Link to="/course" className={s.link}>
            <SmallCard
              h={props.lessons ? props.lessons.total : 0}
              s="Unexplored Lectures"
              i="book"
            />
          </Link>
          <div style={{marginTop: "1em"}}>
            <Link to="/courses" className={s.link}>
              <SmallCard
                h={props.classes.queryResult ? props.classes.queryResult.total : 0}
                s="Enrolled Courses"
              />
            </Link>
          </div>
        </div>
      </Grid>
      <Grid xs={12} md={4}>
        <div className={c(s.card, s.medium, s.break)}>
          <CardHeading text="Course Progression" />
          <div className={s.graphBody}>
            FancyCircleGraphs
          </div>
          <div className={s.graphDots}>
            FancyBottomDots
          </div>
        </div>
      </Grid>
    </Grid>
    <Grid style={{marginTop: "1.5em"}} r>
      <Grid xs={12} md={3}>
        <div className={s.card}>
          <CardHeading text="Transaction" />
        </div>
        <div className={s.card} style={{marginTop: "1em"}}>
          <CardHeading text="Time Spent" />
        </div>
      </Grid>
      <Grid xs={12} md={5}>
        <div className={c(s.card, s.ops)}>
          <h2>Ops Today</h2>
        </div>
      </Grid>
      <Grid xs={12} md={4}>
        <div className={c(s.card, s.chat)}>
          <h2>Chat Requests</h2>
          <span className={s.chatIndicator}>
            <span className={s.status} />
            <span className={s.statusText}>Online</span>
          </span>
        </div>
      </Grid>
    </Grid>
  </div>
)

const mapStateToProps = state => ({
  user: state.user || {state: {}},
  classes: state.classes || {queryResult: {}},
  lessons: state.lessons.queryResult || {}
})

const mapDispatchToProps = dispatch => ({
  changeProfile: url => dispatch(services.accounts.patch(null, {photo: url})),
  toggleNavCard: () => dispatch(toggleUi("navCard"))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Dashboard))
