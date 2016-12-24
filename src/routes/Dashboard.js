import React from "react"
import {Link} from "react-router"
import {connect} from "react-redux"

import {Tab, Tabs} from "material-ui/Tabs"

import Grid from "../components/Grid"
import Navbar from "../components/Navbar"
import CourseList from "../components/CourseList"
import Paper from "../components/Paper"

import {services} from "../client/api"
import {setUi} from "../actions/app"

const tabStyle = {
  boxShadow: "0 1px 1.5px 1px rgba(0,0,0,.12)"
}

const Dashboard = props => (
  <div>
    <Navbar title="Dashboard" />
    <Tabs tabItemContainerStyle={tabStyle} value={props.tv} onChange={props.tc}>
      <Tab label="หน้าหลัก" value="home">
        <Grid style={{paddingTop: "2em"}} c>
          <Grid r>
            {props.lesson && props.lesson.data.map((item, i) => (
              <Grid style={{marginBottom: "2em"}} xs={12} key={i}>
                <Link to={`/notes/${item._id}`}>
                  <Paper depth="z">
                    {item.name}
                  </Paper>
                </Link>
              </Grid>
            ))}
          </Grid>
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
  lesson: state.lessons.queryResult,
  tv: state.app.ui.dashTab || "home"
})

const mapDispatchToProps = dispatch => ({
  tc: x => dispatch(setUi("dashTab", x))
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
