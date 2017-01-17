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
  "authManagement", "users", "classes", "lessons", "messages", "comments", "quizzes",
  "assignments", "track", "socket", "upload", "accounts", "userstate", "students"
]

export const services = reduxifyServices(app, servicesList)
export const servicesSSR = appInstance => (reduxifyServices(appInstance, servicesList))

export const reAuth = () => {
  if (cookieStorage.getItem(TOKEN_KEY)) {
    app.authenticate({
      strategy: "jwt",
      accessToken: cookieStorage.getItem(TOKEN_KEY)
    })
    .then(response => (app.passport.verifyJWT(response.accessToken)))
    .then(payload => {
      app.set("jwt", payload)
      return app.service("accounts").find()
    })
    .then(user => {
      console.info("Reauthentication Success.")
      app.set("user", user)
    })
    .catch(err => {
      console.error("Reauthentication Failure.", err)
    })
  }
}

export default app
