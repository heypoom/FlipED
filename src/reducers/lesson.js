import {createReducer} from "../core/helper"

export default createReducer({}, state => ({
  SET_LESSON: payload => ({...state, data: payload}),
  SET_LESSON_LIST: payload => ({...state, list: payload})
}))
