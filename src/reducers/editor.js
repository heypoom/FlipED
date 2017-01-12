import {createReducer} from "../core/helper"

/**
  @example {
    9wai09fjwaifjawij: [{
      type: 0,
      node: 1
    }]
  }
*/

export default createReducer({}, state => ({
  SET_EDITOR: ({content, index, key, value}) => {
    if (content) {
      if (Array.isArray(state[content])) {
        if (state[content][index]) {
          const temp = state[content]
          temp[index] = {...temp[index], [key]: value}
          return {...state, [content]: temp}
        }
        const temp = state[content]
        temp[index] = {[key]: value}
        return {...state, [content]: temp}
      }
      return {...state, [content]: [{[key]: value}]}
    }
    return state
  },
  LOAD_EDITOR: ({content, data}) => {
    if (content && Array.isArray(data) && typeof data[0] === "object")
      return {...state, [content]: data}
    return state
  },
  EDITOR_ADD_ELEMENT: ({content, item}) => {
    if (content) {
      return {
        ...state,
        [content]: state[content].concat(item)
      }
    }
    return state
  },
  EDITOR_REMOVE_ELEMENT: ({content, index}) => {
    if (content && index) {
      return {
        ...state,
        [content]: [
          ...state[content].slice(0, index),
          ...state[content].slice(index + 1, state[content].length)
        ]
      }
    }
    return state
  }
}))
