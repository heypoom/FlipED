import React from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"
import c from "classnames"

import {ChatClassList} from "../ClassList"

import s from "./ChatInterface.scss"

import {IS_CLIENT} from "../../constants/util"

const ChatBubble = withStyles(s)(({self, typing, type, children}) => (
  <div
    className={c(
      s.chatBubble,
      self && s.chatBubbleResponse,
      (typing && !self) && s.chatBubbleTyping,
      typing && s.chatBubbleFade,
      s.chatBubbleSlideIn,
      (!self && !typing && type) && s.chatCard
    )}
  >
    {children}
  </div>
))

const ChatContent = withStyles(s)(({src}) => {
  if (!src.type && src.text) {
    return <span dangerouslySetInnerHTML={{__html: src.text}} />
  } else if (src.type === "image") {
    return (
      <div>
        {src.text && <span dangerouslySetInnerHTML={{__html: src.text}} />}
        <img src={src.image} alt="Something" />
      </div>
    )
  } else if (src.type === "youtube") {
    return (
      <div className={s.ytContainer}>
        <iframe
          src={`https://www.youtube.com/embed/${src.youtube}?origin=${IS_CLIENT ? window.location.origin : ""}`}
          className={s.ytMedia}
          frameBorder="0"
          allowFullScreen
        />
      </div>
    )
  } else if (src.type === "embed") {
    return (
      <div className={s.chatEmbed}>
        <iframe src={src.src} frameBorder="0" allowFullScreen />
      </div>
    )
  }
  return null
})

const Custom = ({data, exec}) => {
  return <ChatClassList exec={exec} c={ChatBubble} />
}

const ChatInterface = props => (
  <div className={c(s.chat, s.chatAvatarEnabled)}>
    <ol className={s.chatList}>
      {props.notify && (
        <div className={s.notify} dangerouslySetInnerHTML={{__html: props.notify}} />
      )}
      <div
        style={{position: "fixed", right: "1em", top: "1em", cursor: "pointer", zIndex: 99}}
        className={c(s.chatBubble, s.chatBubbleResponse)}
        onClick={() => props.exec("RELOAD")}
      >
        Purge Backlog
      </div>
      {
        props.backlog ? props.backlog.map((chat, index) => {
          const user = props.user[chat.user]
          const iCF = (!user.client && chat.showAvatar)
          return (
            <li key={index} className={c(s.chatListItem, iCF && s.chatListItemNew)}>
              {iCF && (
                <div>
                  <img className={s.chatAvatar} src={user.avatar} alt={user.name} />
                  <span className={s.chatListItemAuthor}>{user.name}</span>
                </div>
              )}
              {chat.type === "custom" && (
                <Custom data={chat.payload} exec={props.exec} />
              )}
              {chat.type !== "custom" && (
                <ChatBubble
                  self={user.client}
                  typing={props.typing[index]}
                  type={chat.type}
                >
                  <ChatContent src={chat} />
                </ChatBubble>
              )}
            </li>
          )
        }) : null
      }
    </ol>
    <div className={s.chatResponses}>
      {
        props.choices ? props.choices.map((choice, i) => {
          if (choice.field) {
            return (
              <div key={i} className={c(s.chatBubble, s.chatBubbleResponse, s.chatResponse)}>
                <input
                  type={choice.fieldType || "text"}
                  onChange={e => props.onTextInputChange(e, choice.field)}
                  onKeyPress={e => e.key === "Enter" && props.onTextInputSubmit(choice.field, i)}
                  placeholder={choice.text}
                  value={props.fields[choice.field]}
                  className={s.chatTextInput}
                />
              </div>
            )
          }
          return (
            <div
              key={i}
              style={{visibility: props.showChoice ? "visible" : "hidden"}}
              className={c(s.chatBubble, s.chatBubbleResponse)}
              dangerouslySetInnerHTML={{__html: choice.text}}
              onClick={() => props.onChoiceSelected(i)}
            />
          )
        }) : null
      }
    </div>
  </div>
)

export default withStyles(s)(ChatInterface)
