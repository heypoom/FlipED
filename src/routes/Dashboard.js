import React from "react"
import {connect} from "react-redux"

import {Tab, Tabs} from "material-ui/Tabs"

import Grid from "../components/Grid"
import Navbar from "../components/Navbar"
import CourseList from "../components/CourseList"
import Course from "../components/Course"
import Stats from "../components/Stats"

import {setUi} from "../actions/app"

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
    <div style={nav}>
      <Navbar title="Dashboard" style={bg} noDepth />
      <Tabs tabItemContainerStyle={{...bg, ...shadow}} value={tv} onChange={tc}>
        <Tab label="หน้าหลัก" value="home" />
        <Tab label="คอร์สทั้งหมด" value="courses" />
      </Tabs>
    </div>
    <div style={{background: "#fafafa"}}>
      {tv === "home" && (
        <Grid style={{paddingTop: "2em"}}>
          <Course />
          <Grid style={{marginTop: "1em"}} c>
            <Stats />
          </Grid>
        </Grid>
      )}
      {tv === "courses" && (
        <Grid style={{paddingTop: "10em"}} c>
          <CourseList />
        </Grid>
      )}
    </div>
  </div>
)

const mapStateToProps = state => ({
  tv: state.app.ui.dashTab || "home"
})

const mapDispatchToProps = dispatch => ({
  tc: x => dispatch(setUi("dashTab", x)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
