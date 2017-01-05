import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router"

import {Tab, Tabs} from "material-ui/Tabs"

import Grid from "../components/Grid"
import Navbar from "../components/Navbar"
import CourseList from "../components/CourseList"
import Course from "../components/Course"
import Stats from "../components/Stats"
import Role from "../components/Role"
import Paper from "../components/Paper"

import {setUi} from "../actions/app"
import {isRole} from "../constants/roles"

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

const cover = {
  height: "16em",
  heading: "ยังไม่ได้รับการยืนยันบุคคล",
  alpha: 0.498039,
  src: "/images/cover/july.jpg",
  children: (
    <img
      alt="Black Ribbon" style={{position: "absolute"}}
      src="/images/ribbon_topleft.png"
    />
  )
}

const h2 = {
  margin: "0.5em 0 0.8em 0",
  lineHeight: "1.2em"
}

const p = {
  fontSize: "1.3em"
}

const Guest = connect(state => ({user: state.user}))(({user}) => (
  <Grid style={{paddingTop: "3em"}} vc n c>
    <Paper style={{width: "100%"}} depth="z-flow" cover={cover}>
      <h2 style={h2}>ยังไม่ได้รับการยืนยันบุคคล</h2>
      <p style={p}>
        ในขณะนี้ คุณ <b>{user.username}</b> ยังไม่ได้รับการยืนยันบุคคล <br />
        รบกวนคุณ {user.username} <b>ยืนยันตัวตนกับผู้ดูแลระบบ</b>ด้วยครับ
      </p>
    </Paper>
  </Grid>
))

const Dashboard = ({tv, tc, user}) => (
  <div>
    <div style={nav}>
      <Navbar title="Dashboard" style={bg} noDepth />
      <Tabs tabItemContainerStyle={{...bg, ...shadow}} value={tv} onChange={tc}>
        <Tab label="หน้าหลัก" value="home" />
        <Tab label="คอร์สทั้งหมด" value="courses" />
        {isRole("teacher", user.roles) && (
          <Tab label="สถิติ" value="stats" />
        )}
      </Tabs>
    </div>
    <div style={{background: "#fafafa"}}>
      {tv === "home" && (
        <Grid style={{paddingTop: "2em"}}>
          <Role only="guest">
            <Guest />
          </Role>
          <Role is="student">
            <Course />
          </Role>
        </Grid>
      )}
      {tv === "stats" && (
        <Role is="teacher">
          <Grid style={{marginTop: "1em"}} c>
            <Stats />
          </Grid>
        </Role>
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
  user: state.user,
  tv: state.app.ui.dashTab || "home"
})

const mapDispatchToProps = dispatch => ({
  tc: x => dispatch(setUi("dashTab", x))
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
