import React, {Component} from "react"
import {connect} from "react-redux"

import ChatInterface from "./ChatInterface"

import {services, reAuth, app} from "../constants/api"
import {WAITING_TIME_BASE, WAITING_TIME_MULTIPLIER, TYPING_TIME} from "../constants"

const processAction = (type, payload, state = this.state.gameState, self) => {
  switch (type) {
    case "SET":
      Object.assign(state, payload)
      break
    case "UNSET":
      Object.assign(state, [payload]: null)
      break
    case "INCREMENT":
      if (state[payload.key])
        state[payload.key] += payload.by
      else
        state[payload.key] = payload.by
      break
    case "DECREMENT":
      if (state[payload.key])
        state[payload.key] -= payload.by
      else
        state[payload.key] = payload.by
      break
    case "DISPATCH":
      self.props.dispatch(payload)
      break
    case "NOTIFY":
      self.setState({notify: payload})
      break
    case "NOTIFY_TIMED":
      self.setState({notify: payload.text})
      setTimeout(() => self.setState({notify: null}), payload.time)
      break
    case "CLEAR_NOTIFY":
      self.setState({notify: null})
      break
    case "MESSAGE":
      if (typeof payload === "object") {
        self.addWithAnim(payload, 0)
      } else if (typeof payload === "string") {
        self.addWithAnim({text: payload, user: 1}, 0)
      }
      break
    case "PLAY_AUDIO":
      if (state[`AUDIO_${payload.id}`]) {
        if (state[`AUDIO_${payload.id}`].pause) {
          self.state.gameState[`AUDIO_${payload.id}`].pause()
        }
      }
      state[`AUDIO_${payload.id}`] = new Audio(payload.url)
      state[`AUDIO_${payload.id}`].play()
      break
    case "STOP_AUDIO":
      if (self.state.gameState[`AUDIO_${payload}`]) {
        self.state.gameState[`AUDIO_${payload}`].pause()
        state[`AUDIO_${payload}`] = null
      }
      break
    case "RELOAD":
      setTimeout(() => self.reload(), 100)
      break
    case "GOTO":
      if (self.props.stage[payload])
        self.loadPath(payload)
      break
    case "SET_CHOICE":
      if (payload.constructor === Array)
        self.setState({choices: payload})
      break
    case "TOGGLE_CHOICE":
      self.setState({showChoice: payload || !self.state.showChoice})
      break
    case "AUTHENTICATE":
      self.execAction("NOTIFY", "Authenticating...")
      app.authenticate({
        type: "local",
        email: state[payload.emailField || "TEMP_EMAIL"],
        password: state[payload.passwordField || "TEMP_PASSWORD"]
      }).then(e => {
        self.execAction("NOTIFY_TIMED", {text: `Welcome Back, ${e.data.username}!`, time: 1500})
        self.execAction("SET", {TEMP_EMAIL: null, TEMP_PASSWORD: null})
        if (payload.successPath)
          self.execAction("GOTO", payload.successPath)
      }).catch(() => {
        self.execAction("NOTIFY_TIMED", {text: "Authentication Error", time: 1500})
        self.execAction("SET", {TEMP_EMAIL: null, TEMP_PASSWORD: null})
        if (payload.failurePath)
          self.execAction("GOTO", payload.failurePath)
      })
      break
    case "LOGOUT":
      self.execAction("NOTIFY", "Logging Out..")
      app.logout().then(() => {
        self.execAction("NOTIFY_TIMED", {text: "Logout Successful. See you later!", time: 1500})
        if (payload.successPath)
          self.execAction("GOTO", payload.successPath)
      }).catch(e => {
        self.execAction("NOTIFY_TIMED", {text: "Error occured when trying to logout.", time: 1500})
        console.error(e)
      })
      break
    case "SERVICES_LIST":
      self.execAction("TOGGLE_CHOICE", false)
      self.execAction("MESSAGE", {user: 1, text: payload.loadingText || "รอแปปนึงนะครับ~"})
      app.service(payload.api).find({query: payload.query}).then(res => {
        console.info("DISPATCH_SERVICES_LIST", {payload, res})
        const choices = []
        if (res.data.length > 0) {
          res.data.forEach(e => {
            let sActions = {} // Declare actions to dispatch on success
            if (payload.success) {
              sActions = payload.success
              if (sActions.type === "SERVICES_LIST" && payload.query && payload.parent) {
                // If success action is a find({[parent]})
                Object.assign(sActions.payload.query, {[payload.parent]: e._id})
              } else if (sActions.type === "SERVICES_GET") {
                // If success action is a get(id)
                Object.assign(sActions.payload, {id: e._id})
              }
            }
            choices.push({
              text: `${payload.choiceText || ""}${e.name}`,
              actions: [sActions]
            })
          })
          self.execAction("MESSAGE", {
            user: 1,
            text: payload.loadedText || "เรียบร้อยครับ เลือกห้องเรียนที่ต้องการเลย~"
          })
          self.execAction("SET_CHOICE", choices)
          setTimeout(() => self.execAction("TOGGLE_CHOICE", true), WAITING_TIME_BASE)
        } else {
          self.execAction("MESSAGE", {
            text: payload.notFoundText || "ไม่พบข้อมูลที่ท่านต้องการค้นหา ขออภัยด้วยครับ",
            user: 1
          })
          if (payload.notFoundPath)
            self.execAction("GOTO", payload.notFoundPath)
        }
        console.log("SERVICES_LIST_SET_CHOICE", {payload, res, choices})
      })
      break
    case "SERVICES_GET":
      self.execAction("TOGGLE_CHOICE", false)
      app.service(payload.api).get(payload.id).then(res => {
        self.execAction("SET_CHOICE", payload.successChoices)
        self.addWithAnim({text: `========= NAME: ${res.name} =========`, user: 1}, 0)
        Object.keys(res).forEach((key, i) => self.addWithAnim({
          text: `${key}: ${JSON.stringify(res[key])}`, user: 1
        }, i))
        setTimeout(() => {
          // self.execAction("MESSAGE", {user: 1, type: "custom", payload: "GET_CLASS"})
          self.execAction("TOGGLE_CHOICE", true)
        }, WAITING_TIME_BASE + (Object.keys(res).length * WAITING_TIME_MULTIPLIER))
      })
      break
    default:
      break
  }
  return state
}

