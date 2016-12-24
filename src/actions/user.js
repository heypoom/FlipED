import {push} from "connected-react-router"

import app from "../client/api"
import {USER} from "../constants/api"
import {setSnackbar} from "./app"

export const setUserInfo = data => ({
  type: "SET_USER_INFO",
  payload: data
})

export const authenticate = (email, password) => dispatch => {
  app.authenticate({
    strategy: "local",
    email: email,
    password: password
  })
  .then(response => (app.passport.verifyJWT(response.accessToken)))
  .then(payload => (app.service(USER).get(payload.userId)))
  .then(user => {
    if (user) {
      dispatch(setSnackbar("ยินดีต้อนรับเข้าสู่ระบบ"))
      dispatch(setUserInfo(user))
      dispatch(push("/"))
    }
  })
  .catch(err => {
    console.error("AUTH_ERR", err)
    dispatch(setSnackbar("การยืนยันตัวตนผิดพลาด"))
  })
}

export const logout = () => dispatch => {
  app.logout().then(() => {
    dispatch(setSnackbar("ออกจากระบบแล้วครับ"))
    dispatch(setUserInfo({}))
    dispatch(push("/"))
  }).catch(err => {
    console.error(err)
    dispatch(setSnackbar("พบปัญหาในการออกจากระบบ"))
  })
}
