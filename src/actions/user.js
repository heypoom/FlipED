import {push} from "connected-react-router"
import {reset} from "redux-form"

import app, {services} from "../client/api"
import {autoSyncAll, initState} from "../core/sync"
import {setSnackbar, setUi} from "./app"

export const setUserInfo = data => ({
  type: "SET_USER_INFO",
  payload: data
})

export const authenticate = (email, password, msg = "ยินดีต้อนรับเข้าสู่ระบบ") => (dispatch, getState) => {
  app.authenticate({
    strategy: "local",
    email: email,
    password: password
  })
  .then(response => (app.passport.verifyJWT(response.accessToken)))
  .then(payload => {
    app.set("jwt", payload)
    return app.service("accounts").find()
  })
  .then(user => {
    if (user) {
      const loc = getState().router.location
      dispatch(setSnackbar(msg))
      autoSyncAll(dispatch)
      initState(user, services, dispatch, loc ? loc.pathname : "/")
      dispatch(push("/"))
      dispatch(services.socket.get("online"))
      dispatch(setUi("loginModal", false))
      dispatch(reset("login"))
    }
  })
  .catch(err => {
    console.error("AUTH_ERR", err)
    dispatch(setSnackbar("การยืนยันตัวตนผิดพลาด"))
  })
}

export const register = (username, email, password) => (dispatch) => {
  app.service("accounts").create({username, email, password}).then(user => {
    if (user) {
      dispatch(authenticate(email, password, "ยินดีต้อนรับสู่ FlipED ครับ! ท่านสามารถสร้างห้องเรียนได้ทันที"))
      dispatch(reset("signup"))
      console.info("Registration Success", user)
    }
  })
  .catch(err => {
    console.error("REGISTRATION_ERR", err)
    dispatch(setSnackbar("การสมัครสมาชิกผิดพลาด"))
  })
}

export const join = (code, username, email, password) => dispatch => {
  app.service("invitation").create({code, username, email, password})
    .then(({status, message, user}) => {
      if (status === "INVITE_SUCCESS") {
        dispatch(authenticate(email, password, message))
        dispatch(reset("join"))
        console.info("Invitation Acceptance Success", user)
      }
    })
    .catch(err => {
      console.error("JOIN_ERROR", err)
      dispatch(setSnackbar(err.message))
    })
}

export const joinExisting = code => dispatch => {
  app.service("invitation").get(code)
    .then(({status, message}) => {
      if (status === "JOIN_EXISTING_SUCCESS") {
        dispatch(push("/courses"))
        dispatch(reset("joinExisting"))
        dispatch(setSnackbar(message))
        console.info("Join with existing account success")
      }
    })
    .catch(err => {
      console.error("JOIN_EXISTING_ERROR", err)
      dispatch(setSnackbar("พบปัญหา"))
    })
}

export const logout = () => dispatch => {
  dispatch(services.socket.get("offline"))
  app.logout().then(() => {
    dispatch(setSnackbar("ออกจากระบบแล้วครับ"))
    dispatch(setUserInfo({}))
    dispatch(push("/"))
  }).catch(err => {
    console.error(err)
    dispatch(setSnackbar("พบปัญหาในการออกจากระบบ"))
  })
}
