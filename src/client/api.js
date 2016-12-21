import io from "socket.io-client"
import feathers from "feathers/client"
import hooks from "feathers-hooks"
import socketio from "feathers-socketio/client"
import authentication from "feathers-authentication-client"
import {CookieStorage} from "cookie-storage"
import reduxifyServices, {getServicesStatus as getStatus} from "feathers-reduxify-services"

import {TOKEN_KEY} from "../constants"
import {IS_CLIENT} from "../constants/util"
import api from "../constants/api"

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

export const reAuth = () => {
  if (cookieStorage.getItem(TOKEN_KEY)) {
    app.authenticate({
      strategy: "jwt",
      token: cookieStorage.getItem(TOKEN_KEY)
    })
  }
}

reAuth()

const service = {}
service[api.user] = "user"
service[api.class] = "class"
service[api.lesson] = "lesson"
service[api.comment] = "comment"
service[api.quiz] = "quiz"
service[api.assignment] = "assignment"
service[api.track] = "track"
service[api.socket] = "socket"

export const services = reduxifyServices(app, service)
export const getServicesStatus = getStatus

export const servicesSSR = appInstance => (reduxifyServices(appInstance, service))

export default app
