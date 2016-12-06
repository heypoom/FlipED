import React from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"
import c from "classnames"

import s from "./ChatInterface.scss"

const ChatInterface = props => (
  <div className={c(s.chat, s.chatAvatarEnabled)}>
    <ol className={s.chatList}>
      {
        props.backlog.map((chat, index) => {
          const user = props.user[chat.user]
          const client = user.client // Is user
          const iCF = (!client && chat.showAvatar)
          if (props.typing[index]) {
            console.log("STATE_TYPING_ON", index)
          }
          return (
            <li key={index} className={c(s.chatListItem, iCF && s.chatListItemNew)}>
              {iCF && (
                <div>
                  <img className={s.chatAvatar} src={user.avatar} alt={user.name} />
                  <span className={s.chatListItemAuthor}>{user.name}</span>
                </div>
              )}
              <div
                onClick={() => props.setTyping(index)}
                className={c(
                  s.chatBubble,
                  client && s.chatBubbleResponse,
                  (props.typing[index] && !client) && s.chatBubbleTyping,
                  s.chatBubbleFade,
                  s.chatBubbleSlideIn
                )}
              >
                <span dangerouslySetInnerHTML={{__html: `<b>${index}</b> (${1300 * index}s) ${chat.text}`}} />
              </div>
            </li>
          )
        })
      }
    </ol>
    <div className={s.chatResponses}>
      {
        props.choices.map((choice, i) => (
          <div
            key={i}
            className={c(s.chatBubble, s.chatBubbleResponse)}
            dangerouslySetInnerHTML={{__html: choice}}
            onClick={() => props.onChoiceSelected(i)}
          />
        ))
      }
    </div>
  </div>
)

export default withStyles(s)(ChatInterface)
