import {
  WAITING_TIME_BASE, WAITING_TIME_MULTIPLIER, TYPING_TIME
} from "../constants"

import {
  SET, UNSET, INCREMENT, DECREMENT, NOTIFY,
  CLEAR_NOTIFY, PLAY_AUDIO, STOP_AUDIO, ADD_CHAT,
  RELOAD, SET_CHOICE, TOGGLE_CHOICE,
  TOGGLE_TYPING, LOAD_PATH
} from "../constants/chat"

import {app} from "../constants/api"

export const set = keyValue => ({
  type: SET,
  payload: keyValue
})

export const unset = key => ({
  type: UNSET,
  payload: key
})

export const increment = (key, by) => ({
  type: INCREMENT,
  payload: {key, by}
})

export const decrement = (key, by) => ({
  type: DECREMENT,
  payload: {key, by}
})

export const notify = text => ({
  type: NOTIFY,
  payload: text
})

export const clearNotify = () => ({
  type: CLEAR_NOTIFY
})

export const notifyTimed = (text, time) => dispatch => {
  dispatch(notify(text))
  setTimeout(() => dispatch(clearNotify()), time)
}

export const playAudio = (url, id) => ({
  type: PLAY_AUDIO,
  payload: {url, id}
})

export const stopAudio = id => ({
  type: STOP_AUDIO,
  payload: id
})

export const setChoice = choices => ({
  type: SET_CHOICE,
  payload: choices
})

export const toggleChoice = state => ({
  type: TOGGLE_CHOICE,
  payload: state
})

export const parseCondition = condition => {
  if (Object.keys(condition)[0] === "and") {
    let fail = false
    condition.and.forEach(item => {
      if (Object.keys(item)[0] === "is") {
        if (!state[item.is])
          fail = true
      } else if (Object.keys(item)[0] === "not") {
        if (state[item.not])
          fail = true
      }
    })
    return !fail
  } else if (Object.keys(condition)[0] === "or") {
    let pass = false
    condition.or.forEach(item => {
      if (Object.keys(item)[0] === "is") {
        if (state[item.is])
          pass = true
      } else if (Object.keys(item)[0] === "not") {
        if (!state[item.not])
          pass = true
      }
    })
    return pass
  }
  return false
}

export const addChat = message => ({
  type: ADD_CHAT,
  payload: message
})

export const onTextInputChange = (event, field) => ({
  type: "TEXT_INPUT_CHANGE",
  payload: {value: event.target.value, field}
})

export const onTextInputSubmit = (field, choice, opts) => dispatch => {
  dispatch({
    type: "TEXT_INPUT_SUBMIT",
    payload: field
  })
  dispatch(handleChoiceSelection(choice, opts))
}

export const toggleTyping = (index, state) => ({
  type: TOGGLE_TYPING,
  payload: {index, state}
})

export const addWithAnim = (message, index, show) => (dispatch, getState) => {
  dispatch(toggleChoice(false))
  setTimeout(() => {
    const tIndex = getState().chat.backlog.length
    dispatch(addChat(message))
    dispatch(toggleTyping(tIndex, true))
    setTimeout(() => {
      dispatch(toggleTyping(tIndex, false))
      if (show)
        dispatch(toggleChoice(true))
      if (typeof window !== "undefined")
        window.scrollBy({behavior: "smooth", top: document.body.scrollHeight})
    }, TYPING_TIME)
  }, WAITING_TIME_BASE + (WAITING_TIME_MULTIPLIER * index))
}


/**
  * @module Reload
  * @desc Restores the state tree back to initial state.
  * @param path Initial Path
  * @param isAuth Is user authenticated
*/

export const reload = (path, isAuth, stage) => dispatch => {
  setTimeout(() => {
    dispatch({
      type: RELOAD,
      payload: {path, stage}
    })
    if (isAuth) {
      dispatch(loadPath(path))
    } else {
      dispatch(loadPath("init/unauthenticated"))
    }
  }, 100)
}

/**
  * @module servicesFind
  * @desc run Services.find()
  * @param api
  * @param query
  * @param success
  * @param parent
*/

export const servicesFind = (api, query, success, opt) => dispatch => {
  dispatch(toggleChoice(false))
  dispatch(addMessage("รอแปปนึงนะครับ~", 1))
  app.service(api).find({query: query}).then(res => {
    const choices = []
    if (res.data.length > 0) {
      res.data.forEach(e => {
        let sActions = {} // Declare actions to dispatch on success
        if (success) {
          sActions = success
          if (sActions.type === "SERVICES_FIND" && sActions.payload.query && opt.parent) {
            Object.assign(sActions.payload.query, {[opt.parent]: e._id})
          } else if (sActions.type === "SERVICES_GET") {
            Object.assign(sActions.payload, {id: e._id})
          }
        }
        choices.push({
          text: `${opt.choiceText || ""}${e.name}`,
          actions: [sActions]
        })
      })
      dispatch(addMessage(opt.loadedText || "เรียบร้อยครับ", 1))
      dispatch(setChoice(choices))
      setTimeout(() => dispatch(toggleChoice(true)), WAITING_TIME_BASE)
    } else {
      dispatch(addMessage(opt.notFoundText || "ไม่พบข้อมูลที่ท่านต้องการค้นหา ขออภัยด้วยครับ", 1))
      if (opt.notFoundPath)
        dispatch(loadPath(opt.notFoundPath))
    }
  })
}

