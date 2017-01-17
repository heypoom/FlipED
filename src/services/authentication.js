import auth from "feathers-authentication"
import authManagement from "feathers-authentication-management"
import local from "feathers-authentication-local"
import jwt from "feathers-authentication-jwt"
import hooks from "feathers-hooks-common"

import {AUTH_TOKEN} from "../config"
import {USER} from "../constants/api"

const isAction = (...args) => hook => args.includes(hook.data.action)

export default function authentication() {
  this.configure(auth({
    secret: AUTH_TOKEN,
    service: USER
  }))

  this.configure(authManagement({
    notifier: (type, user, options) => {
      this.logger.log("info", "User Management Notification:", type)
      console.log("info", "USER", user)
      console.log("info", "OPTIONS", options)
    }
  }))

  this.configure(local())
  this.configure(jwt())

  this.service("authentication").before({
    create: [
      auth.hooks.authenticate(["jwt", "local"])
    ]
  })

  this.service("authManagement").before({
    create: [
      hooks.iff(
        isAction("passwordChange", "identityChange"),
        auth.hooks.authenticate(["jwt", "local"])
      ),
      hooks.iff(
        isAction("resendVerifySignup", "passwordChange", "identityChange"),
        hooks.populate({
          include: {
            service: "users"
          }
        })
      )
    ]
  })
}
