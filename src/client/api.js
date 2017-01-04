import io from "socket.io-client"
import feathers from "feathers/client"
import hooks from "feathers-hooks"
import socketio from "feathers-socketio/client"
import authentication from "feathers-authentication-client"
import {CookieStorage} from "cookie-storage"
import reduxifyServices from "feathers-reduxify-services"

import {TOKEN_KEY} from "../constants"
import {IS_CLIENT} from "../constants/util"
import endpoint from "../constants/api"

const app = feathers()

const socket = io(
  IS_CLIENT ? window.location.origin : "", {
    transports: ["websocket"]
  }
)

app.configure(hooks())
app.configure(socketio(socket))

const cookieStorage = IS_CLIENT ? new CookieStorage() : {getItem: () => {}}

app.configure(authentication(IS_CLIENT ? {
  storage: cookieStorage
} : {}))

const servicesList = [
  "debug", "users", "classes", "lessons", "messages", "comments", "quizzes",
  "assignments", "track", "socket", "upload", "signup", "userstate"
]

export const services = reduxifyServices(app, servicesList)
export const servicesSSR = appInstance => (reduxifyServices(appInstance, servicesList))

export const reAuth = () => {
  if (cookieStorage.getItem(TOKEN_KEY)) {
    app.authenticate({
      strategy: "jwt",
      accessToken: cookieStorage.getItem(TOKEN_KEY)
    }).then(response => {
      console.info("RE_AUTHENTICATED", response)
      return app.passport.verifyJWT(response.accessToken)
    }).then(payload => {
      console.info("JWT_PAYLOAD", payload)
      return app.service(endpoint.user).get(payload.userId)
    }).then(user => {
      app.set("user", user)
      console.info("USER", app.get("user"))
    }).catch(err => {
      console.error("AUTH_ERR", err)
    })
  }
}

export default app
