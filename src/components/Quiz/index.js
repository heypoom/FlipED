import React, {Component} from "react"
import {connect} from "react-redux"
import c from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Grid from "../Grid"
import Button from "../Button"

import {services} from "../../client/api"

import s from "./Quiz.scss"

const QuizCard = withStyles(s)(({q = {choices: []}}) => (
  <div className={s.card}>
    <div className={s.question}>
      {q.question}
    </div>
    <div className={s.choices}>
      <Grid r>
        {q.choices.map((item, i) => (
          <Grid xs={12} sm={6} key={i}>
            <Button className={c(s.choice, item.correct && s.correct)}>
              {item.text}
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  </div>
))

const mapStateToProps = state => ({
  quiz: state.quizzes.data || {questions: []}
})

const mapDispatchToProps = (dispatch, props) => ({
  init: () => dispatch(services.quizzes.get(props.id || "57af2356b2cf16503933f5da"))
})

@withStyles(s)
@connect(mapStateToProps, mapDispatchToProps)
export default class Quiz extends Component {

  constructor(props) {
    super(props)
    this.state = {index: 0}
  }

  componentDidMount() {
    this.props.init()
  }

  render = () => (
    <div>
      <QuizCard q={this.props.quiz.questions[this.state.index]} />
    </div>
  )

}
