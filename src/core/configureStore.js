import {createStore, applyMiddleware, compose} from "redux"
import reduxThunk from "redux-thunk"
import reduxPromiseMiddleware from "redux-promise-middleware"
import {routerMiddleware} from "connected-react-router"
import rootReducer from "../reducers/index"
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

  const store = createStore(rootReducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept("../reducers", () => {
      const nextRootReducer = require("../reducers/index").default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
