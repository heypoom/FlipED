import {ROLE} from "../constants/roles"

/**
  @func Authorization Helpers
  @desc Compares roles to determine if the user has enough permission
*/

export const isRole = (is, current) => ROLE[current].perm >= ROLE[is].perm
export const lessRole = (less, current) => ROLE[current].perm < ROLE[less].perm

/**
  @func isPermitted
  @desc Determines if user is authorized based on their role
  @param role: User's current role
  @param is: More than or equal comparison
  @param only: Exact match comparison
  @param less: Less than or equal comparison
*/

export const isPermitted = ({role, is, only, less, none = false}) => {
  if (!role) {
    return none
  } else if (is) {
    return isRole(is, role)
  } else if (role === only) {
    return true
  } else if (less) {
    return lessRole(less, role)
  }
  return false
}

/**
  * @func createReducer
  * @desc Creates a reducer
  * @param initialState
  * @param handlers: handling function which returns an object
  * @example state => ({ SET_NAME: name => ({...state, name}) })
**/

export const createReducer = (initialState, handlers) => (
  (state = initialState, action) => (
    handlers(state)[action.type] ?
      handlers(state)[action.type](action.payload) : state
  )
)

/**
  * @func makeAction
  * @desc Creates an action creator.
  *       Will also put each arguments into the payload, if any.
  * @param type: action type
  * @param ...argNames: action argument names
**/

export const makeAction = (type, ...argNames) => {
  if (argNames.length > 0) {
    return (...args) => {
      const payload = {}
      argNames.forEach((arg, index) => {
        payload[argNames[index]] = args[index]
      })
      return {type, payload}
    }
  }
  return payload => (payload ? ({type, payload}) : ({type}))
}

/**
  * @func getIDfromURL
  * @desc Parses URL and retrieves id
  * @param url
  * @param prefix: RESTful prefix
**/

export const getIDfromURL = (url, prefix) => {
  const mRoute = url.replace(prefix, "") // Remove URL Prefix
  const slashPos = mRoute.indexOf("/") // Slash Position
  return slashPos > -1 ? mRoute.substring(0, slashPos) : mRoute
}

/**
  * @func isRoute
  * @desc Determines if user is in a specific route
  * @param url
  * @param prefix
**/

export const isRoute = (url, prefix) => (url.indexOf(prefix) > -1)

/**
  * @func parseText
  * @desc Replaces variables into value from state
  * @param text
  * @param state
**/

export const parseText = (text, state) => {
  let newText = text
  if (newText) {
    if (newText.indexOf("%") > -1) {
      const ParseRegex = new RegExp(/%(.*?)%/g)
      while (newText) {
        const val = ParseRegex.exec(text)
        if (val) {
          if (state.hasOwnProperty(val[1])) {
            newText = newText.replace(val[0], state[val[1]])
          } else {
            newText = newText.replace(val[0], "")
          }
        } else {
          return newText
        }
      }
    }
    return newText
  }
  return null
}

/**
  * @func parseCondition
  * @desc Parse conditions in trigger
  * @param condition
  * @param state
*/

const is = (key, obj) => Object.keys(obj)[0] === key
const match = (cond, item, state, neg) => (
  is(cond, item) &&
  neg ? !state[item[cond]] : state[item[cond]]
)

export const parseCondition = (cond, state = {}) => {
  if (is("and", cond)) {
    let fail = false
    cond.and.forEach(item => {
      if (match("is", item, state, true) || match("not", item, state))
        fail = true
    })
    return !fail
  } else if (is("or", cond)) {
    let pass = false
    cond.or.forEach(item => {
      if (match("is", item, state) || match("not", item, state, true))
        pass = true
    })
    return pass
  }
  return false
}

/**
  @func restoreScrollPosition
  @desc Restore Scroll Position based on state
  @param state
*/

export const restoreScrollPosition = state => {
  if (state && state.scrollY !== undefined) {
    setTimeout(() => {
      window.scrollTo(state.scrollX, state.scrollY)
    }, 40)
  } else {
    window.scrollTo(0, 0)
  }
}
