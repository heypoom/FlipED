import {push} from "connected-react-router"
import {reset} from "redux-form"

import app, {services} from "../client/api"
import {autoSyncAll, initState} from "../core/sync"
import {setSnackbar, setUi} from "./app"

export const setUserInfo = data => ({
  type: "SET_USER_INFO",
  payload: data
})

export const authenticate = (email, password) => (dispatch, getState) => {
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
      dispatch(setSnackbar("ยินดีต้อนรับเข้าสู่ระบบ"))
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

export const register = (username, email, password) => (dispatch, getState) => {
  app.service("accounts").create({
    username: username,
    email: email,
    password: password
  })
  .then(user => {
    if (user) {
      const loc = getState().router.location
      dispatch(setSnackbar("ยินดีต้อนรับสู่ FlipED ครับ! กรุณายืนยันตัวตนกับผู้ดูแลระบบก่อนครับ"))
      autoSyncAll(dispatch)
      initState(user, services, dispatch, loc ? loc.pathname : "/")
      dispatch(push("/"))
      dispatch(services.socket.get("online"))
      dispatch(setUi("signupModal", false))
      dispatch(reset("signup"))
      console.info("Registration Success", user)
    }
  })
  .catch(err => {
    console.error("AUTH_ERR", err)
    dispatch(setSnackbar("การยืนยันตัวตนผิดพลาด"))
  })
}

export const logout = () => dispatch => {
  dispatch(services.socket.get("offline")).then(console.log)
  app.logout().then(() => {
    dispatch(setSnackbar("ออกจากระบบแล้วครับ"))
    dispatch(setUserInfo({}))
    dispatch(push("/"))
  }).catch(err => {
    console.error(err)
    dispatch(setSnackbar("พบปัญหาในการออกจากระบบ"))
  })
}
