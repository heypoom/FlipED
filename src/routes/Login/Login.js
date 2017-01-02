import React from "react"
import c from "classnames"
import {connect} from "react-redux"
import {Field, reduxForm} from "redux-form"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import {Tabs, Tab} from "material-ui/Tabs"

import Background from "../../components/Background"
import Grid from "../../components/Grid"
import Shadow from "../../components/Shadow"
import TextField from "../../components/TextField"
import Cover from "../../components/Cover"

import {authenticate} from "../../actions/user"
import {CDN_URL} from "../../constants/visual"

import s from "./Login.scss"

const LoginForm = reduxForm({form: "login"})(withStyles(s)(props => (
  <form className={s.form} method="post" onSubmit={props.handleSubmit}>
    <div className={s.card}>
      <Grid r>
        <Grid xs={4} md={3} className={s.label}>
          อีเมล์ของคุณ:
        </Grid>
        <Grid xs={8} md={9}>
          <Field
            name="email"
            placeholder="youremail@example.com"
            style={{width: "100%"}}
            component={TextField}
            type="email"
            required
            autoFocus
          />
        </Grid>
      </Grid>
      <Grid r>
        <Grid xs={4} md={3} className={s.label}>
          รหัสผ่านของคุณ:
        </Grid>
        <Grid xs={8} md={9}>
          <Field
            name="password"
            placeholder="********"
            style={{width: "100%"}}
            component={TextField}
            type="password"
            pattern=".{8,}"
            required
          />
        </Grid>
      </Grid>
    </div>
    <button className={s.login} type="submit">
      เข้าสู่ระบบ
    </button>
  </form>
)))

const Login = props => (
  <div>
    <Background src="/images/cover/blurlogin.jpg">
      <Grid c n vc>
        <Shadow depth="z-flow" className={c("center", "full")} w>
          <div className={s.title}>
            กรุณาเข้าสู่ระบบก่อนครับ
          </div>
          <Tabs tabItemContainerStyle={{backgroundColor: "#272737"}}>
            <Tab label="เข้าสู่ระบบ" value="login">
              <LoginForm onSubmit={props.handleSubmit} />
            </Tab>
            <Tab label="สมัครสมาชิก" value="register">
              <div className={s.card}>
                <h2>Registration</h2>
                <p>
                  Register your user here.
                </p>
              </div>
            </Tab>
          </Tabs>
        </Shadow>
      </Grid>
    </Background>
  </div>
)

const mapDispatchToProps = dispatch => ({
  handleSubmit: ({email, password}) => dispatch(authenticate(email, password))
})

export default connect(null, mapDispatchToProps)(withStyles(s)(Login))
