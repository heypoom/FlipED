import React, {Component} from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"
import {connect} from "react-redux"

import app from "../client/api"

import Background from "../components/Background"
import Cover from "../components/Cover"
import Paper from "../components/Paper"
import Grid from "../components/Grid"
import TextField from "../components/TextField"
import Fab from "../components/Fab"
import Icon from "../components/Icon"

import {CDN_URL} from "../constants/visual"

import s from "./Login.scss"

class Register extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      username: "",
      email: "",
      password: "",
      repeatPassword: ""
    }
  }

  register = () => {
    if (!this.state.username || !this.state.email || !this.state.password || !this.state.repeatPassword) {
      swal("Error", "Please enter all the necessary information.", "error")
    } else if (this.state.password !== this.state.repeatPassword) {
      swal("Error", "Password Mismatch!", "error")
    } else {
      app.service("api/signup")
      .create({
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      })
      .catch(e => {
        swal("โอ๊โอ...", "พบปัญหาในการสมัครสมาชิก", "error")
        console.error("SIGNUP ERROR", e)
      })
      .then(() => {
        app.authenticate({
          strategy: "local",
          email: this.state.email,
          password: this.state.password
        })
        .catch(e => {
          swal("โอ๊โอ...", "พบปัญหาในการเข้าสู่ระบบ", "error")
          console.error("AUTH ERROR", e)
        })
        .then(() => {
          swal(`ยินดีต้อนรับ ${this.state.username}!`, `คุณสามารถใช้งานระบบได้แล้ว ขอบคุณครับ`, "success")
          this.context.router.transitionTo("/")
        })
      })
    }
  }

  submit = ev => {
    if (ev.key === "Enter")
      this.register()
  }

  render = () => (
    <Background src="images/cover/blurlogin.jpg">
      <Grid c>
        <Paper
          style={{position: "relative", top: "10vh", margin: "auto"}}
          className={s.width}
          outerChild={
            <Cover
              marginBottom="0em"
              height="24em"
              textAlign="left"
              left="10%"
              heading="Registration"
              subheading="Please Register Before Proceeding..."
              src={`${CDN_URL}/images/cover/july.jpg`}
            />
          }
        >
          <Grid style={{display: this.props.fab ? "block" : "none"}} r>
            <Grid md={12}>
              <Fab
                onClick={this.register}
                position="absolute"
                top="-2.3em"
                right="1em"
                bottom="auto"
              >
                <Icon i="sign-in" />
              </Fab>
            </Grid>
          </Grid>
          <Grid r>
            <Grid xs={4} style={{textAlign: "right", padding: "10px 10px 10px 5px"}}>
              Username:
            </Grid>
            <Grid xs={8}>
              <TextField
                placeholder="Username"
                type="username"
                value={this.state.username}
                onChange={v => this.setState({username: v.target.value})}
                onKeyPress={this.submit}
              />
            </Grid>
          </Grid>
          <Grid r>
            <Grid xs={4} style={{textAlign: "right", padding: "10px 10px 10px 5px"}}>
              Your Email:
            </Grid>
            <Grid xs={8}>
              <TextField
                placeholder="Email"
                type="email"
                value={this.state.email}
                onChange={v => this.setState({email: v.target.value})}
                onKeyPress={this.submit}
              />
            </Grid>
          </Grid>
          <Grid r>
            <Grid xs={4} style={{textAlign: "right", padding: "10px 10px 10px 5px"}}>
              Password:
            </Grid>
            <Grid xs={8}>
              <TextField
                placeholder="Password"
                type="password"
                value={this.state.password}
                onChange={v => this.setState({password: v.target.value})}
                onKeyPress={this.submit}
              />
            </Grid>
          </Grid>
          <Grid r>
            <Grid xs={4} style={{textAlign: "right", padding: "10px 10px 10px 5px"}}>
              Repeat Password:
            </Grid>
            <Grid xs={8}>
              <TextField
                placeholder="Repeat Password"
                type="password"
                value={this.state.repeatPassword}
                onChange={v => this.setState({repeatPassword: v.target.value})}
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
  user: state.user
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Register))
