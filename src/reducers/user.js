import {createReducer} from "../core/helper"

export default createReducer({}, (state = {}) => ({
  SET_USER_INFO: user => user || state,
}))
