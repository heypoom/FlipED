import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router"
import {Field, reduxForm} from "redux-form"
import withStyles from "isomorphic-style-loader/lib/withStyles"
import Tooltip from "react-tooltip"

import Button from "../Button"

import {joinExisting} from "../../actions/user"

import s from "./Login.scss"

const JoinForm = reduxForm({form: "joinExisting"})(withStyles(s)(props => (
  <form className={s.form} method="post" onSubmit={props.handleSubmit}>
    <Tooltip place="top" type="dark" effect="float" />
    <div className={s.card}>
      <input
        data-tip="ชื่อผู้ใช้"
        style={{width: "100%", color: "darkgrey"}}
        className={s.field}
        type="text"
        value={`ชื่อผู้ใช้: ${props.user.username}`}
        disabled
      />
      {props.code ? (
        <input
          data-tip="รหัสห้องเรียน"
          style={{width: "100%", color: "darkgrey"}}
          className={s.field}
          type="text"
          value={`รหัสเข้าห้องเรียนถูกป้อนโดยอัตโนมัติ: ${props.code}`}
          disabled
        />
      ) : (
        <Field
          name="code"
          data-tip="คัดลอกรหัส 24 หลักที่ท่านได้รับจากผู้สอน"
          placeholder="รหัสเข้าห้องเรียน"
          style={{width: "100%"}}
          component="input"
          className={s.field}
          type="text"
          autoFocus
        />
      )}
    </div>
    <Button className={s.login} type="submit" light>
      เข้าร่วมห้องเรียน
    </Button>
    <p className={s.message}>
      ท่านสามารถเข้าร่วมห้องเรียนใหม่โดยใช้บัญชีนี้ได้ทันที
    </p>
  </form>
)))

const ConnectedJoinForm = props => (
  <JoinForm onSubmit={props.handleJoin} code={props.code} user={props.user} />
)

const mapStateToProps = state => ({
  user: state.user || {}
})

const mapDispatchToProps = (dispatch, props) => ({
  handleJoin: ({code = props.code}) => {
    dispatch(joinExisting(code))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedJoinForm)
