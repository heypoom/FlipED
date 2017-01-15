import {createReducer} from "../core/helper"

const INITIAL = {
  classes: {
    sort: 1,
    filter: "name",
    value: ""
  },
  users: {
    sort: 1,
    filter: "username",
    value: ""
  },
  lessons: {
    sort: 1,
    filter: "name",
    value: ""
  }
}

export default createReducer(INITIAL, state => ({
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
