import React from "react"
import {connect} from "react-redux"
import {Field, reduxForm} from "redux-form"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Background from "../components/Background"
import Grid from "../components/Grid"
import Cover from "../components/Cover"

import {TextField} from "redux-form-material-ui"
import Button from "material-ui/RaisedButton"
import Paper from "material-ui/Paper"
import AppBar from "material-ui/AppBar"
import IconButton from "material-ui/IconButton"
import LocationOn from "material-ui/svg-icons/communication/location-on"

import {authenticate} from "../actions/user"
import {CDN_URL} from "../constants/visual"

import s from "./Login.scss"

const LoginForm = reduxForm({form: "login"})(props => (
  <form onSubmit={props.handleSubmit}>
    <Grid r>
      <Grid xs={12} style={{fontSize: "1.1em", fontWeight: 600}}>
        กรุณาเข้าสู่ระบบก่อนครับ
      </Grid>
      <Grid xs={12} sm={6}>
        <Field
          name="email"
          floatingLabelText="อีเมล์ของท่าน"
          hintText="yourmail@example.com"
          component={TextField}
          type="email"
          autoFocus
        />
      </Grid>
      <Grid xs={12} sm={6}>
        <Field
          name="password"
          floatingLabelText="รหัสผ่านของท่าน"
          hintText="********"
          component={TextField}
          type="password"
        />
      </Grid>
    </Grid>
    <Grid style={{marginTop: "0.5em"}} r>
      <Grid xs={12} style={{textAlign: "right"}}>
        <Button type="submit" label="เข้าสู่ระบบ" primary />
      </Grid>
    </Grid>
  </form>
))

const Login = props => (
  <div>
    <AppBar
      title="FlipED"
      style={{position: "fixed"}}
      iconElementRight={<IconButton><LocationOn /></IconButton>}
    />
    <Background background="url(images/cover/blurlogin.jpg) center / cover no-repeat">
      <Grid style={{marginTop: "4em"}} c>
        <Paper>
          <Cover
            height="10em"
            marginBottom="0em"
            src={`${CDN_URL}/images/cover/july.jpg`}
            outerChild={
              <img
                alt="Black Ribbon" style={{position: "absolute", top: "4em"}}
                src={`${CDN_URL}/images/ribbon_topleft.png`}
              />
            }
          />
          <div className={s.card}>
            <LoginForm onSubmit={props.handleSubmit} />
          </div>
        </Paper>
      </Grid>
    </Background>
  </div>
)

const mapDispatchToProps = dispatch => ({
  handleSubmit: ({email, password}) => dispatch(authenticate(email, password))
})

export default connect(() => ({}), mapDispatchToProps)(withStyles(s)(Login))
