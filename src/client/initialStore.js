import configureStore from "../core/configureStore"
import {services} from "../constants/api"

const initialStore = (initialState = {}) => {
  const store = configureStore(initialState)

  let prevState = initialState.chat.info

  store.subscribe(() => {
    if (store.getState().chat.info !== prevState) {
      console.info("INFO_STATE_CHANGED", store.getState().chat.info)
      prevState = store.getState().chat.info
      if (store.getState().user.hasOwnProperty("_id")) {
        console.info("INFO_STATE_PATCHED", store.getState().chat.info)
        store.dispatch(services.user.patch(store.getState().user._id, {
          state: store.getState().chat.info
        }))
      }
    }
  })

  return store
}

export default initialStore
