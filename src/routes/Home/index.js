import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Grid from "../../components/Grid"
import Button from "../../components/Button"
import LoginModal from "../../components/Login/LoginModal"
import SignupModal from "../../components/Login/SignupModal"

import {LOGO} from "../../constants/visual"

import {toggleUi} from "../../actions/app"

import s from "./Home.scss"

const Nav = withStyles(s)(props => (
  <div className={s.nav}>
    <div>
      <img className={s.logo} src={LOGO} alt="FlipED Logo" />
    </div>
    <div>
      <Link to="#!">
        What?
      </Link>
    </div>
    <div>
      <Link to="#!">
        Why?
      </Link>
    </div>
    <div>
      <Link to="#!">
        Contact
      </Link>
    </div>
    <div>
      <Button onClick={props.login} className={s.login}>
        Login
      </Button>
    </div>
  </div>
))

const MobileNav = connect(
  state => ({show: state.app.ui.mobileNav || false}),
  dispatch => ({toggle: () => dispatch(toggleUi("mobileNav"))})
)(props => (
  <div className={s.mobileNav}>
    <div>
      <img className={s.logo} src={LOGO} alt="FlipED Logo" />
    </div>
    <div className={s.toggleNav}>
      <button onClick={props.toggle}>Menu</button>
    </div>
    <div className={s.navWrapper} style={{display: props.show ? "flex" : "none"}}>
      <div>
        <span>Full Screen!</span>
      </div>
      <div>
        <span>Full Screen!</span>
      </div>
    </div>
  </div>
))

const Intro = withStyles(s)(props => (
  <div className={s.intro}>
    <div className={s.introText}>
      <h2>
        Let&apos;s build ourselves an <b>Education 4.0</b> classroom!
      </h2>
      <h3>
        Get the <b>Classroom 4.0</b> tools now, <b>free forever</b>.
        <br /> Built by Students, for <b>Teachers</b>.
      </h3>
      <div className={s.introCta}>
        <Button onClick={props.signup} className={s.introBtn} light>
          GET YOURS
        </Button>
      </div>
    </div>
  </div>
))

const Statistics = withStyles(s)(() => (
  <Grid r>
    <Grid xs={12} sm={4}>
      <div className={s.stat}>
        <h2>N/A</h2>
        <h4>Active Users</h4>
      </div>
    </Grid>
    <Grid xs={12} sm={4}>
      <div className={s.stat}>
        <h2>N/A</h2>
        <h4>Courses Created</h4>
      </div>
    </Grid>
    <Grid xs={12} sm={4}>
      <div className={s.stat}>
        <h2>6</h2>
        <h4>Renowned Achievements</h4>
      </div>
    </Grid>
  </Grid>
))

const Why = withStyles(s)(() => (
  <div className={s.why}>
    <div className={s.container}>
      <div className={s.whyText}>
        <h2>
          It all <b>started</b> from a <b>Simple Idea</b>.
        </h2>
        <h3>No child left behind, etc...</h3>
      </div>
    </div>
  </div>
))

const Footer = withStyles(s)(() => (
  <div className={s.footer}>
    Developed by FlipDev Team.
    Sponsored by NECTEC and SCB Foundation.
  </div>
))

const Parallax = withStyles(s)(props => (
  <div className={s.cover} style={props.style}>
    <div className={s.inner}>
      {props.children}
    </div>
  </div>
))

const Home = props => (
  <div className={s.root}>
    <div className={s.first}>
      <div className={s.container}>
        <MobileNav />
        <Nav login={props.login} />
        <Intro signup={props.signup} />
      </div>
    </div>
    <div className={s.wrapper}>
      <Why />
    </div>
    <div className={s.wrapper}>
      <div className={s.container}>
        <Statistics />
      </div>
    </div>
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.signupText}>
          <h2>
            No Compromises. <b>Try it now.</b>
          </h2>
          <Button onClick={props.signup} className={s.signupBtn}>
            Sign Up
          </Button>
        </div>
      </div>
    </div>
    <LoginModal />
    <SignupModal />
    <Footer />
  </div>
)

const mapDispatchToProps = dispatch => ({
  signup: () => dispatch(toggleUi("signupModal")),
  login: () => dispatch(toggleUi("loginModal"))
})

export default connect(null, mapDispatchToProps)(withStyles(s)(Home))
