import React from "react"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Sidebar from "./Sidebar"
import UserList from "./UserList"
import CourseList from "./CourseList"

import s from "./Stats.scss"

const Dashboard = props => (
  <div className={s.root}>
    <Sidebar />
    <main>
      {props.tab === "Students" && (
        <UserList />
      )}
      {props.tab === "Classes" && (
        <CourseList />
      )}
    </main>
  </div>
)

const mapStateToProps = state => ({
  tab: state.app.ui.currentView || "Classes"
})

export default connect(mapStateToProps)(withStyles(s)(Dashboard))
