import feathers from "feathers"
import hooks from "feathers-hooks"
import rest from "feathers-rest"
import socketio from "feathers-socketio"
import sync from "feathers-sync"

import cors from "cors"
import helmet from "helmet"
import locale from "express-locale"
import path from "path"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"

import logger from "../core/logger"
import socketHandler from "./socketHandler"
import serverRender from "./serverRender"
import errorHandler from "./errorHandler"
import basicLogger from "./basicLogger"

import {REDIS_URL} from "../config"
import {IS_PROD} from "../constants/util"

const without = (uri, middleware) => (req, res, next) => {
  console.log("URI", JSON.stringify(uri), "PATH:", req.path)
  if (req.path.startsWith(uri)) {
    return next()
  }
  return middleware(req, res, next)
}

export default function middlewares() {
  this.logger = logger

  this.use(feathers.static(path.join(__dirname, "public")))
  this.use(cors())
  this.use(bodyParser.json())
  this.use(bodyParser.urlencoded({extended: true}))
  this.use(helmet())
  this.use(locale({
    priority: ["cookie", "query", "hostname", "map", "accept-language", "default"],
    default: "en_US"
  }))
  this.use(cookieParser())

  this.configure(hooks())
  // this.configure(rest())
  this.configure(socketio(socketHandler))

  if (IS_PROD) {
    // Feathers Sync Module
    this.configure(sync({
      db: REDIS_URL || "redis://localhost:6379"
    }))
  }

  this.use(basicLogger)
  this.use(serverRender)
  this.use(errorHandler)
}
