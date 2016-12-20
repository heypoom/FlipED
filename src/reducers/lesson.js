import {app} from "../constants/api"

export default (state = {}, action) => {
  switch (action.type) {
    case "SET_LESSON":
      return {
        ...state,
        data: action.payload
      }
    case "SET_LESSON_LIST":
      return {
        ...state,
        list: action.payload
      }
    default:
      return state
  }
}
