import React from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"
import c from "classnames"

import s from "./ChatInterface.scss"

const _ChatContent = ({src}) => {
  if (!src.type && src.text) {
    return <span dangerouslySetInnerHTML={{__html: src.text}} />
  } else if (src.type === "image") {
    return (
      <div>
        <span>{src.caption}</span>
        <img src={src.image} alt="Something" />
      </div>
    )
  }
  return null
}

const ChatContent = withStyles(s)(_ChatContent)

const ChatInterface = props => (
  <div className={c(s.chat, s.chatAvatarEnabled)}>
    <ol className={s.chatList}>
      {
        props.backlog ? props.backlog.map((chat, index) => {
          const user = props.user[chat.user]
          const client = user.client // Is user
          const iCF = (!client && chat.showAvatar)
          return (
            <li key={index} className={c(s.chatListItem, iCF && s.chatListItemNew)}>
              {iCF && (
                <div>
                  <img className={s.chatAvatar} src={user.avatar} alt={user.name} />
                  <span className={s.chatListItemAuthor}>{user.name}</span>
                </div>
              )}
              <div
                className={c(
                  s.chatBubble,
                  client && s.chatBubbleResponse,
                  (props.typing[index] && !client) && s.chatBubbleTyping,
                  (!props.typing[index]) && s.chatBubbleFade,
                  s.chatBubbleSlideIn,
                  (!props.typing[index] && chat.image) && s.chatCard,
                  (!props.typing[index] && chat.image) && s.noPadding
                )}
              >
                <ChatContent src={chat} />
              </div>
            </li>
          )
        }) : null
      }
    </ol>
    <div className={s.chatResponses}>
      {
        props.choices ? props.choices.map((choice, i) => (
          <div
            key={i}
            className={c(s.chatBubble, s.chatBubbleResponse)}
            dangerouslySetInnerHTML={{__html: choice.text}}
            onClick={() => props.onChoiceSelected(i)}
          />
        )) : null
      }
    </div>
  </div>
)

export default withStyles(s)(ChatInterface)
