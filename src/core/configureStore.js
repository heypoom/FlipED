import {createStore, applyMiddleware, compose} from "redux"
import reduxThunk from "redux-thunk"
import reduxPromiseMiddleware from "redux-promise-middleware"
import {routerMiddleware} from "connected-react-router"
import reducer from "../reducers"
import history from "./history"

import {IS_DEV, IS_CLIENT} from "../constants/util"

export default initialState => {
  const middleware = applyMiddleware(
    reduxPromiseMiddleware(),
    reduxThunk,
    routerMiddleware(history)
  )

  const enhancer = (IS_CLIENT && IS_DEV) ? compose(
    middleware,
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ) : middleware

  const store = createStore(reducer, initialState, enhancer)

  if (module.hot) {
    /* eslint global-require: 0 */
    console.log("REPLACE_REDUCER_INVOKED", {
      store,
      hot: module.hot,
      status: module.hot.status(),
      reducers: require("../reducers").default,
    })
    module.hot.accept(() => {
      const nextRootReducer = require("../reducers").default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