class ChatStage extends Component {

  constructor(props) {
    super(props)
    const initGameState = props.user.hasOwnProperty("state") ? props.user.state : {}
    this.state = {
      path: Object.keys(props.stage)[0],
      backlog: [],
      isTyping: {},
      gameState: initGameState,
      fields: {},
      notify: "",
      choices: props.stage[Object.keys(props.stage)[0]].choices,
      showChoice: false
    }
  }

  componentDidMount = () => {
    reAuth()
    this.reload()
  }

  onTextInputChange = (e, field) => {
    this.setState({fields: Object.assign(this.state.fields, {
      [field]: e.target.value
    })})
  }

  onTextInputSubmit = (field, choice, options) => {
    this.setState({gameState: Object.assign(this.state.gameState, {
      [field]: this.state.fields[field]
    })})
    this.saveState()
    this.handleChoiceSelection(choice, options)
  }

  saveState = (state = this.state.gameState, field = "gameState") => {
    if (this.props.user.hasOwnProperty("_id")) {
      if (this.props.user.hasOwnProperty("state"))
        this.props.setUserState(state)
      else
        console.warn("No State To Save.")
    } else {
      console.warn("Unauthenticated.")
      localStorage.setItem(field, JSON.stringify(state))
    }
  }

  loadState = (field = "gameState") => {
    if (this.props.user.hasOwnProperty("_id")) {
      if (this.props.user.hasOwnProperty("state"))
        this.setState({[field]: this.props.user.state})
      else
        console.warn("No State To Load.")
    } else {
      console.warn("Unauthenticated.")
      if (JSON.parse(localStorage.getItem(field))) {
        this.setState({[field]: JSON.parse(localStorage.getItem(field))})
      }
    }
  }

  reload = (props = this.props) => {
    this.setState({
      path: Object.keys(props.stage)[0],
      backlog: [],
      isTyping: {},
      gameState: {},
      notify: "",
      showChoice: false
    })
    this.loadState()
    if (this.props.user.hasOwnProperty("_id")) {
      this.loadPath(Object.keys(props.stage)[0])
    } else {
      this.loadPath("init/unauthenticated")
    }
  }

  handleChoiceSelection = (i, options = {}) => {
    const {text, path, actions, field} = this.state.choices[i]
    if (field || text) {
      if (options.hide)
        this.addChat({text: "********", user: 0})
      else
        this.addChat({text: field ? this.state.fields[field] : text, user: 0})
    }
    if (actions)
      this.handleActions(actions)
    if (path)
      this.loadPath(path)
  }

  loadPath = path => {
    if (typeof this.props.stage[path] !== "undefined") {
      this.setState({path, choices: this.props.stage[path].choices})
      if (this.props.stage[path].triggers) {
        this.execTriggers(this.props.stage[path].triggers)
      }
      if (this.props.stage[path].messages) {
        this.setState({showChoice: false})
        this.addMessages(this.props.stage[path].messages)
      }
      if (this.props.stage[path].actions) {
        this.handleActions(this.props.stage[path].actions)
      }
    }
  }

