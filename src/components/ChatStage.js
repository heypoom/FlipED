import React, {Component} from "react"
import {connect} from "react-redux"

import ChatInterface from "./ChatInterface"

import {services} from "../constants/api"
import {
  reload, onTextInputChange, onTextInputSubmit, handleChoiceSelection
} from "../actions/chat"

class ChatStage extends Component {

  componentDidMount = () => {
    this.props.reload()
  }

  render = () => (
    <ChatInterface
      notify={this.props.notify}
      backlog={this.props.backlog}
      user={this.props.users}
      choices={this.props.choices}
      showChoice={this.props.showChoice}
      onChoiceSelected={this.props.handleChoiceSelection}
      typing={this.props.isTyping}
      onTextInputChange={this.props.onTextInputChange}
      onTextInputSubmit={this.props.onTextInputSubmit}
      fields={this.props.fields}
      exec={this.props.dispatch}
    />
  )

}

const mapStateToProps = state => ({
  user: state.user,
  notify: state.chat.notify || "",
  backlog: state.chat.backlog || [],
  choices: state.chat.choices || [],
  showChoice: state.chat.showChoice,
  isTyping: state.chat.isTyping || {},
  fields: state.chat.fields || {}
})

const mergeProps = (state, {dispatch}, props) => ({
  ...props,
  ...state,
  path: state.user.hasOwnProperty("_id") ?
    Object.keys(props.stage)[0] : "init/unauthenticated",
  dispatch: (type, payload = {}) => dispatch({type, payload}),
  onTextInputChange: (event, field) => dispatch(onTextInputChange(event, field)),
  onTextInputSubmit: (field, choice, opts) => dispatch(onTextInputSubmit(field, choice, opts)),
  handleChoiceSelection: (input, opts) => dispatch(handleChoiceSelection(input, opts)),
  reload: (path = Object.keys(props.stage)[0], stage = props.stage) => {
    dispatch(reload(path, state.user.hasOwnProperty("_id"), stage))
  },
  setUserState: data => {
    if (state.user.hasOwnProperty("_id")) {
      dispatch(services.user.patch(state.user._id, {state: data}))
    }
  }
})

export default connect(mapStateToProps, null, mergeProps)(ChatStage)
