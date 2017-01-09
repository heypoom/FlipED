import React from "react"
import {connect} from "react-redux"
// import {Link} from "react-router"

import {Tab, Tabs} from "material-ui/Tabs"

import Grid from "../components/Grid"
import Navbar from "../components/Navbar"
import Course from "../components/Course"
import Role from "../components/Role"
import Guest from "./Dashboard/Guest"

import {setUi} from "../actions/app"
import {isRole} from "../core/helper"

const bg = {
  background: "#2d2d30"
}

const shadow = {
  boxShadow: "0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)"
}

const nav = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  zIndex: 1
}

const Dashboard = ({tv, tc}) => (
  <div>
    <div style={{background: "#fafafa"}}>
      {tv === "home" && (
        <Grid style={{paddingTop: "2em"}}>
          <Role style={{paddingTop: "3em"}} only="guest">
            <Guest />
          </Role>
          <Role is="student">
            <Course />
          </Role>
        </Grid>
      )}
    </div>
  </div>
)

const mapStateToProps = state => ({
  tv: state.app.ui.dashTab || "home"
})

const mapDispatchToProps = dispatch => ({
  tc: x => dispatch(setUi("dashTab", x))
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
