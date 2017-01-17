import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router"
import {Field, reduxForm} from "redux-form"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Button from "../Button"

import {authenticate} from "../../actions/user"

import s from "./Login.scss"

const LoginForm = reduxForm({form: "login"})(withStyles(s)(props => (
  <form className={s.form} method="post" onSubmit={props.handleSubmit}>
    <div className={s.card}>
      <Field
        name="email"
        placeholder="อีเมล์ของท่าน (youremail@example.com)"
        style={{width: "100%"}}
        component="input"
        className={s.field}
        type="email"
        pattern=".+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
        required
        autoFocus
      />
      <Field
        name="password"
        placeholder="รหัสผ่านของท่าน (********)"
        style={{width: "100%"}}
        component="input"
        className={s.field}
        type="password"
        pattern=".{8,}"
        required
      />
    </div>
    <Button className={s.login} type="submit" light>
      เข้าสู่ระบบ
    </Button>
    <p className={s.message}>
      ยังไม่ได้สมัครสมาชิก? <Link to="/signup">สร้างบัญชีผู้ใช้</Link>
    </p>
  </form>
)))

const ConnectedLoginForm = props => (
  <LoginForm onSubmit={props.handleLogin} />
)

const mapDispatchToProps = dispatch => ({
  handleLogin: ({email, password}) => {
    dispatch(authenticate(email, password))
  }
})

export default connect(null, mapDispatchToProps)(ConnectedLoginForm)
