import {push} from "connected-react-router"

import app from "../client/api"
import {USER} from "../constants/api"

export const setUserInfo = data => ({
  type: "SET_USER_INFO",
  payload: data
})

export const authenticate = (email, password) => dispatch => {
  app.authenticate({
    strategy: "local",
    email: email,
    password: password
  }).then(response => {
    return app.passport.verifyJWT(response.accessToken)
  }).then(payload => {
    return app.service(USER).get(payload.userId)
  }).then(user => {
    if (user) {
      console.info("AUTH_SUCCESS", user)
      dispatch(setUserInfo(user))
      dispatch(push("/"))
    }
  }).catch(err => {
    console.error("AUTH_ERR", err)
  })
}
