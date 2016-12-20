import {createReducer} from "../core/helper"

export default createReducer({}, state => ({
  SET_CLASS: payload => ({...state, data: payload}),
  SET_CLASS_LIST: payload => ({...state, list: payload}),
  SEARCH_CLASS: ({classSearch}) => ({...state, list: classSearch})
}))
