import jwt from "jsonwebtoken"
import Cookie from "cookie"

import {TOKEN_KEY} from "../constants"
import {AUTH_CONFIG_SERVER} from "../config"

const decodeJwt = cookie => (
  new Promise((resolve, reject) => {
    if ((typeof cookie === "string") && (cookie !== "")) {
      const clientCookie = Cookie.parse(cookie)

      if (clientCookie[TOKEN_KEY]) {
        let myJwt = null

        try {
          myJwt = jwt.verify(
            clientCookie[TOKEN_KEY],
            AUTH_CONFIG_SERVER.token.secret
          )
        } catch (e) {
          reject(e)
        }

        if (myJwt) {
          resolve(myJwt)
        } else {
          reject("INVALID_JWT")
        }
      } else {
        reject("NO_JWT")
      }
    } else {
      reject("NO_COOKIE")
    }
  })
)

export default decodeJwt
