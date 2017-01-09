import React from "react"
import {connect} from "react-redux"

import Grid from "../../components/Grid"
import Paper from "../../components/Paper"

const cover = {
  height: "40%",
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

const Guest = (({user}) => (
  <Grid vc n c>
    <Paper style={{width: "100%"}} depth="z-flow" cover={cover}>
      <h2 style={h2}>ยังไม่ได้รับการยืนยันบุคคล</h2>
      <p style={p}>
        ในขณะนี้ คุณ <b>{user.username}</b> ยังไม่ได้รับการยืนยันบุคคล <br />
        รบกวนคุณ {user.username} <b>ยืนยันตัวตนกับผู้ดูแลระบบ</b>ด้วยครับ
      </p>
    </Paper>
  </Grid>
))

export default connect(state => ({user: state.user}))(Guest)
