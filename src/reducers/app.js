import {createReducer} from "../core/helper"

export default createReducer({fields: {}}, state => ({
  SET_FIELD: ({field, value}) => ({
    ...state,
    fields: {
      ...state.fields,
      [field]: value
    }
  })
}))
