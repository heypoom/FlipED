import {createReducer} from "../core/helper"

export default createReducer({}, () => ({
  SET_USER_INFO: user => user,
}))
