import hooks from "feathers-hooks"
import {hooks as auth} from "feathers-authentication"

export const before = {
  all: [
    auth.verifyToken(),
    auth.populateUser()
  ],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
}

export const after = {
  all: [hooks.remove("password")],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
}
