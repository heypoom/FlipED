import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router"
import {Field, reduxForm} from "redux-form"
import withStyles from "isomorphic-style-loader/lib/withStyles"
import Tooltip from "react-tooltip"

import Button from "../Button"

import {register} from "../../actions/user"
import {setSnackbar} from "../../actions/app"

import s from "./Login.scss"

const SignupForm = reduxForm({form: "signup"})(withStyles(s)(props => (
  <form className={s.form} method="post" onSubmit={props.handleSubmit}>
    <Tooltip place="top" type="dark" effect="float" />
    <div className={s.card}>
      <Field
        data-tip="ชื่อบัญชีผู้ใช้ เป็นภาษาไทยหรืออังกฤษ"
        name="username"
        placeholder="ชื่อผู้ใช้ของของท่าน (John Smith)"
        style={{width: "100%"}}
        component="input"
        className={s.field}
        type="text"
        required
        autoFocus
      />
      <Field
        data-tip="ที่อยู่อีเมล์ที่ถูกต้อง"
        name="email"
        placeholder="อีเมล์ของท่าน (youremail@example.com)"
        style={{width: "100%"}}
        component="input"
        className={s.field}
        type="email"
        required
      />
      <Field
        data-tip="รหัสผ่านความยาวมากกว่า 8 ตัวอักษร"
        name="password"
        placeholder="รหัสผ่านของท่าน (********)"
        style={{width: "100%"}}
        component="input"
        className={s.field}
        type="password"
        pattern=".{8,}"
        required
      />
      <Field
        data-tip="พิมพ์รหัสผ่านอีกครั้งเพื่อยืนยัน"
        name="password2"
        placeholder="ยืนยันรหัสผ่านอีกครั้ง (********)"
        style={{width: "100%"}}
        component="input"
        className={s.field}
        type="password"
        pattern=".{8,}"
        required
      />
    </div>
    <Button className={s.login} type="submit" light>
      สมัครสมาชิก
    </Button>
    <p className={s.message}>
      สมัครสมาชิกแล้ว? <Link to="/login">เข้าสู่ระบบ</Link>
    </p>
  </form>
)))

const ConnectedSignupForm = props => (
  <SignupForm onSubmit={props.handleSignup} />
)

const mapDispatchToProps = dispatch => ({
  handleSignup: ({username, email, password, password2}) => {
    if (password === password2) {
      dispatch(register(username, email, password))
    } else {
      dispatch(setSnackbar("รหัสผ่านทั้งสองไม่ตรงกัน กรุณาแก้ไขด้วยครับ"))
    }
  }
})

export default connect(null, mapDispatchToProps)(ConnectedSignupForm)
