import React from "react"
import {connect} from "react-redux"

import {Tab, Tabs} from "material-ui/Tabs"

import Grid from "../components/Grid"
import Navbar from "../components/Navbar"
import CourseList from "../components/CourseList"
import Course from "../components/Course"

import {setUi} from "../actions/app"

const tab = {
  boxShadow: "0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)"
}

const Dashboard = props => (
  <div>
    <Navbar title="Dashboard" />
    <Tabs tabItemContainerStyle={tab} value={props.tv} onChange={props.tc}>
      <Tab label="หน้าหลัก" value="home" />
      <Tab label="คอร์สทั้งหมด" value="courses" />
    </Tabs>
    <div>
      {props.tv === "home" && <Course />}
      {props.tv === "courses" && (
        <Grid style={{paddingTop: "2em"}} c>
          <CourseList />
        </Grid>
      )}
    </div>
  </div>
)

const mapStateToProps = state => ({
  user: state.user,
  tv: state.app.ui.dashTab || "home"
})

const mapDispatchToProps = dispatch => ({
  tc: x => dispatch(setUi("dashTab", x)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
