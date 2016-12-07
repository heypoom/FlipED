import React, {Component} from "react"
import {connect} from "react-redux"

import ChatInterface from "./ChatInterface"

const WAITING_TIME = 1300
const TYPING_TIME = 350

class ChatStage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      path: Object.keys(props.stage)[0],
      backlog: [],
      isTyping: {},
      gameState: {}
    }
  }

  componentDidMount = () => {
    this.setState({gameState: JSON.parse(localStorage.getItem("gameState"))})
    this.addMessages(this.props.stage[this.state.path].messages)
  }

  handleChoiceSelection = i => {
    const {text, path, actions} = this.props.stage[this.state.path].choices[i]
    this.addChat({text, user: 0})
    if (actions) {
      this.handleAction(actions)
    }
    if (typeof this.props.stage[path] !== "undefined") {
      this.setState({path})
      if (this.props.stage[path].triggers) {
        this.execTriggers(this.props.stage[path].triggers)
      }
      if (this.props.stage[path].messages) {
        this.addMessages(this.props.stage[path].messages)
      }
      if (this.props.stage[path].actions) {
        this.handleAction(this.props.stage[path].actions)
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
          this.handleAction(trigger.actions)
        }
      }
    })
  }

  addMessages = messages => {
    let counter = 0
    messages.forEach(message => {
      if (message.actions) {
        this.handleAction(message.actions)
      }
      if (!message.type && message.hasOwnProperty("text")) {
        if (message.text.constructor === Array) {
          message.text.forEach(text => {
            this.addWithAnim({
              text,
              user: message.user
            }, counter)
            counter++
          })
        } else {
          this.addWithAnim(message)
        }
      } else {
        this.addWithAnim(message)
      }
    })
  }

  handleAction = actions => {
    if (actions) {
      if (actions.constructor === Array) {
        actions.forEach(({type, payload}) => {
          const gameState = this.state.gameState
          switch (type) {
            case "SET":
              Object.assign(gameState, payload)
              break
            case "INCREMENT":
              if (gameState[payload.key])
                gameState[payload.key] += payload.by
              else
                gameState[payload.key] = payload.by
              break
            case "DECREMENT":
              if (gameState[payload.key])
                gameState[payload.key] -= payload.by
              else
                gameState[payload.key] = payload.by
              break
            case "DISPATCH":
              this.props.dispatch(payload)
              break
            default:
              break
          }
          this.setState({gameState})
          localStorage.setItem("gameState", JSON.stringify(this.state.gameState))
          console.log("GAME_STATE", this.state.gameState)
        })
      }
    }
  }

  addChat = message => {
    const backlog = this.state.backlog
    message.text = this.parseText(message.text)
    const showAvatar = message.user !== (typeof backlog[backlog.length - 1]
      !== "undefined" && backlog[backlog.length - 1].user)
    backlog.push(Object.assign({}, message, {showAvatar}))
    this.setState({backlog})
  }

  parseText = text => {
    if (text) {
      if (text.indexOf("%") > -1) {
        const ParseRegex = new RegExp(/%(.*?)%/g)
        while (true) {
          const val = ParseRegex.exec(text)
          if (val)
            text = text.replace(val[0], this.state.gameState.hasOwnProperty(val[1])
              ? this.state.gameState[val[1]] : " ")
          else
            return text
        }
      }
      return text
    }
    return null
  }

  toggleTyping = (index, state) => this.setState({
    isTyping: Object.assign({}, this.state.isTyping, {
      [index]: state || !this.state.isTyping[index]
    })
  })

  addWithAnim = (message, index) => {
    setTimeout(() => {
      const tIndex = this.state.backlog.length
      this.addChat(message)
      this.toggleTyping(tIndex)
      setTimeout(() => {
        this.toggleTyping(tIndex)
      }, WAITING_TIME + TYPING_TIME)
      scrollBy({
        behavior: "smooth",
        top: document.body.scrollHeight
      })
    }, WAITING_TIME * index)
  }

  render = () => (
    <ChatInterface
      backlog={this.state.backlog}
      user={this.props.users}
      choices={this.props.stage[this.state.path].choices}
      onChoiceSelected={this.handleChoiceSelection}
      typing={this.state.isTyping}
    />
  )

}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  dispatch: action => dispatch(action)
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatStage)
