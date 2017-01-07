import React from "react"
import {connect} from "react-redux"
import {Match, Miss, Redirect} from "react-router"

import Login from "./Login"
import Chat from "./Chat"
import Home from "./Home"
import NotFound from "./NotFound"
import ClassCreator from "./ClassCreator"
import Lecture from "./Lecture"
import LectureEditor from "./LectureEditor"
import Dashboard from "./Dashboard"
import Class from "./Class"

import Layout from "../components/Layout"

const mapState = state => ({user: state.user})

const MatchWhenAuthorized = connect(mapState)(({component: Component, alt: Alt, user, ...rest}) => (
  <Match
    {...rest}
    render={props => {
      const Unregistered = Alt ? <Alt {...props} /> : (
        <Redirect
          to={{
            pathname: "/auth",
            state: {from: props.location}
          }}
        />
      )
      return typeof user.username === "string" ?
        <Component {...props} />
      : Unregistered
    }}
  />
))

const MatchWhenNotAuthorized = connect(mapState)(({component: Component, user, ...rest}) => (
  <Match
    {...rest}
    render={props => (
      typeof user.username === "string" ? (
        <Redirect
          to={{
            pathname: "/",
            state: {from: props.location}
          }}
        />
      ) : (
        <Component {...props} />
      )
    )}
  />
))

export default () => (
  <Layout>
    <MatchWhenAuthorized exactly pattern="/" component={Dashboard} alt={Home} />
    <MatchWhenNotAuthorized exactly pattern="/auth" component={Login} />
    <MatchWhenAuthorized exactly pattern="/class/create" component={ClassCreator} />
    <MatchWhenAuthorized exactly pattern="/class" component={Class} />
    <MatchWhenAuthorized exactly pattern="/chat" component={Chat} />
    <MatchWhenAuthorized exactly pattern="/notes/:id/edit" component={LectureEditor} />
    <MatchWhenAuthorized exactly pattern="/notes/:id" component={Lecture} />
    <Match exactly pattern="/" component={() => <div />} />
    <Miss component={NotFound} />
  </Layout>
)
