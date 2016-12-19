export const getIDfromURL = (url, prefix) => {
  const mRoute = url.replace(prefix, "") // Remove URL Prefix
  const slashPos = mRoute.indexOf("/") // Slash Position
  // If slash exist, remove everything after that
  // console.info("getIDfromURL", mRoute, slashPos, (slashPos > -1 ?
  //   mRoute.substring(0, slashPos) : mRoute), url, prefix)
  return slashPos > -1 ? mRoute.substring(0, slashPos) : mRoute
}

export const isRoute = (url, prefix) => (url.indexOf(prefix) > -1)

export const createReducer = (initialState, handlers) => (state = initialState, action) => (
  handlers.hasOwnProperty(action.type) ? handlers(state)[action.type](action.payload) : state
)

/**
  * @func makeActionCreator
  * @desc Creates an action creator
  * @param type: action type
  * @param ...argNames: action argument names
**/

export const makeActionCreator = (type, ...argNames) => {
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
