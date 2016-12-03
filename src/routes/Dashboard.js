import React, {Component} from "react"
import {connect} from "react-redux"
import {Link} from "react-router"

import {ROLE} from "../constants"
import {CDN_URL} from "../constants/visual"

import {zCover} from "../components/Shadow"
import ClassList from "../components/ClassList"
import Grid from "../components/Grid"
import Toolbar from "../components/Toolbar"
import ProfileSidebar from "../components/ProfileSidebar"

import {services} from "../constants/api"

const Dashboard = props => (
  <div>
    <div>
      <div onClick={props.find}>Find</div>
      {
        props.class &&
          props.class.data.map((e, i) => <div key={i}>{JSON.stringify(e)}</div>)
      }
    </div>
    <ClassList />
  </div>
)

const mapStateToProps = state => ({
  user: state.user,
  class: state.class.queryResult
})

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch,
  find: () => dispatch(services.class.find())
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
