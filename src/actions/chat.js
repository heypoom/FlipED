import {
  WAITING_TIME_BASE, WAITING_TIME_MULTIPLIER, TYPING_TIME
} from "../constants"

import {
  SET, UNSET, INCREMENT, DECREMENT, NOTIFY,
  CLEAR_NOTIFY, PLAY_AUDIO, STOP_AUDIO, ADD_CHAT,
  RELOAD, SET_CHOICE, TOGGLE_CHOICE,
  TOGGLE_TYPING, LOAD_PATH, NOTIFY_TIMED,
  TEXT_INPUT_SUBMIT, TEXT_INPUT_CHANGE, ADD_WITH_ANIM,
  SERVICES_FIND, SERVICES_GET, ADD_MESSAGES,
  ADD_MESSAGE, EXEC_TRIGGERS, HANDLE_CHOICE_SELECTION,
  AUTHENTICATE, LOGIN, LOGOUT, HANDLE_ACTIONS
} from "../constants/chat"

import app, {services} from "../client/api"
import {makeAction, parseCondition} from "../core/helper"
import {push} from "connected-react-router"

/* eslint no-use-before-define: 0 */

export const set = makeAction(SET)
export const unset = makeAction(UNSET)
export const increment = makeAction(INCREMENT, "key", "by")
export const decrement = makeAction(DECREMENT, "key", "by")
export const notify = makeAction(NOTIFY)
export const clearNotify = makeAction(CLEAR_NOTIFY)
export const playAudio = makeAction(PLAY_AUDIO, "url", "id")
export const stopAudio = makeAction(STOP_AUDIO)
export const setChoice = makeAction(SET_CHOICE)
export const addChat = makeAction(ADD_CHAT)
export const toggleChoice = makeAction(TOGGLE_CHOICE)
export const toggleTyping = makeAction(TOGGLE_TYPING, "index", "status")

export const notifyTimed = (text, time) => dispatch => {
  dispatch(notify(text))
  setTimeout(() => dispatch(clearNotify()), time)
}

export const onTextInputChange = (event, field) => dispatch => {
  if (field === "SEARCH_CLASS_LIST_TEMP") {
    dispatch(services.classes.find({
      query: {
        $select: ["_id", "name", "description", "thumbnail", "owner", "color"],
        name: {
          $regex: event.target.value,
          $options: "ig"
        }
      }
    }))
  }
  dispatch(({
    type: "TEXT_INPUT_CHANGE",
    payload: {value: event.target.value, field}
  }))
}

export const onTextInputSubmit = (choice, field) => dispatch => {
  dispatch({
    type: "TEXT_INPUT_SUBMIT",
    payload: field
  })
  dispatch(handleChoiceSelection(choice))
}

export const addWithAnim = (message, index, show) => (dispatch, getState) => {
  dispatch(toggleChoice(false))
  if (message.user !== 0) {
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
  } else {
    dispatch(addChat(message))
  }
}

/**
  * @func Reload
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
      console.log("Loading Path...", path)
      dispatch(loadPath(path))
    } else {
      dispatch(loadPath("init/unauthenticated"))
    }
  }, 100)
}

/**
  * @func servicesFind
  * @desc run Services.find()
  * @param api
  * @param query
  * @param success
  * @param parent
*/

export const servicesFind = (api, query, success, opts) => dispatch => {
  dispatch(toggleChoice(false))
  dispatch(addMessage("รอแปปนึงนะครับ~", 1))
  app.service(api).find({query: query}).then(res => {
    const choices = []
    if (res.data.length > 0) {
      res.data.forEach(e => {
        let sAction = {} // Declare an action to dispatch on success
        if (success) {
          sAction = success
          if (sAction.type === "SERVICES_FIND" && sAction.payload.query && opts.parent) {
            Object.assign(sAction.payload.query, {[opts.parent]: e._id})
          } else if (sAction.type === "SERVICES_GET") {
            Object.assign(sAction.payload, {id: e._id})
          }
        }
        choices.push({
          text: `${opts.choiceText || ""}${e.name}`,
          actions: [sAction]
        })
      })
      dispatch(addMessage(opts.loadedText || "เรียบร้อยครับ", 1))
      dispatch(setChoice(choices))
      setTimeout(() => dispatch(toggleChoice(true)), WAITING_TIME_BASE)
    } else {
      dispatch(addMessage(opts.notFoundText || "ไม่พบข้อมูลที่ท่านต้องการค้นหา ขออภัยด้วยครับ", 1))
      if (opts.notFoundPath)
        dispatch(loadPath(opts.notFoundPath))
    }
  })
}

/**
  * @func servicesGet
  * @desc run Services.get()
  * @param api
  * @param id
  * @param success
*/

export const servicesGet = (api, id, success) => dispatch => {
  dispatch(toggleChoice(false))
  app.service(api).get(id).then(res => {
    dispatch(setChoice(success))

    // Unfinished. Please do not touch for the time being.
    dispatch(addMessage(`========= NAME: ${res.name} =========`, 1))
    Object.keys(res).forEach((key, i) => dispatch(addMessage(
      `${key}: ${JSON.stringify(res[key])}`, 1, i
    )))

    setTimeout(() => {
      dispatch(toggleChoice(true))
    }, WAITING_TIME_BASE + (Object.keys(res).length * WAITING_TIME_MULTIPLIER))
  })
}

