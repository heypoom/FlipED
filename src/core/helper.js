/**
  * @func createReducer
  * @desc Creates a reducer
  * @param initialState
  * @param handlers: handling function which returns an object
  * @example state => ({ SET_NAME: name => ({...state, name}) })
**/

export const createReducer = (initialState, handlers) => (state = initialState, action) => (
  handlers(state).hasOwnProperty(action.type) ? handlers(state)[action.type](action.payload) : state
)

/**
  * @func makeAction
  * @desc Creates an action creator
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
  return payload => payload ? ({type, payload}) : ({type})
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
**/

export const isRoute = (url, prefix) => (url.indexOf(prefix) > -1)

/**
  * @func parseText
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
