import React, {Component} from "react"
import {connect} from "react-redux"
import {Field, reduxForm} from "redux-form"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import {Tabs, Tab} from "material-ui/Tabs"

import Background from "../../components/Background"
import Grid from "../../components/Grid"
import TextField from "../../components/TextField"
import Paper from "../../components/Paper"

import {authenticate, register} from "../../actions/user"

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

const RegistrationForm = reduxForm({form: "register"})(withStyles(s)(props => (
  <form className={s.form} method="post" onSubmit={props.handleSubmit}>
    <div className={s.card}>
      <Grid r>
        <Grid xs={4} md={3} className={s.label}>
          ชื่อผู้ใช้ของคุณ:
        </Grid>
        <Grid xs={8} md={9}>
          <Field
            name="username"
            placeholder="John Smith"
            style={{width: "100%"}}
            component={TextField}
            type="text"
            required
            autoFocus
          />
        </Grid>
      </Grid>
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
      สมัครสมาชิก
    </button>
  </form>
)))

const cover = {
  height: "16em",
  alpha: 0.498039,
  src: "/images/cover/july.jpg"
}

const mapDispatchToProps = dispatch => ({
  handleLogin: ({email, password}) => dispatch(authenticate(email, password)),
  handleRegistration: ({username, email, password}) => {
    dispatch(register(username, email, password))
  }
})

@withStyles(s)
@connect(null, mapDispatchToProps)
export default class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tabs: "login"
    }
  }

  render = () => (
    <Background>
      <Grid c n vc>
        <Paper
          depth="z-flow"
          cover={{
            ...cover,
            heading: this.state.tabs === "login" ? "เข้าสู่ระบบ" : "สมัครสมาชิก",
            children: (
              <div>
                <div className={s.tab}>
                  <Tabs
                    tabItemContainerStyle={{backgroundColor: "transparent"}}
                    value={this.state.tabs}
                    onChange={e => this.setState({tabs: e})}
                  >
                    <Tab label="เข้าสู่ระบบ" value="login" />
                    <Tab label="สมัครสมาชิก" value="register" />
                  </Tabs>
                </div>
              </div>
            )
          }}
          cardStyle={{background: "white"}} outer full
        >
          {this.state.tabs === "login" ? (
            <LoginForm onSubmit={this.props.handleLogin} />
          ) : (
            <RegistrationForm onSubmit={this.props.handleRegistration} />
          )}
        </Paper>
      </Grid>
    </Background>
  )

}
