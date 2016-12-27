import React from "react"
import c from "classnames"
import {connect} from "react-redux"
import {Field, reduxForm} from "redux-form"
import withStyles from "isomorphic-style-loader/lib/withStyles"

// import {TextField} from "redux-form-material-ui"
import Button from "material-ui/RaisedButton"
import FontIcon from "material-ui/FontIcon"
import AppBar from "material-ui/AppBar"
import IconButton from "material-ui/IconButton"
import LocationOn from "material-ui/svg-icons/communication/location-on"
import {Tabs, Tab} from "material-ui/Tabs"

import Background from "../components/Background"
import Grid from "../components/Grid"
import Shadow from "../components/Shadow"
import TextField from "../components/TextField"
// import Cover from "../components/Cover"

import {authenticate} from "../actions/user"
import {CDN_URL} from "../constants/visual"

import s from "./Login.scss"

/*

  <Cover
    depth="z-0"
    height="15em"
    src={`${CDN_URL}/images/cover/july.jpg`}
    heading="เข้าสู่ระบบ"
  />

  <div className={s.card}>
    <Grid r>
      <Grid xs={12} sm={6}>
        <Button type="submit" icon={<Icon i="facebook" />} fullWidth secondary />
      </Grid>
      <Grid xs={12} sm={6}>
        <Button type="submit" icon={<Icon i="twitter" />} fullWidth secondary />
      </Grid>
    </Grid>
  </div>

  const Icon = ({i}) => (
    <FontIcon
      className={`icon-${i}`}
      style={{padding: "0.45em", fontSize: "1.2em", color: "white"}}
    />
  )
*/

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
                  This is another example of a controllable tab. Remember, if you
                  use controllable Tabs, you need to give all of your tabs values or else
                  you wont be able to select them.
                </p>
              </div>
            </Tab>
          </Tabs>
        </Shadow>
      </Grid>
    </Background>
  </div>
)

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  handleSubmit: ({email, password}) => dispatch(authenticate(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Login))
