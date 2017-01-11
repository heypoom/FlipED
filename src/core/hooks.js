import errors from "feathers-errors"

import {isRole as isPermitted} from "../core/helper"
import {VIEW_ROLE, MODIFY_ROLE} from "../constants/roles"

/**
  * @module Authorization Hooks
  * @func isRole
  * @desc Checks if user has sufficient permissions to authorize access
  * @param is: The minimal role required to authorize access
*/

const ERROR_BEFORE_ONLY = "The 'isRole' hook should only be used as a 'before' hook."
const ERROR_NOT_AUTHENTICATED = "You are unauthenticated."
const ERROR_NO_ROLES = "You do not have any roles."
const ERROR_NOT_PERMITTED = "You do not have the correct permissions."

export const isRole = is => hook => {
  if (hook.type !== "before")
    return Promise.reject(new Error(ERROR_BEFORE_ONLY))

  // Bypass internal feathers calls
  if (hook.params.provider) {
    if (!hook.params.authenticated || !hook.params.user)
      return Promise.reject(new errors.Forbidden(ERROR_NOT_AUTHENTICATED))

    if (!hook.params.user.roles)
      return Promise.reject(new errors.Forbidden(ERROR_NO_ROLES))

    if (!isPermitted(is, hook.params.user.roles))
      return Promise.reject(new errors.Forbidden(ERROR_NOT_PERMITTED))
  }

  return Promise.resolve(hook)
}

/**
  * @example Standard Permissions
  * @desc Groups of Before Hooks to Authorize users
*/

export const standardPerms = {
  all: [],
  find: [isRole(VIEW_ROLE)],
  get: [isRole(VIEW_ROLE)],
  create: [isRole(MODIFY_ROLE)],
  remove: [isRole(MODIFY_ROLE)],
  update: [isRole(MODIFY_ROLE)],
  patch: [isRole(MODIFY_ROLE)]
}

/**
  @func logger
  @desc Debug hooks; will log all information gathered from the client
*/

export const logger = () => hook => {
  if (hook.params.provider) {
    console.log("TIMESTAMP", hook.params.handshake.time)
    console.log("IP", hook.params.handshake.address)
    console.log("PROVIDER", hook.params.provider)
    console.log("PAYLOAD", hook.params.payload)
    console.log("HEADERS", hook.params.headers)
    console.log("QUERY", hook.params.query)

    if (hook.params.authenticated) {
      console.log("USER", hook.params.user)
      console.log("ACCESS_TOKEN", hook.params.accessToken)
      console.log("AUTHENTICATED", hook.params.authenticated)
    }
  } else if (hook.params.query) {
    console.log("INTERNAL_REQUEST", hook.params.query)
  }

  return Promise.resolve(hook)
}