export const servicesGet = (api, id, success, opt) => dispatch => {
  dispatch(toggleChoice(false))
  app.service(api).get(id).then(res => {
    dispatch(setChoice(success))

    // HACK: Requires Customization!
    dispatch(addMessage(`========= NAME: ${res.name} =========`, 0))
    Object.keys(res).forEach(key => dispatch(addWithAnim(
      {text: `${key}: ${JSON.stringify(res[key])}`, user: 1}
    )), i)

    setTimeout(() => {
      dispatch(toggleChoice(true))
    }, WAITING_TIME_BASE + (Object.keys(res).length * WAITING_TIME_MULTIPLIER))
  })
}

export const handleActions = actions => dispatch => {
  if (actions) {
    if (actions.constructor === Array)
      actions.forEach(action => dispatch(action))
  }
}

export const addMessages = messages => dispatch => {
  let counter = 0
  messages.forEach((message, mIndex) => {
    const show = (messages.length - 1 === mIndex)
    if (message.actions) {
      dispatch(handleActions(message.actions))
    }
    if (!message.type && message.hasOwnProperty("text")) {
      if (message.text.constructor === Array) {
        message.text.forEach((text, tIndex) => {
          // HACK: WTF TIMING ALGO
          const nShow = show && message.text.length - 1 === tIndex
          dispatch(addWithAnim({text, user: message.user}, counter + tIndex + mIndex, nShow))
          counter++
        })
      } else {
        dispatch(addWithAnim(message, mIndex, show))
      }
    } else {
      dispatch(addWithAnim(message, mIndex, show))
    }
  })
}

export const addMessage = (text, user = 1) => dispatch => {
  dispatch(addWithAnim({text, user}, 0))
}

export const handleChoiceSelection = (input, options = {}) => (dispatch, getState) => {
  console.log({input, options, state: getState()})
  const {text, path, actions, field} = getState().chat.choices
  if (field || text) {
    if (options.hide)
      dispatch(addMessage("********", 0))
    else
      dispatch(addMessage(field ? getState().chat.fields[field] : text, 0))
  }
  if (actions)
    dispatch(handleActions(actions))
  if (path)
    dispatch(loadPath(path))
}

export const execTriggers = triggers => dispatch => {
  triggers.forEach(trigger => {
    if (parseCondition(trigger.condition)) {
      if (trigger.messages) {
        dispatch(addMessages(trigger.messages))
      }
      if (trigger.actions) {
        dispatch(handleActions(trigger.actions))
      }
    }
  })
}

export const loadPath = path => (dispatch, getState) => {
  const stage = getState().chat.stage
  if (stage[path]) {
    if (stage[path].triggers)
      dispatch(execTriggers(stage[path].triggers))
    if (stage[path].messages)
      dispatch(addMessages(stage[path].messages))
    if (stage[path].actions)
      dispatch(handleActions(stage[path].actions))
    if (stage[path].choices)
      dispatch(setChoice(stage[path].choices))
    dispatch({
      type: LOAD_PATH,
      payload: {path, showChoice: !stage[path].messages}
    })
  }
}


/**
  * @module Authenticate
  * @desc retrieves data from state, then attempts to authenticate.
*/

export const authenticate = (email, password, opts = {}) => dispatch => {
  dispatch(notify("Authenticating..."))
  app.authenticate({
    type: "local",
    email: email,
    password: password
  }).then(e => {
    dispatch(notifyTimed(`Welcome Back, ${e.data.username}!`, 1500))
    dispatch(set({TEMP_EMAIL: null, TEMP_PASSWORD: null}))
    if (opts.successPath)
      dispatch(loadPath(opts.successPath))
    dispatch({type: LOGIN, payload: {user: e.data}})
  }).catch(() => {
    dispatch(notifyTimed("Authentication Error"))
    dispatch(set({TEMP_EMAIL: null, TEMP_PASSWORD: null}))
    if (opts.failurePath)
      dispatch(loadPath(opts.failurePath))
  })
}

export const login = (opts) => (dispatch, getState) => {
  const email = getState().chat[opts.emailField || "TEMP_EMAIL"]
  const password = getState().chat[opts.passwordField || "TEMP_PASSWORD"]
  dispatch(authenticate(email, password, opts))
}

export const logout = successPath => dispatch => {
  dispatch(notifyTimed("Logging Out.."))
  app.logout().then(() => {
    dispatch(notifyTimed("Logout Successful. See you later!", 1500))
    if (successPath)
      dispatch(loadPath(successPath))
  }).catch(e => {
    dispatch(notifyTimed("Error occured when trying to logout.", 1500))
    console.error(e)
  })
}
