import React from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import s from "./QuizEditor.scss"

const QuizCreator = props => (
  <div className={s.creator}>
    Quiz Creator
  </div>
)

export default withStyles(s)(QuizCreator)
