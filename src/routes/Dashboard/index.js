import React from "react"
import c from "classnames"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import {Search} from "../../components/Searchbar"
import Icon from "../../components/Icon"
import Grid from "../../components/Grid"
import Round from "../../components/Round"
import Upload from "../../components/Upload"

import {DEFAULT_PROFILE} from "../../constants/visual"
import {services} from "../../client/api"

import s from "./Dashboard.scss"

const SmallCard = props => (
  <div className={c(s.card, s.small)}>
    <div className={s.icon}>
      <Icon i="moreVert" />
    </div>
    <div className={s.inner}>
      <div className={s.icon}>
        <Icon i="search" fill="#24C86E" />
      </div>
      <div className={s.cardBody}>
        <h2>$7,232.00</h2>
        <small>Operations Income</small>
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

const Dashboard = props => (
  <div className={s.dash}>
    <div>
      <Grid r>
        <Grid xs={8}>
          <Search />
        </Grid>
        <Grid xs={4}>
          <div className={s.profile}>
            <h2>{props.user.username || "Guest"}</h2>
            <Upload result={props.changeProfile}>
              <Round src={props.user.photo || DEFAULT_PROFILE} size="3.5em" />
            </Upload>
          </div>
        </Grid>
      </Grid>
    </div>
    <div className={s.body}>
      <Grid r>
        <Grid xs={12} md={5}>
          <div className={c(s.card, s.big)}>
            <CardHeading text="Total Revenue" />
            <div style={{marginTop: "2em"}} className={s.cardBody}>
              <h2>$346,221.03</h2>
              <small>Got from 1456 customers</small>
            </div>
            <div className={s.charts}>
              FancyGraphs
            </div>
          </div>
        </Grid>
        <Grid xs={12} md={3}>
          <div className={s.break}>
            <SmallCard />
            <div style={{marginTop: "1em"}}>
              <SmallCard />
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
  user: state.user || {}
})

const mapDispatchToProps = dispatch => ({
  changeProfile: url => dispatch(services.accounts.patch(null, {photo: url}))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Dashboard))
