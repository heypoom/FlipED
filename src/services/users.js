import {Service} from "feathers-mongoose"
import auth from "feathers-legacy-authentication-hooks"
import hooks from "feathers-hooks"

import user from "../models/user"
import {USER} from "../constants/api"

export default function users() {
  this.use(USER, new Service({
    Model: user,
    paginate: {
      default: 5,
      max: 25
    }
  }))

  this.service(USER).before({
    create: [
      auth.hashPassword()
    ]
  }).after({
    all: [
      hooks.remove("password", "salt")
    ]
  })
}
