import React, {Component} from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Background from "../components/Background"
import {CDN_URL} from "../constants/visual"
import Cover from "../components/Cover"
import Fa from "../components/Fa"
import Fab from "../components/Fab"
import Grid from "../components/Grid"
import Paper from "../components/Paper"
import TextField from "../components/TextField"
import {connect} from "redux-await"
import {login} from "../actions/user"

import s from "./Login.scss"

class Login extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }
  }

  componentWillReceiveProps = props => {
    if (props.status === "failure") {
      if (props.error.code === 401) {
        swal("โอ๊โอ..", "ข้อมูลผู้ใช้งานอาจจะไม่ถูกต้อง กรุณาลองใหม่อีกครั้งครับ", "error")
      } else {
        swal("โอ๊โอ..", "ระบบข้อมูลผู้ใช้ขัดข้อง กรุณาติดต่อผู้ดูแลระบบครับ", "error")
      }
    } else if (props.status === "success") {
      swal("ยินดีต้อนรับ!", `สวัสดีครับ ${props.user.username}`, "success")
    }
  }

  login = () => {
    this.props.login(this.state.email, this.state.password)
  }

  submit = ev => {
    if (ev.key === "Enter")
      this.login()
  }

  render = () => (
    <Background
      background="url(images/cover/blurlogin.jpg) center / cover no-repeat"
    >
      <Grid c>
        <Paper
          style={{position: "relative", top: "17vh", margin: "auto"}}
          className={s.width}

          outerChild={
            <Cover
              marginBottom="0em"
              height="24em"
              textAlign="center"
              heading="เข้าสู่ระบบ"
              src={`${CDN_URL}/images/cover/july.jpg`}
            />
          }
        >
          <Grid style={{display: this.props.fab ? "block" : "none"}} r>
            <Grid md="12">
              <Fab
                onClick={this.login}
                position="absolute"
                top="-2.3em"
                right="1em"
                bottom="auto"
              >
                <Fa i="sign-in" />
              </Fab>
            </Grid>
          </Grid>
          <Grid r>
            <Grid xs={4} style={{textAlign: "right", padding: "10px 10px 10px 5px"}}>
              อีเมล์ของคุณ:
            </Grid>
            <Grid xs={8}>
              <TextField
                placeholder="email@example.com"
                type="email"
                value={this.state.email}
                onChange={v => this.setState({email: v.target.value})}
                onKeyPress={this.submit}
              />
            </Grid>
          </Grid>
          <Grid r>
            <Grid xs={4} style={{textAlign: "right", padding: "10px 10px 10px 5px"}}>
              รหัสผ่านของคุณ:
            </Grid>
            <Grid xs={8}>
              <TextField
                placeholder="password"
                type="password"
                value={this.state.password}
                onChange={v => this.setState({password: v.target.value})}
                onKeyPress={this.submit}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Background>
  )

}

const mapStateToProps = state => ({
  user: state.user,
  status: state.await.statuses.auth,
  error: state.await.errors.auth
})

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(login(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Login))
