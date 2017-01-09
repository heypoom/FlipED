import React from "react"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Guest from "./Guest"
import Sidebar from "./Sidebar"
import UserList from "./UserList"
import CourseList from "./CourseList"
import Dash from "./Dash"

import Course from "../../components/Course"
import Role from "../../components/Role"

import s from "./Dashboard.scss"

const Dashboard = props => (
  <div className={s.root}>
    <Sidebar />
    <Role only="guest">
      <div className={s.wrapper}>
        {props.tab === "Dashboard" && <Guest />}
      </div>
    </Role>
    <Role is="student">
      <div className={s.wrapper}>
        {props.tab === "Course" && (
          <Course noCourse={(
            <main>
              <CourseList />
            </main>
          )} />
        )}
        {props.tab === "Dashboard" && <Dash />}
        <main>
          {props.tab === "Students" && <UserList />}
          {props.tab === "Classes" && <CourseList />}
        </main>
      </div>
    </Role>
  </div>
)

const mapStateToProps = state => ({
  tab: state.app.ui.currentView || "Dashboard"
})

export default connect(mapStateToProps)(withStyles(s)(Dashboard))
