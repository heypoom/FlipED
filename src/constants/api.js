import io from "socket.io-client"
import feathers from "feathers/client"
import hooks from "feathers-hooks"
import socketio from "feathers-socketio/client"
import authentication from "feathers-authentication/client"
import {CookieStorage} from "cookie-storage"
import reduxifyServices, {getServicesStatus as getStatus} from "feathers-reduxify-services"

import {TOKEN_KEY} from "../constants"
import {IS_CLIENT, IS_DEV} from "../constants/util"

export const API_NAMESPACE = "api"
export const API_URL = `/${API_NAMESPACE}/`
export const DEBUG_API = `${API_URL}debug`
export const USER_API = `${API_URL}users`
export const CLASS_API = `${API_URL}classes`
export const LESSON_API = `${API_URL}lessons`
export const MESSAGE_API = `${API_URL}messages`
export const COMMENT_API = `${API_URL}comments`
export const QUIZ_API = `${API_URL}quizzes`
export const ASSIGNMENT_API = `${API_URL}assignments`
export const VIEWER_API = `${API_URL}viewer`
export const POST_API = `${API_URL}posts`
export const GRAPHQL_API = `${API_URL}graphql`
export const TRACK_API = `${API_URL}track`
export const SOCKET_API = `${API_URL}socket`

export const LESSON_URL = "/lesson/"
export const QUIZ_URL = "/quiz/"
export const CLASS_URL = "/class/"

export const app = feathers()

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

export const reAuth = () => {
  if (cookieStorage.getItem(TOKEN_KEY)) {
    app.authenticate({
      type: "token",
      token: cookieStorage.getItem(TOKEN_KEY)
    })
  }
}

reAuth()

const service = {}
service[USER_API] = "user"
service[CLASS_API] = "class"
service[LESSON_API] = "lesson"
service[COMMENT_API] = "comment"
service[QUIZ_API] = "quiz"
service[ASSIGNMENT_API] = "assignment"
service[TRACK_API] = "track"
service[SOCKET_API] = "socket"

export const services = reduxifyServices(app, service)
export const servicesSSR = appInstance => (reduxifyServices(appInstance, service))
export const getServicesStatus = getStatus
