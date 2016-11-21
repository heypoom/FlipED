import {Service} from "feathers-mongoose"
import {hooks as auth} from "feathers-authentication"
import hooks from "feathers-hooks"

import user from "../models/user"

import {USER_API} from "../constants/api"

class UserService extends Service {

}

export default function users() {
  this.use(USER_API, new UserService({
    Model: user,
    paginate: {
      default: 5,
      max: 25
    }
  }))

  this.service(USER_API).before({
    create: [
      auth.hashPassword()
    ]
  }).after({
    all: [
      hooks.remove("password", "salt")
    ]
  })
}
