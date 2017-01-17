import {Service} from "feathers-mongoose"
import local from "feathers-authentication-local"
import hooks from "feathers-hooks-common"

import user from "../models/user"
import {isRole} from "../core/hooks"

import {USER} from "../constants/api"

const VIEW_USERS = "admin"
const MODIFY_USERS = "admin"

export default function users() {
  this.use(USER, new Service({
    Model: user,
    paginate: {
      default: 100,
      max: 200
    }
  }))

  this.service(USER).before({
    find: [isRole(VIEW_USERS)],
    get: [isRole(VIEW_USERS)],
    create: [isRole(MODIFY_USERS), local.hooks.hashPassword()],
    remove: [isRole(MODIFY_USERS), local.hooks.hashPassword()],
    update: [isRole(MODIFY_USERS), local.hooks.hashPassword()],
    patch: [isRole(MODIFY_USERS), local.hooks.hashPassword()]
  })

  /*
  this.service(USER).before({
    find: [hooks.iff()],
    get: [hooks.iff()]
  })
  */

  this.service(USER).after({
    all: [hooks.remove("password", "salt")],
    patch: [hooks.setUpdatedAt("updatedAt")],
    update: [hooks.setUpdatedAt("updatedAt")],
    create: [
      hooks.setCreatedAt("createdAt"),
      hooks.remove("roles", "meta")
    ]
  })
}
