import io from "socket.io-client"
import feathers from "feathers/client"
import hooks from "feathers-hooks"
import socketio from "feathers-socketio/client"
import authentication from "feathers-authentication/client"
import {CookieStorage} from "cookie-storage"

import {TOKEN_KEY} from "../constants"
import {IS_CLIENT, IS_DEV} from "../constants/util"

const app = feathers()

const devSocketURL = `http://${IS_CLIENT ? window.location.hostname : ""}:3000`
const prodSocketURL = IS_CLIENT ? window.location.origin : ""

const socketURL = IS_DEV ? devSocketURL : prodSocketURL
const socket = io(
  IS_CLIENT ? socketURL : "", {
    transports: ["websocket"]
  }
)

app.configure(hooks())
app.configure(socketio(socket))

const cookieStorage = IS_CLIENT ? new CookieStorage() : {getItem: () => {}}

app.configure(authentication(IS_CLIENT ? {
  storage: cookieStorage
} : {}))

if (cookieStorage.getItem(TOKEN_KEY)) {
  app.authenticate({
    type: "token",
    token: cookieStorage.getItem(TOKEN_KEY)
  })
}

export default app
