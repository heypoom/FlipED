import configureStore from "../store/configureStore"

import {appSettings} from "../actions/runtime"

const initialStore = (initialState = {}) => {
  const store = configureStore(initialState)

  store.dispatch(appSettings({
    params: "storage"
  }))

  return store
}

export default initialStore
