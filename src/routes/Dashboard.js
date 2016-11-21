import React, {Component} from "react"
import {connect} from "redux-await"
import {Link} from "react-router"

import {ROLE} from "../constants"
import {CDN_URL} from "../constants/visual"

import {zCover} from "../components/Shadow"
import ClassList from "../components/ClassList"
import Grid from "../components/Grid"
import Toolbar from "../components/Toolbar"
import ProfileSidebar from "../components/ProfileSidebar"

const Dashboard = props => (
  <div>
    <Toolbar background="#2d2d30" title="แดชบอร์ด" fixed />
    <ProfileSidebar
      top="6.5em"
      guestHeading="ยังไม่ได้รับการยืนยันบุคคล"
      guestChildren={
        <div>
          <h2>ยังไม่ได้รับการยืนยันบุคคล</h2>
          <p>
            ในขณะนี้ คุณ {props.user.username} ยังไม่ได้รับการยืนยันบุคคล
            รบกวนคุณ {props.user.username} <b>ยืนยันตัวตน</b>กับผู้ดูแลระบบด้วยครับ
          </p>
        </div>
      }
    >
      <ClassList />
    </ProfileSidebar>
  </div>
)

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
