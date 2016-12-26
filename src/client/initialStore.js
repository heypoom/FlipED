import configureStore from "../core/configureStore"
import {services} from "../client/api"

const initialStore = (initialState = {}) => {
  const store = configureStore(initialState)

  let prevState = initialState.chat.info

  // HACK: Synchronize User State with Server

  store.subscribe(() => {
    if (store.getState().chat.info !== prevState) {
      prevState = store.getState().chat.info
      if (store.getState().user.hasOwnProperty("_id")) {
        store.dispatch(services.userstate.create(store.getState().chat.info))
      }
    }
  })

  console.log("UA_CLIENT", store.getState().runtime.userAgent)
  console.log("ENV_CLIENT", process.env.NODE_ENV)

  return store
}

export default initialStore
