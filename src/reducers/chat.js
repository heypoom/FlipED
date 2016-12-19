import {
  SET, UNSET, INCREMENT, DECREMENT, NOTIFY, CLEAR_NOTIFY,
  PLAY_AUDIO, STOP_AUDIO, RELOAD, SET_CHOICE, TOGGLE_CHOICE,
  ADD_CHAT, TOGGLE_TYPING, LOAD_PATH, TEXT_INPUT_SUBMIT, TEXT_INPUT_CHANGE
} from "../constants/chat"

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

export default (state = {}, {type, payload}) => {
  switch (type) {
    case SET:
      return {
        ...state,
        info: Object.assign({}, state.info, payload)
      }
    case UNSET:
      return {
        ...state,
        info: Object.assign({}, state.info, [payload]: null)
      }
    case INCREMENT:
      return {
        ...state,
        info: Object.assign({}, state.info, {
          [payload.key]: state.info[payload.key] ?
            state.info[payload.key] + payload.by : payload.by
        })
      }
    case DECREMENT:
      return {
        ...state,
        info: Object.assign({}, state.info, {
          [payload.key]: state.info[payload.key] ?
            state.info[payload.key] - payload.by : payload.by
        })
      }
    case NOTIFY:
      return {
        ...state,
        notify: payload
      }
    case CLEAR_NOTIFY:
      return {
        ...state,
        notify: null
      }
    case PLAY_AUDIO: {
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
    }
    case STOP_AUDIO: {
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
    }
    case RELOAD:
      return {
        info: state.info || {},
        stage: payload.stage || state.stage,
        path: payload.path || Object.keys(payload.stage || state.stage)[0],
        backlog: [],
        isTyping: {},
        notify: "",
        showChoice: false
      }
    case LOAD_PATH:
      return {
        ...state,
        path: payload.path,
        showChoice: payload.showChoice
      }
    case SET_CHOICE:
      if (Array.isArray(payload))
        return {
          ...state,
          choices: payload
        }
      return state
    case TOGGLE_CHOICE:
      return {
        ...state,
        showChoice: payload || !state.showChoice
      }
    case ADD_CHAT: {
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
    }
    case TOGGLE_TYPING:
      return {
        ...state,
        isTyping: Object.assign({}, state.isTyping, {
          [payload.index]: payload.state || !state.isTyping[payload.index]
        })
      }
    case TEXT_INPUT_CHANGE:
      return {
        ...state,
        fields: Object.assign({}, state.fields, {
          [payload.field]: payload.value
        })
      }
    case TEXT_INPUT_SUBMIT:
      return {
        ...state,
        info: Object.assign({}, state.info, {
          [payload]: !payload.endsWith("_TEMP") && state.fields[payload],
        }),
        fields: Object.assign({}, state.fields, {
          [payload]: state.fields[payload]
        })
      }
    default:
      return state
  }
}
