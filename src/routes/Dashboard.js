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
        <Grid style={{paddingTop: "2em"}} n c>
          {props.class && (
            <Grid r>
              <Grid style={{marginBottom: "2em"}} xs={12}>
                <Paper cover={{src: props.class.thumbnail, height: "30%"}} depth="z" anim>
                  <h2>{props.class.name}</h2>
                  <h3>{props.class.description}</h3>
                  <small>{props.class._id}</small>
                </Paper>
              </Grid>
            </Grid>
          )}
          <Grid r>
            {props.lessons && props.lessons.data.map((item, i) => (
              <Grid style={{marginBottom: "2em"}} xs={12} key={i}>
                <Paper depth="z" footer="Delete" fClick={() => props.reml(item._id)}>
                  <Link to={`/notes/${item._id}`}>
                    {item.name} {JSON.stringify(item._id)}
                  </Link>
                </Paper>
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
  lessons: state.lessons.queryResult,
  class: state.classes.data,
  tv: state.app.ui.dashTab || "home"
})

const mapDispatchToProps = dispatch => ({
  tc: x => dispatch(setUi("dashTab", x)),
  reml: id => dispatch(services.lessons.remove(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
