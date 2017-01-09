import {createReducer} from "../core/helper"

export default createReducer({
  classes: {
    sort: 1,
    filter: "name",
    value: ""
  },
  users: {
    sort: 1,
    filter: "username",
    value: ""
  }
}, state => ({
  SEARCH: ({value, service}) => ({
    ...state,
    [service]: {...state[service] || {}, value}
  }),
  TOGGLE_SORT: service => ({
    ...state,
    [service]: {...state[service] || {}, sort: !state[service].sort}
  }),
  SET_FILTER: ({filter, service}) => ({
    ...state,
    [service]: {...state[service] || {}, filter}
  })
}))
