import errors from "feathers-errors"

import {isRole as isPermitted} from "../constants/roles"

const ERROR_BEFORE_ONLY = "The 'isRole' hook should only be used as a 'before' hook."
const ERROR_NOT_AUTHENTICATED = "You are unauthenticated."
const ERROR_NO_ROLES = "You do not have any roles."
const ERROR_NOT_PERMITTED = "You do not have the correct permissions."

const VIEW_ROLE = "student"
const MODIFY_ROLE = "teacher"

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

export const viewRole = isRole(VIEW_ROLE)
export const modifyRole = isRole(MODIFY_ROLE)

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
