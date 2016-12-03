import {app} from "../constants/api"

export default (state = {}, action) => {
  switch (action.type) {
    case "SET_RUNTIME_VARIABLE":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      }
    case "APP_SETTINGS":
      return {
        ...state,
        settings: app.get(action.payload.params)
      }
    case "SET_TITLE":
      return {
        ...state,
        title: action.payload
      }
    case "SET_NAV":
      return {
        ...state,
        navState: action.payload
      }
    default:
      return state
  }
}
