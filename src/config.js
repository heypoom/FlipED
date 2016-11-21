import Dotenv from "dotenv-safe"
import {Strategy as FacebookStrategy} from "passport-facebook"

import {USER_API} from "./constants/api"
import {TOKEN_KEY} from "./constants"

Dotenv.load({sample: ".env"})

export const PORT = process.env.PORT
export const HOST = process.env.HOSTNAME
export const DATABASE_URL = process.env.DATABASE_URL
export const REDIS_URL = process.env.REDIS_URL

export const AUTH_CONFIG_SERVER = {
  token: {
    secret: process.env.AUTH_TOKEN
  },
  local: {
    successHandler: () => (req, res, next) => next
  },
  idField: "_id",
  userEndpoint: USER_API,
  facebook: {
    strategy: FacebookStrategy,
    clientID: "1786897571543047",
    clientSecret: "ea9a4b40d486d3e54d4590d9e58e9f23",
    permissions: {
      authType: "rerequest",
      scope: ["public_profile", "email"]
    }
  },
  cookie: {
    name: TOKEN_KEY,
    httpOnly: true
  }
}
