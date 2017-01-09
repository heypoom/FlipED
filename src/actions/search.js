import {makeAction} from "../core/helper"
import {services} from "../client/api"

export const toggleSort = makeAction("TOGGLE_SORT")
export const setFilter = makeAction("SET_FILTER", "filter", "service")

const COURSE_SELECTOR = [
  "_id", "name", "description", "thumbnail", "owner",
  "students", "updatedAt", "createdAt"
]

const DefaultSelector = {
  classes: COURSE_SELECTOR,
  users: null
}

export const search = (value, service) => (dispatch, getState) => {
  const current = getState().search[service] || {}
  if (current) {
    const query = {
      query: {
        [current.filter]: {
          $regex: value === false ? current.value : value || "",
          $options: "ig"
        },
        $sort: {
          [current.filter]: current.sort ? 1 : -1
        },
        $select: DefaultSelector[service]
      }
    }
    dispatch(services[service].find(query))
    dispatch({
      type: "SEARCH",
      payload: {value, service}
    })
  }
}

export const sort = service => dispatch => {
  dispatch(toggleSort(service))
  dispatch(search(false, service))
}

export const filter = (value, service) => dispatch => {
  dispatch(setFilter(value, service))
  dispatch(search(false, service))
}
