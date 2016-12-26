import React from "react"
import {connect} from "react-redux"

import {Tab, Tabs} from "material-ui/Tabs"

import Grid from "../components/Grid"
import Navbar from "../components/Navbar"
import CourseList from "../components/CourseList"
import Course from "../components/Course"

import {setUi} from "../actions/app"

const tabStyle = {boxShadow: "0 1px 1.5px 1px rgba(0,0,0,.12)"}

const Dashboard = props => (
  <div>
    <Navbar title="Dashboard" />
    <Tabs tabItemContainerStyle={tabStyle} value={props.tv} onChange={props.tc}>
      <Tab label="หน้าหลัก" value="home">
        <Grid style={{paddingTop: "2em"}} n c>
          <Course />
        </Grid>
      </Tab>
      <Tab label="คอร์สทั้งหมด" value="courses">
        <Grid style={{paddingTop: "2em"}} c>
          <CourseList />
        </Grid>
      </Tab>
    </Tabs>
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
