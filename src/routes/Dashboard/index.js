import React from "react"
import c from "classnames"
import {connect} from "react-redux"
import {Link} from "react-router"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Icon from "../../components/Icon"
import Grid from "../../components/Grid"
import Round from "../../components/Round"
import NavCard from "../../components/Navbar/NavCard"

import {DEFAULT_PROFILE} from "../../constants/visual"
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
  <div className={s.dash}>
    <div>
      <Grid r>
        <Grid a="xs" />
        <Grid xs={6}>
          <div className={s.profile}>
            <h2>{props.user.username || "Guest"}</h2>
            <Round
              src={props.user.photo || DEFAULT_PROFILE}
              onClick={props.toggleNavCard}
              size="3.5em"
            />
            <NavCard />
          </div>
        </Grid>
      </Grid>
    </div>
    <div className={s.body}>
      <Grid r>
        <Grid xs={12} md={5}>
          <ResumeCourse data={props.classes.data} />
        </Grid>
        <Grid xs={12} md={3}>
          <div className={s.break}>
            <Link to="/courses" className={s.link}>
              <SmallCard
                h={props.classes.queryResult.total || 0}
                s="Enrolled Courses"
                i="Courses"
              />
            </Link>
            <div style={{marginTop: "1em"}}>
              <SmallCard h="$7,232.00" s="Student Loans" />
            </div>
          </div>
        </Grid>
        <Grid xs={12} md={4}>
          <div className={c(s.card, s.medium, s.break)}>
            <CardHeading text="Patient History" />
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
            <span>
              <span>Indicator</span> Online
            </span>
          </div>
        </Grid>
      </Grid>
    </div>
  </div>
)

const mapStateToProps = state => ({
  user: state.user || {state: {}},
  classes: state.classes || {}
})

const mapDispatchToProps = dispatch => ({
  changeProfile: url => dispatch(services.accounts.patch(null, {photo: url})),
  toggleNavCard: () => dispatch(toggleUi("navCard"))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Dashboard))
