import React from "react"
import {Link} from "react-router"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import s from "./QuizCreator.scss"

const QuizCreator = props => (
  <div className={s.creator}>
    <p>
      Quiz Creator
    </p>
    <p>
      <Link to="/quiz/57af2356b2cf16503933f5da">
        Edit Quiz
      </Link>
    </p>
  </div>
)

export default withStyles(s)(QuizCreator)
