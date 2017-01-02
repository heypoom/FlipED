import React from "react"
import {connect} from "react-redux"
import {Match, Miss, Redirect} from "react-router"

import Dashboard from "./Dashboard"
import Login from "./Login"
import Chat from "./Chat"
import Home from "./Home"
import NotFound from "./NotFound"
import Lecture from "./Lecture"
import LectureEditor from "./LectureEditor"

import Layout from "../components/Layout"

/*
  import Register from "./Register"
  import Lesson from "./Lesson"
  import LessonEditor from "./LessonEditor"
  import Class from "./Class"
  import NewClass from "./NewClass"
  import ClassEditor from "./ClassEditor"
  import Stats from "./Stats"
  import Quiz from "./Quiz"
  import QuizEditor from "./QuizEditor"

  <MatchWhenAuthorized pattern="/create" component={NewClass} />
  <MatchWhenAuthorized pattern="/stats" component={Stats} />
  <MatchWhenNotAuthorized pattern="/register" component={Register} />
  <MatchWhenAuthorized exactly pattern="/lesson/:id" component={Lesson} />
  <MatchWhenAuthorized exactly pattern="/lesson/:id/edit" component={LessonEditor} />
  <MatchWhenAuthorized exactly pattern="/class/:id" component={Class} />
  <MatchWhenAuthorized exactly pattern="/class/:id/edit" component={ClassEditor} />
  <MatchWhenAuthorized exactly pattern="/quiz/:id" component={Quiz} />
  <MatchWhenAuthorized exactly pattern="/quiz/:id/edit" component={QuizEditor} />
*/

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
    <Match exactly pattern="/chat" component={Chat} />
    <Match exactly pattern="/notes/:id/edit" component={LectureEditor} />
    <Match exactly pattern="/notes/:id" component={Lecture} />
    <Miss component={NotFound} />
  </Layout>
)
