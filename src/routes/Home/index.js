import React from "react"
import {Link} from "react-router"
import c from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Grid from "../../components/Grid"
import SignupForm from "./SignupForm.js"

import {LOGO} from "../../constants/visual"

import s from "./Home.scss"

const Nav = withStyles(s)(() => (
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
      <Link to="/auth" className={s.login}>
        Login
      </Link>
    </div>
  </div>
))

const MobileNav = withStyles(s)(() => (
  <div className={s.mobileNav}>
    <div>
      <img className={s.logo} src={LOGO} alt="FlipED Logo" />
    </div>
    <div className={s.toggleNav}>
      <button>Menu</button>
    </div>
  </div>
))

const Intro = withStyles(s)(() => (
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
        <button className={s.introBtn}>
          GET YOURS
        </button>
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
        <h2>N/A</h2>
        <h4>Page Views</h4>
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
    Developed by Phoomparin, Krerkthad and Pavarit.
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

const Home = () => (
  <div className={s.root}>
    <MobileNav />
    <div className={s.first}>
      <div className={s.container}>
        <Nav />
        <Intro />
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
          <SignupForm />
        </div>
      </div>
    </div>
    <Footer />
  </div>
)

export default withStyles(s)(Home)
