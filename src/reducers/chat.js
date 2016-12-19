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

export default createReducer({}, state => ({
  [SET]: payload => ({
    ...state,
    info: Object.assign({}, state.info, payload)
  }),
  [UNSET]: payload => ({
    ...state,
    info: Object.assign({}, state.info, [payload]: null)
  }),
  [INCREMENT]: ({key, by}) => ({
    ...state,
    info: Object.assign({}, state.info, {
      [key]: state.info[key] ? state.info[key] + by : by
    })
  }),
  [DECREMENT]: ({key, by}) => ({
    ...state,
    info: Object.assign({}, state.info, {
      [key]: state.info[key] ? state.info[key] - by : by
    }),
  }),
  [NOTIFY]: notify => ({
    ...state,
    notify
  }),
  [CLEAR_NOTIFY]: () => ({
    ...state,
    notify: null
  }),
  [PLAY_AUDIO]: ({id, url}) => {
    const audioId = `AUDIO_${id}`
    if (state.audioId) {
      if (state.audioId.pause) {
        state.audioId.pause()
      }
    }
    const newAudio = new Audio(url)
    newAudio.play()
    return {
      ...state,
      [audioId]: newAudio
    }
  },
  [STOP_AUDIO]: ({id}) => {
    const audioId = `AUDIO_${id}`
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
  [RELOAD]: ({stage, path}) => ({
    info: state.info || {},
    stage: stage || state.stage,
    path: path || Object.keys(stage || state.stage)[0],
    backlog: [],
    isTyping: {},
    notify: "",
    showChoice: false
  }),
  [LOAD_PATH]: ({path, showChoice}) => ({
    ...state,
    path: path,
    showChoice: showChoice
  }),
  [SET_CHOICE]: payload => {
    if (Array.isArray(payload))
      return {
        ...state,
        choices: payload
      }
    return state
  },
  [TOGGLE_CHOICE]: payload => ({
    ...state,
    showChoice: payload || !state.showChoice
  }),
  [ADD_CHAT]: payload => {
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
  [TOGGLE_TYPING]: ({index, status}) => ({
    ...state,
    isTyping: Object.assign({}, state.isTyping, {[index]: status || !state.isTyping[index]})
  }),
  [TEXT_INPUT_CHANGE]: ({field, value}) => ({
    ...state,
    fields: Object.assign({}, state.fields, {[field]: value})
  }),
  [TEXT_INPUT_SUBMIT]: payload => ({
    ...state,
    info: Object.assign({}, state.info, {
      [payload]: !payload.endsWith("_TEMP") && state.fields[payload]
    }),
    fields: Object.assign({}, state.fields, {[payload]: state.fields[payload]})
  }),
}))