export const addMessages = messages => dispatch => {
  let counter = 0
  messages.forEach((message, mIndex) => {
    const show = (messages.length - 1 === mIndex)
    if (message.actions)
      dispatch(handleActions(message.actions))
    if (!message.type && Array.isArray(message.text)) {
      message.text.forEach((text, tIndex) => {
        // HACK: Bad timing algorithm. Should work fine.
        const nShow = show && message.text.length - 1 === tIndex
        dispatch(addWithAnim({text, user: message.user}, counter + tIndex + mIndex, nShow))
        counter += 1
      })
    } else {
      dispatch(addWithAnim(message, mIndex, show))
      if (message.type === "custom")
        dispatch(toggleChoice(true))
    }
  })
}

export const addMessage = (text, user = 1, index = 0) => dispatch => {
  dispatch(addWithAnim({text, user}, index))
}

export const execTriggers = triggers => (dispatch, getState) => {
  triggers.forEach(trigger => {
    if (parseCondition(trigger.condition, getState().chat.info)) {
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
  console.log("LOAD_PATH_STATE", {state: getState().chat})
  const stage = getState().chat.stage || {}
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

export const handleChoiceSelection = (input = 0) => (dispatch, getState) => {
  const {text, path, actions, field, fieldType} = getState().chat.choices[input]
  if (field || text) {
    if (fieldType === "password")
      dispatch(addMessage("********", 0))
    else
      dispatch(addMessage(field ? getState().chat.fields[field] : text, 0))
  }
  if (actions)
    dispatch(handleActions(actions))
  if (path)
    dispatch(loadPath(path))
}

/**
  * @func Authenticate
  * @desc retrieves data from state, then attempts to authenticate.
  * @param email
  * @param password
  * @param opts: authentication options
*/

export const authenticate = (email, password, opts = {}) => dispatch => {
  dispatch(notify("Authenticating..."))
  app.authenticate({
    strategy: "local",
    email: email,
    password: password
  })
  .then(response => (app.passport.verifyJWT(response.accessToken)))
  .then(payload => {
    app.set("token", payload)
    return app.service("accounts").find()
  })
  .then(user => {
    if (user) {
      dispatch(notifyTimed(`Welcome Back, ${user.username}!`, 1500))
      if (opts.successPath)
        dispatch(loadPath(opts.successPath))
    }
  })
  .catch(err => {
    dispatch(notifyTimed("Authentication Error", 1500))
    console.error("AUTH_ERR", err)
    if (opts.failurePath)
      dispatch(loadPath(opts.failurePath))
  })
}

export const login = opts => (dispatch, getState) => {
  const email = getState().chat.fields[opts.emailField || "TEMP_EMAIL"]
  const password = getState().chat.fields[opts.passwordField || "TEMP_PASSWORD"]
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

export const handleActions = actions => dispatch => {
  if (Array.isArray(actions))
    actions.forEach(({type, payload}) => {
      dispatch(mapSchemaToCreator({type, payload}))
    })
}

/**
  * @func mapSchemaToCreator
  * @desc parse action schemas and dispatches respective action creators
  * @param action
**/

export const mapSchemaToCreator = ({type, payload}) => dispatch => {
  switch (type) {
    case NOTIFY_TIMED:
      dispatch(notifyTimed(payload.text, payload.time))
      break
    case TEXT_INPUT_CHANGE:
      dispatch(onTextInputChange(payload.event, payload.field))
      break
    case TEXT_INPUT_SUBMIT:
      dispatch(onTextInputSubmit(payload.field, payload.choice, payload.opts))
      break
    case ADD_WITH_ANIM:
      dispatch(addWithAnim(payload.message, payload.index, payload.show))
      break
    case RELOAD:
      dispatch(reload(payload.path, payload.isAuth, payload.stage))
      break
    case SERVICES_FIND:
      dispatch(servicesFind(payload.api, payload.query, payload.success, payload.opts))
      break
    case SERVICES_GET:
      dispatch(servicesGet(payload.api, payload.id, payload.success, payload.opts))
      break
    case HANDLE_ACTIONS:
      dispatch(handleActions(payload))
      break
    case ADD_MESSAGES:
      dispatch(addMessages(payload))
      break
    case ADD_MESSAGE:
      dispatch(addMessage(payload.text, payload.user))
      break
    case ADD_CHAT:
      dispatch(addChat(payload))
      break
    case EXEC_TRIGGERS:
      dispatch(execTriggers(payload))
      break
    case LOAD_PATH:
      dispatch(loadPath(payload))
      break
    case HANDLE_CHOICE_SELECTION:
      dispatch(handleChoiceSelection(payload.input))
      break
    case AUTHENTICATE:
      dispatch(authenticate(payload.email, payload.password, payload.opts))
      break
    case LOGIN:
      dispatch(login({
        successPath: payload.successPath,
        failurePath: payload.failurePath,
        emailField: payload.emailField,
        passwordField: payload.passwordField
      }))
      break
    case "GOTO_URL":
      dispatch(push(payload))
      break
    case LOGOUT:
      dispatch(logout(payload))
      break
    default:
      dispatch({type, payload})
  }
}
