import {AWAIT_MARKER} from "redux-await"

import app from "../client/feathers"

export const setUserInfo = data => ({
  type: "SET_USER_INFO",
  payload: data
})

export const login = (email, password) => ({
  type: "LOGIN",
  AWAIT_MARKER,
  payload: {
    auth: app.authenticate({
      type: "local",
      email,
      password
    })
  }
})

export const logout = () => ({
  type: "LOGOUT",
  AWAIT_MARKER,
  payload: {
    auth: new Promise((resolve, reject) => {
      try {
        app.logout()
      } catch (err) {
        reject(err)
      }
      resolve({})
    })
  }
})
