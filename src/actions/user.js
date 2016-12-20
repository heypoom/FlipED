import {push} from "connected-react-router"
import {app} from "../constants/api"

export const setUserInfo = data => ({
  type: "SET_USER_INFO",
  payload: data
})

export const authenticate = (email, password) => dispatch => {
  app.authenticate({
    type: "local",
    email: email,
    password: password
  }).then(e => {
    if (e) {
      console.info("AUTH_SUCCESS", e)
      dispatch(setUserInfo(e.data))
      dispatch(push("/"))
    }
  }).catch(e => {
    console.error("AUTH_ERR", e)
  })
}
