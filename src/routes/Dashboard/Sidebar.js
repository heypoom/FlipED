import React from "react"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Tooltip from "react-tooltip"

import {SideIcon} from "./Icon"
import Role from "../../components/Role"

import {setUi} from "../../actions/app"
import {LOGO} from "../../constants/visual"

import s from "./Sidebar.scss"

const roleMap = {
  Dashboard: {
    is: "guest"
  },
  Classes: {
    is: "student"
  },
  Course: {
    is: "student"
  },
  Students: {
    is: "teacher"
  },
  Profile: {
    is: "guest"
  }
}

const Locale = {
  Dashboard: "หน้าหลัก",
  Classes: "คอร์สทั้งหมด",
  Course: "คอร์สของฉัน",
  Students: "ผู้ใช้งาน",
  Profile: "ข้อมูลส่วนตัว"
}

const Sidebar = props => (
  <div className={s.sidebar}>
    <div className={s.logo}>
      <img src={LOGO} alt="Logo" />
    </div>
    <Tooltip place="top" type="dark" effect="float" />
    {Object.keys(roleMap).map((item, i) => (
      <Role {...roleMap[item]} key={i}>
        <div data-tip={`ไปยังส่วน${Locale[item]}`}>
          <SideIcon
            is={item}
            active={props.ui === item}
            onClick={() => props.set(item)}
            label={Locale[item]}
          />
        </div>
      </Role>
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
