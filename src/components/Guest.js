import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router"

import Grid from "./Grid"
import Paper from "./Paper"

import {ROLE} from "../constants/roles"

const cover = {
  height: "40%",
  // height: "16em",
  alpha: 0.498039,
  color: "#353E48",
  src: "/images/landing.svg",
  size: "contain",
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
  <div>
    <Grid vc n c>
      <Paper style={{width: "100%"}} depth="z-flow" cover={cover}>
        {user.roles ? (
          <div>
            <h2 style={h2}>
              {user.roles === "guest" ?
                "ยังไม่ได้รับการยืนยันบุคคล" : "ท่านมีสิทธิในการเข้าถึงไม่เพียงพอ"}
            </h2>
            <p style={p}>
              {user.roles === "guest" ? (
                <span>
                  ในขณะนี้ คุณ <b>{user.username}</b> ยังไม่ได้รับการยืนยันบุคคล <br />
                  รบกวนคุณ {user.username} <b>ยืนยันตัวตนกับผู้ดูแลระบบ</b>ด้วยครับ
                </span>
              ) : (
                <span>
                  คุณ <b>{user.username}</b>
                  ซึ่งมีสิทธิเป็น <b>{ROLE[user.roles || "guest"].th}</b>
                  มีสิทธิไม่เพียงพอที่จะเข้าถึงส่วนนี้ครับ
                </span>
              )}
            </p>
          </div>
        ) : (
          <div>
            <h2 style={h2}>
              กรุณาเข้าสู่ระบบ
            </h2>
            <p style={p}>
              <span>
                คุณยังไม่ได้เข้าสู่ระบบ กรุณา <Link to="/auth">เข้าสู่ระบบ</Link> ด้วยครับ
              </span>
            </p>
            <p style={p}>
              <Link to="/auth">เข้าสู่ระบบ หรือ สมัครสมาชิก</Link>
            </p>
          </div>
        )}
      </Paper>
    </Grid>
  </div>
))

export default connect(state => ({user: state.user}))(Guest)
