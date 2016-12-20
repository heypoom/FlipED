import configureStore from "../store/configureStore"

import {appSettings} from "../actions/runtime"
import {services} from "../constants/api"

const initialStore = (initialState = {}) => {
  const store = configureStore(initialState)

  let prevState = initialState.chat.info

  console.log("SSR_INFO", {
    initInfo: initialState.chat.info,
    stateInfo: store.getState().chat.info,
    equals: initialState === store.getState()
  })

  store.dispatch(appSettings({
    params: "storage"
  }))

  store.subscribe(() => {
    if (store.getState().chat.info !== prevState) {
      console.log("INFO_STATE_MUTATED", store.getState().chat.info)
      prevState = store.getState().chat.info
      if (store.getState().user.hasOwnProperty("_id")) {
        console.log("INFO_STATE_PATCHED", store.getState().chat.info)
        store.dispatch(services.user.patch(store.getState().user._id, {
          state: store.getState().chat.info
        }))
      }
    }
  })

  return store
}

export default initialStore
