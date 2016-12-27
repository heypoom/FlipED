import {Service} from "feathers-mongoose"
import auth from "feathers-authentication"
import local from "feathers-authentication-local"
import permissions from "feathers-permissions"
import hooks from "feathers-hooks-common"

import user from "../models/user"
import {USER} from "../constants/api"

const queryWithCurrentUser = () => hook => {
  return Promise.resolve(hook)
}

/*
permissions.hooks.setPermissions({
  permissions: [
    "users:get:id",
    "users:update:id",
    "users:patch:id"
  ]
})
*/

export default function users() {
  this.use(USER, new Service({
    Model: user,
    paginate: {
      default: 5,
      max: 25
    }
  }))

  const modifyBefore = [
    auth.hooks.authenticate("jwt"),
    permissions.hooks.checkPermissions({
      service: "users",
      roles: ["admin", "teacher"]
    }),
    permissions.hooks.isPermitted(),
    local.hooks.hashPassword()
  ]

  this.service(USER).before({
    all: [],
    find: [
      // auth.hooks.authenticate("jwt"),
      // permissions.hooks.checkPermissions({service: USER}),
      // permissions.hooks.isPermitted(),
      // queryWithCurrentUser()
    ],
    get: [
      // auth.hooks.authenticate("jwt"),
      // permissions.hooks.checkPermissions({
      //   service: USER,
      //   roles: ["teacher", "admin", "student"]
      // }),
      // permissions.hooks.isPermitted()
    ],
    create: [local.hooks.hashPassword()],
    update: modifyBefore,
    patch: modifyBefore,
  }).after({
    all: [
      // hooks.setUpdatedAt("updatedAt"),
      hooks.remove("password", "salt")
    ],
    create: [
      hooks.setCreatedAt("createdAt"),
      hooks.remove("hasRegistered", "hasBeenApproved", "roles", "metadata")
    ]
  })
}