  parseCondition = condition => {
    if (Object.keys(condition)[0] === "and") {
      let fail = false
      condition.and.forEach(item => {
        if (Object.keys(item)[0] === "is") {
          if (!this.state.gameState[item.is])
            fail = true
        } else if (Object.keys(item)[0] === "not") {
          if (this.state.gameState[item.not])
            fail = true
        }
      })
      return !fail
    } else if (Object.keys(condition)[0] === "or") {
      let pass = false
      condition.or.forEach(item => {
        if (Object.keys(item)[0] === "is") {
          if (this.state.gameState[item.is])
            pass = true
        } else if (Object.keys(item)[0] === "not") {
          if (!this.state.gameState[item.not])
            pass = true
        }
      })
      return pass
    }
    return false
  }

  execTriggers = triggers => {
    triggers.forEach(trigger => {
      // Parse Conditions
      if (this.parseCondition(trigger.condition)) {
        if (trigger.messages) {
          this.addMessages(trigger.messages)
        }
        if (trigger.actions) {
          this.handleActions(trigger.actions)
        }
      }
    })
  }

  addMessages = messages => {
    let counter = 0
    messages.forEach((message, mIndex) => {
      const show = (messages.length - 1 === mIndex)
      if (message.actions) {
        this.handleActions(message.actions)
      }
      if (!message.type && message.hasOwnProperty("text")) {
        if (message.text.constructor === Array) {
          message.text.forEach((text, tIndex) => {
            // HACK: WTF TIMING ALGO
            const nShow = show && message.text.length - 1 === tIndex
            this.addWithAnim({text, user: message.user}, counter + tIndex + mIndex, nShow)
            counter++
          })
        } else {
          this.addWithAnim(message, mIndex, show)
        }
      } else {
        this.addWithAnim(message, mIndex, show)
      }
    })
  }

  handleActions = actions => {
    if (actions) {
      if (actions.constructor === Array)
        actions.forEach(({type, payload}) => this.execAction(type, payload))
    }
  }

  execAction = (type, payload) => {
    this.setState({state: processAction(type, payload, this.state.gameState, this)})
    this.saveState()
  }

  addChat = message => {
    const backlog = this.state.backlog
    const showAvatar = message.user !== (typeof backlog[backlog.length - 1]
      !== "undefined" && backlog[backlog.length - 1].user)
    backlog.push(Object.assign({}, message, {showAvatar, text: this.parseText(message.text)}))
    this.setState({backlog})
  }

  parseText = text => {
    let newText = text
    if (newText) {
      if (newText.indexOf("%") > -1) {
        const ParseRegex = new RegExp(/%(.*?)%/g)
        while (newText) {
          const val = ParseRegex.exec(text)
          if (val) {
            if (this.state.gameState.hasOwnProperty(val[1])) {
              newText = newText.replace(val[0], this.state.gameState[val[1]])
            } else if (val[1].indexOf("g:") === 0 && val[1].substring(2)) {
              try {
                newText = newText.replace(val[0], val[1].substring(2).split(".")
                  .reduce((obj, property) => obj[property], this))
              } catch (e) {
                newText = newText.replace(val[0], "")
              }
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

  toggleTyping = (index, state) => this.setState({
    isTyping: Object.assign({}, this.state.isTyping, {
      [index]: state || !this.state.isTyping[index]
    })
  })

  addWithAnim = (message, index, show) => {
    this.setState({showChoice: false})
    setTimeout(() => {
      const tIndex = this.state.backlog.length
      this.addChat(message)
      this.toggleTyping(tIndex, true)
      setTimeout(() => {
        this.toggleTyping(tIndex, false)
        if (show)
          this.setState({showChoice: true})
        scrollBy({
          behavior: "smooth",
          top: document.body.scrollHeight
        })
      }, TYPING_TIME)
    }, WAITING_TIME_BASE + (WAITING_TIME_MULTIPLIER * index))
  }

  render = () => (
    <ChatInterface
      notify={this.state.notify}
      backlog={this.state.backlog}
      user={this.props.users}
      choices={this.state.choices}
      showChoice={this.state.showChoice}
      onChoiceSelected={this.handleChoiceSelection}
      typing={this.state.isTyping}
      onTextInputChange={this.onTextInputChange}
      onTextInputSubmit={this.onTextInputSubmit}
      fields={this.state.fields}
      exec={this.execAction}
    />
  )

}

const mapStateToProps = state => ({
  user: state.user
})

const mergeProps = (state, {dispatch}, props) => ({
  ...props,
  ...state,
  setUserState: data => {
    if (state.user.hasOwnProperty("_id")) {
      dispatch(services.user.patch(state.user._id, {state: data}))
    }
  }
})

export default connect(mapStateToProps, null, mergeProps)(ChatStage)
