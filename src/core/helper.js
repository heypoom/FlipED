export const getIDfromURL = (url, prefix) => {
  const mRoute = url.replace(prefix, "") // Remove URL Prefix
  const slashPos = mRoute.indexOf("/") // Slash Position
  // If slash exist, remove everything after that
  console.info("getIDfromURL", mRoute, slashPos, (slashPos > -1 ? mRoute.substring(0, slashPos) : mRoute), url, prefix)
  return slashPos > -1 ? mRoute.substring(0, slashPos) : mRoute
}

export const isRoute = (url, prefix) => (url.indexOf(prefix) > -1)

export const createReducer = (initialState, handlers) => (state = initialState, action) => (
  handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action) : state
)
