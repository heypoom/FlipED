import feathers from "feathers"
import hooks from "feathers-hooks"
import rest from "feathers-rest"
import socketio from "feathers-socketio"
import sync from "feathers-sync"

import cors from "cors"
import helmet from "helmet"
import path from "path"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"

import logger from "../core/logger"
import socketHandler from "./socketHandler"
import serverRender from "./serverRender"
import errorHandler from "./errorHandler"

import {REDIS_URL} from "../config"
import {API_NAMESPACE} from "../constants/api"
import {IS_PROD} from "../constants/util"

const excludeAPI = new RegExp(`^\/(?!${API_NAMESPACE}).*`)

export default function index() {
  const app = this
  app.logger = logger

  app.use(feathers.static(path.join(__dirname, "public")))
  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(helmet())
  app.use(cookieParser())

  app.configure(hooks())
  app.configure(rest())
  app.configure(socketio(socketHandler))

  if (IS_PROD) {
    app.configure(sync({
      db: REDIS_URL || "redis://localhost:6379"
    }))
  }

  // NOTE: Prevent API from being rendered by React.
  app.get(excludeAPI, serverRender)

  app.use(errorHandler)
}
