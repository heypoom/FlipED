import React from "react"
import {connect} from "react-redux"
import {Match, Miss, Redirect} from "react-router"

import Login from "./Login"
import Chat from "./Chat"
import Home from "./Home"
import NotFound from "./NotFound"
import Lecture from "./Lecture"
import LectureEditor from "./LectureEditor"

import Profile from "./Profile"
import UserList from "./UserList"
import CourseList from "./CourseList"
import Dashboard from "./Dashboard"
import Course from "./Course"

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

const MatchWhenPermitted = connect(mapState)(({
  component: Component, user, alt: Alt, perm = {is: "student"}, ...rest
}) => (
  <Match
    {...rest}
    render={props => {
      if (isPermitted({role: user.roles, ...perm})) {
        return (
          <Layout>
            <Component {...props} />
          </Layout>
        )
      }
      if (!user.roles && Alt) {
        return <Alt />
      }
      return (
        <Background>
          <Layout>
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

export default () => (
  <Root>
    <MatchWhenNotAuthorized exactly pattern={Path.Auth} component={Login} />
    <MatchWhenPermitted exactly pattern={Path.Dashboard} component={Dashboard} alt={Home} />
    <MatchWhenPermitted exactly pattern={Path.Chats} component={Chat} />
    <MatchWhenPermitted exactly pattern={Path.Students} component={UserList} perm={{is: "teacher"}} />
    <MatchWhenPermitted exactly pattern={Path.Courses} component={CourseList} />
    <MatchWhenPermitted exactly pattern={Path.Course} component={Course} />
    <MatchWhenPermitted exactly pattern={Path.Lecture} component={Lecture} />
    <MatchWhenPermitted exactly pattern={Path.LectureEditor} component={LectureEditor} perm={{is: "teacher"}} />
    <MatchWhenPermitted exactly pattern={Path.Profile} component={Profile} perm={{is: "guest"}} />
    <Match exactly pattern="/" component={() => <div />} />
    <Match pattern="/notes" component={() => <div />} />
    <Miss component={NotFound} />
  </Root>
)
