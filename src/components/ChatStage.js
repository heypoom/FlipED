import React from "react"
import {connect} from "react-redux"

import ChatInterface from "./ChatInterface"

import {services} from "../constants/api"

const ChatStage = props => (
  <ChatInterface
    notify={props.notify}
    backlog={props.backlog}
    user={props.users}
    choices={props.choices}
    showChoice={props.showChoice}
    onChoiceSelected={props.handleChoiceSelection}
    typing={props.isTyping}
    onTextInputChange={props.onTextInputChange}
    onTextInputSubmit={props.onTextInputSubmit}
    fields={props.fields}
    exec={props.execAction}
  />
)

const mapStateToProps = state => ({
  user: state.user,
  notify: state.notify,
  backlog: state.backlog,
  choices: state.choices,
  showChoice: state.showChoice,
  isTyping: state.isTyping,
  fields: state.fields
})

const mergeProps = (state, {dispatch}, props) => ({
  ...props,
  ...state,
  onTextInputChange: (event, field) => dispatch(onTextInputChange(event, field)),
  onTextInputSubmit: (field, choice, opts) => dispatch(onTextInputSubmit(field, choice, opts)),
  handleChoiceSelection: (input, opts) => dispatch(handleChoiceSelection(input, opts)),
  setUserState: data => {
    if (state.user.hasOwnProperty("_id")) {
      dispatch(services.user.patch(state.user._id, {state: data}))
    }
  }
})

export default connect(mapStateToProps, null, mergeProps)(ChatStage)
