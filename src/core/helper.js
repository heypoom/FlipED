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

export const isRoute = (url, prefix) => (url.indexOf(prefix) > -1)
