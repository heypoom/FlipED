import {Service} from "feathers-mongoose"
import local from "feathers-authentication-local"
import hooks from "feathers-hooks-common"

import user from "../models/user"
import {isRole} from "../core/hooks"

import {USER} from "../constants/api"

const ALL_USERS = "teacher"

export default function users() {
  this.use(USER, new Service({
    Model: user,
    paginate: {
      default: 25,
      max: 25
    }
  }))

  this.service(USER).before({
    all: [],
    find: [isRole(ALL_USERS)],
    get: [isRole(ALL_USERS)],
    create: [isRole(ALL_USERS), local.hooks.hashPassword()],
    update: [isRole(ALL_USERS), local.hooks.hashPassword()],
    patch: [isRole(ALL_USERS), local.hooks.hashPassword()]
  })

  this.service(USER).after({
    all: [hooks.remove("password", "salt")],
    patch: [hooks.setUpdatedAt("updatedAt")],
    update: [hooks.setUpdatedAt("updatedAt")],
    create: [
      hooks.setCreatedAt("createdAt"),
      hooks.remove("hasRegistered", "hasBeenApproved", "roles", "metadata")
    ]
  })
}
