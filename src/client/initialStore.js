import configureStore from "../core/configureStore"
import {services} from "../client/api"

const initialStore = (initialState = {}) => {
  const store = configureStore(initialState)

  let prevState = initialState.chat.info

  store.subscribe(() => {
    if (store.getState().chat.info !== prevState) {
      console.info("INFO_STATE_CHANGED", store.getState().chat.info)
      prevState = store.getState().chat.info
      if (store.getState().user.hasOwnProperty("_id")) {
        console.info("INFO_STATE_PATCHED", store.getState().chat.info)
        store.dispatch(services.users.patch(store.getState().user._id, {
          state: store.getState().chat.info
        }))
      }
    }
  })

  console.log("UA_CLIENT", store.getState().runtime.userAgent)
  console.log("ENV_CLIENT", process.env.NODE_ENV)

  return store
}

export default initialStore
