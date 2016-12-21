import auth from "feathers-authentication"
import local from "feathers-authentication-local"
import jwt from "feathers-authentication-jwt"

import {AUTH_TOKEN} from "../config"
import {USER} from "../constants/api"

export default function authentication() {
  this.configure(auth({
    secret: AUTH_TOKEN,
    service: USER
  }))
  this.configure(local())
  this.configure(jwt())

  this.service("authentication").hooks({
    before: {
      create: [
        auth.hooks.authenticate(["jwt", "local"])
      ]
    }
  })
}
