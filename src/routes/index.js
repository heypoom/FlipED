import React from "react"
import {connect} from "react-redux"
import {Match, Miss, Redirect} from "react-router"

import Home from "./Home"
import Login from "./Login"
import Signup from "./Signup"
import Join from "./Join"
import JoinExisting from "./JoinExisting"

import UserList from "./UserList"
import Students from "./UserList/Students"
import CourseList from "./CourseList"
import Dashboard from "./Dashboard"
import Course from "./Course"

import Lecture from "./Lecture"
import LectureEditor from "./LectureEditor"

import QuizEditor from "./QuizEditor"

import Chat from "./Chat"
import NotFound from "./NotFound"

import Layout, {Root} from "../components/Layout"
import Background from "../components/Background"
import Guest from "../components/Guest"

import {isPermitted} from "../core/helper"
import {Path} from "../constants/routes"

const mapState = state => ({user: state.user || {}})

/**
  @func MatchWhenAuthorized
  @desc Allow access to route, only if user has sufficient role.
*/

const MatchPermitted = connect(mapState)(({
  component: Component, user, alt: Alt, role = {is: "student"}, ...rest
}) => (
  <Match
    {...rest}
    render={props => {
      if (isPermitted({role: user.roles, ...role})) {
        return (
          <Layout>
            <Component {...props} />
          </Layout>
        )
      }
      if (!user.roles && Alt) {
        return <Alt {...props} />
      }
      return (
        <Background>
          <Layout noTop>
            <Guest />
          </Layout>
        </Background>
      )
    }}
  />
))

const MatchWhenNotAuthorized = connect(mapState)(({
  component: Component, user, ...rest
}) => (
  <Match
    {...rest}
    render={props => (
      typeof user.roles === "string" ? (
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

const t = {is: "teacher"}
const g = {is: "guest"}
const a = {is: "admin"}

export default () => (
  <Root>
    <MatchWhenNotAuthorized exactly pattern={Path.Login} component={Login} />
    <Match exactly pattern={Path.Signup} component={Signup} />
    <Match exactly pattern="/landing" component={Home} />
    <MatchPermitted exactly pattern={Path.Dashboard} component={Dashboard} alt={Home} />
    <MatchPermitted exactly pattern={Path.Join} component={JoinExisting} alt={Join} />
    <MatchPermitted exactly pattern={Path.Chats} component={Chat} role={g} />
    <MatchPermitted exactly pattern={Path.Students} component={Students} role={t} />
    <MatchPermitted exactly pattern={Path.Users} component={UserList} role={a} />
    <MatchPermitted exactly pattern={Path.Courses} component={CourseList} />
    <MatchPermitted exactly pattern={Path.Course} component={Course} />
    <MatchPermitted exactly pattern={Path.Lecture} component={Lecture} />
    <MatchPermitted exactly pattern={Path.LectureEditor} component={LectureEditor} role={t} />
    <MatchPermitted exactly pattern={Path.QuizEditor} component={QuizEditor} role={t} />
    <Match exactly pattern="/" component={() => <div />} />
    <Match pattern="/courses" component={() => <div />} />
    <Match pattern="/notes" component={() => <div />} />
    <Miss component={NotFound} />
  </Root>
)
