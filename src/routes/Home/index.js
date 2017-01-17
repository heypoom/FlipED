import React from "react"
import c from "classnames"
import {connect} from "react-redux"
import {Link} from "react-router"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Icon from "../../components/Icon"
import Grid from "../../components/Grid"
import Button from "../../components/Button"
import SignupForm from "../../components/Login/Signup"
import SignupModal from "../../components/Login/SignupModal"
import LoginModal from "../../components/Login/LoginModal"

import {LOGO} from "../../constants/visual"
import {Home as Locale} from "../../constants/locales"

import {toggleUi} from "../../actions/app"
import {toggleLocale} from "../../actions/runtime"

import s from "./Home.scss"

const Nav = withStyles(s)(({l, lang, login}) => (
  <div className={s.nav}>
    <div>
      <img className={s.logo} src={LOGO} alt="FlipED Logo" />
    </div>
    {["what", "why", "contact"].map((item, i) => (
      <div key={i}>
        <Link to={`#${item}`}>
          {Locale[l][item]}
        </Link>
      </div>
    ))}
    <div>
      <span onClick={lang}>
        {Locale[l].changeLang}
      </span>
    </div>
    <div>
      <Button onClick={login} className={s.login}>
        {Locale[l].login}
      </Button>
    </div>
  </div>
))

const MobileNav = (props => (
  <div className={s.mobileNav}>
    <div>
      <img className={s.logo} src={LOGO} alt="FlipED Logo" />
    </div>
    <div className={s.toggleNav}>
      <Button onClick={props.login} light>
        Login
      </Button>
    </div>
  </div>
))

const Intro = withStyles(s)(({l, signup}) => (
  <div className={s.intro}>
    <div className={s.introText}>
      <h2>{Locale[l].introh2}</h2>
      <h3>{Locale[l].introh3}</h3>
      <div className={s.introCta}>
        <Button onClick={signup} className={s.introBtn} light>
          {Locale[l].get}
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

const Why = withStyles(s)(({l}) => (
  <div className={s.why}>
    <div className={s.containerWide}>
      <div className={s.whyText}>
        <h2>{Locale[l].beginningH2}</h2>
        <h3>{Locale[l].beginningH3}</h3>
      </div>
      <Grid className={s.features} r>
        <Grid xs={12} sm={4}>
          <div className={s.feature}>
            <Icon i="details" />
            <h3>{Locale[l].feat1}</h3>
            <h4>{Locale[l].feat1desc}</h4>
          </div>
        </Grid>
        <Grid xs={12} sm={4}>
          <div className={s.feature}>
            <Icon i="wifiOn" />
            <h3>{Locale[l].feat2}</h3>
            <h4>{Locale[l].feat2desc}</h4>
          </div>
        </Grid>
        <Grid xs={12} sm={4}>
          <div className={s.feature}>
            <Icon i="person" />
            <h3>{Locale[l].feat3}</h3>
            <h4>{Locale[l].feat3desc}</h4>
          </div>
        </Grid>
      </Grid>
    </div>
  </div>
))

const Footer = withStyles(s)(props => (
  <div className={s.footer}>
    <span>
      Developed by FlipDev Team.
      Sponsored by NECTEC and SCB Foundation.
    </span>
    <span onClick={props.lang}>
      &nbsp; (Language: {Locale[props.l].changeLang})
    </span>
  </div>
))

const Parallax = withStyles(s)(({src, style, children}) => (
  <div className={s.cover} style={{backgroundImage: `url(${src})`, ...style}}>
    <div className={s.inner}>
      {children}
    </div>
  </div>
))

const Signup = withStyles(s)(({l}) => (
  <div className={s.wrapper}>
    <div className={s.container}>
      <div className={s.signupText}>
        <h2>{Locale[l].tryNow}</h2>
        <div className={s.signupForm}>
          <SignupForm noFocus />
        </div>
      </div>
    </div>
  </div>
))

const Home = props => (
  <div className={s.root}>
    <div className={s.first}>
      <div className={s.container}>
        <MobileNav login={props.login} />
        <Nav login={props.login} lang={props.toggleLang} l={props.l} />
        <Intro signup={props.signup} l={props.l} />
      </div>
    </div>
    <div className={s.wrapper}>
      <Why l={props.l} />
    </div>
    <div className={s.wrapper}>
      <div className={s.container}>
        <Statistics />
      </div>
    </div>
    <Signup l={props.l} />
    <LoginModal />
    <SignupModal />
    <Footer lang={props.toggleLang} l={props.l} />
  </div>
)

/*
  <Button onClick={props.signup} className={s.signupBtn}>
    Sign Up
  </Button>
*/

const mapStateToProps = state => ({
  l: state.runtime.locale.language !== "th" ? "en" : "th"
})

const mapDispatchToProps = dispatch => ({
  signup: () => dispatch(toggleUi("signupModal")),
  login: () => dispatch(toggleUi("loginModal")),
  toggleLang: () => dispatch(toggleLocale())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Home))
