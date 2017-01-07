import React from "react"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import {SideIcon} from "./Icon"

import {setUi} from "../../actions/app"

import s from "./Sidebar.scss"

const tabs = ["Dashboard", "Classes", "Students", "Chat"]

const Sidebar = props => (
  <div className={s.sidebar}>
    <div className={s.logo}>
      <img src="http://localhost/cdn/test/logo.png" alt="Logo" />
    </div>
    {tabs.map((item, i) => (
      <SideIcon
        is={item}
        active={props.ui === item}
        onClick={() => props.set(item)}
        key={i}
      />
    ))}
  </div>
)

const mapStateToProps = state => ({
  ui: state.app.ui.currentView || "Dashboard"
})

const mapDispatchToProps = dispatch => ({
  set: x => dispatch(setUi("currentView", x))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Sidebar))
