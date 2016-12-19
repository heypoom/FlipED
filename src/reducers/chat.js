import {
  SET, UNSET, INCREMENT, DECREMENT, NOTIFY, CLEAR_NOTIFY,
  PLAY_AUDIO, STOP_AUDIO, RELOAD, SET_CHOICE, TOGGLE_CHOICE,
  ADD_CHAT, TOGGLE_TYPING, LOAD_PATH, TEXT_INPUT_SUBMIT, TEXT_INPUT_CHANGE
} from "../constants/chat"

import {createReducer} from "../core/helper"

export const parseText = (text, state) => {
  let newText = text
  if (newText) {
    if (newText.indexOf("%") > -1) {
      const ParseRegex = new RegExp(/%(.*?)%/g)
      while (newText) {
        const val = ParseRegex.exec(text)
        if (val) {
          if (state.hasOwnProperty(val[1])) {
            newText = newText.replace(val[0], state[val[1]])
          } else {
            newText = newText.replace(val[0], "")
          }
        } else {
          return newText
        }
      }
    }
    return newText
  }
  return null
}

export default createReducer({}, {
  [SET]: (state, {payload}) => ({
    ...state,
    info: Object.assign({}, state.info, payload)
  }),
  [UNSET]: (state, {payload}) => ({
    ...state,
    info: Object.assign({}, state.info, [payload]: null)
  }),
  [INCREMENT]: (state, {payload}) => ({
    ...state,
    info: Object.assign({}, state.info, {
      [payload.key]: state.info[payload.key] ?
        state.info[payload.key] + payload.by : payload.by
    })
  }),
  [DECREMENT]: (state, {payload}) => ({
    ...state,
    info: Object.assign({}, state.info, {
      [payload.key]: state.info[payload.key] ?
        state.info[payload.key] - payload.by : payload.by
    }),
  }),
  [NOTIFY]: (state, {payload}) => ({
    ...state,
    notify: payload
  }),
  [CLEAR_NOTIFY]: state => ({
    ...state,
    notify: null
  }),
  [PLAY_AUDIO]: (state, {payload}) => {
    const audioId = `AUDIO_${payload.id}`
    if (state.audioId) {
      if (state.audioId.pause) {
        state.audioId.pause()
      }
    }
    const newAudio = new Audio(payload.url)
    newAudio.play()
    return {
      ...state,
      [audioId]: newAudio
    }
  },
  [STOP_AUDIO]: (state, {payload}) => {
    const audioId = `AUDIO_${payload.id}`
    if (state.audioId) {
      if (state.audioId.pause) {
        state.audioId.pause()
      }
    }
    return {
      ...state,
      [audioId]: null
    }
  },
  [RELOAD]: (state, {payload}) => ({
    info: state.info || {},
    stage: payload.stage || state.stage,
    path: payload.path || Object.keys(payload.stage || state.stage)[0],
    backlog: [],
    isTyping: {},
    notify: "",
    showChoice: false
  }),
  [LOAD_PATH]: (state, {payload}) => ({
    ...state,
    path: payload.path,
    showChoice: payload.showChoice
  }),
  [SET_CHOICE]: (state, {payload}) => {
    if (Array.isArray(payload))
      return {
        ...state,
        choices: payload
      }
    return state
  },
  [TOGGLE_CHOICE]: (state, {payload}) => ({
    ...state,
    showChoice: payload || !state.showChoice
  }),
  [ADD_CHAT]: (state, {payload}) => {
    const lastUser = typeof state.backlog[state.backlog.length - 1] !== "undefined"
      && state.backlog[state.backlog.length - 1].user
    const message = Object.assign({}, payload, {
      showAvatar: payload.user !== lastUser,
      text: parseText(payload.text, state.info)
    })
    return {
      ...state,
      backlog: Array.concat(state.backlog, message)
    }
  },
  [TOGGLE_TYPING]: (state, {payload}) => ({
    ...state,
    isTyping: Object.assign({}, state.isTyping, {
      [payload.index]: payload.state || !state.isTyping[payload.index]
    })
  }),
  [TEXT_INPUT_CHANGE]: (state, {payload}) => ({
    ...state,
    fields: Object.assign({}, state.fields, {
      [payload.field]: payload.value
    })
  }),
  [TEXT_INPUT_SUBMIT]: (state, {payload}) => ({
    ...state,
    info: Object.assign({}, state.info, {
      [payload]: !payload.endsWith("_TEMP") && state.fields[payload]
    }),
    fields: Object.assign({}, state.fields, {[payload]: state.fields[payload]})
  }),
})
