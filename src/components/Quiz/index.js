import React, {Component} from "react"
import {connect} from "react-redux"
import c from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Grid from "../Grid"
import Button from "../Button"

import {services} from "../../client/api"
import {setSnackbar} from "../../actions/app"

import s from "./Quiz.scss"

let shuffled = {}

/* eslint no-param-reassign: 0 */
const shuffle = (array, id) => {
  if (!shuffled[id]) {
    let currentIndex = array.length
    let temporaryValue
    let randomIndex

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      // And swap it with the current element.
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }

    shuffled[id] = array

    return array
  }
  return shuffled[id]
}

const QuizCard = withStyles(s)(({send, show, mine, q = {choices: []}}) => (
  <div className={s.card}>
    <div className={s.question}>
      {q.question}
    </div>
    <div className={s.choices}>
      <Grid r>
        {shuffle(q.choices, q._id).map((item, i) => (
          <Grid xs={12} sm={6} key={i}>
            <Button
              className={c(
                s.choice, show && s.show,
                i === mine && s.mine, item.correct && s.correct
              )}
              onClick={() => send(item.correct, i)}
              disabled={show}
            >
              {item.text}
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  </div>
))

const LoadingCard = withStyles(s)(props => (
  <div className={s.card}>
    <Button className={s.ripple} onClick={props.init}>
      <div className={s.loading}>
        <img src="/images/fdesk2.svg" role="presentation" />
        <h2>Quiz is loading, Please Wait.</h2>
        <h4>Tap anywhere to load the quiz.</h4>
      </div>
    </Button>
  </div>
))

const ReportCard = withStyles(s)(props => (
  <div className={s.card}>
    <Button className={s.ripple} onClick={props.reset}>
      <div className={s.loading}>
        <img src="/images/fdesk3.svg" role="presentation" />
        <h2>
          Your Score is {props.score}. Congratulations!
        </h2>
        <h4>
          Tap anywhere to reset.
        </h4>
      </div>
    </Button>
  </div>
))

const mapStateToProps = state => ({
  quiz: state.quizzes.data || {}
})

const mapDispatchToProps = (dispatch, props) => ({
  init: () => dispatch(services.quizzes.get(props.id)),
  gj: () => dispatch(setSnackbar("Good Job!"))
})

@withStyles(s)
@connect(mapStateToProps, mapDispatchToProps)
export default class Quiz extends Component {

  constructor(props) {
    super(props)
    this.state = {
      score: 0,
      curr: 0,
      mine: 0,
      show: false,
      done: false
    }
  }

  componentDidMount() {
    this.props.init()
  }

  next = () => {
    if (this.state.curr < this.props.quiz.questions.length - 1) {
      this.setState({curr: this.state.curr + 1})
    } else {
      this.setState({done: true})
    }
  }

  prev = () => {
    if (this.state.curr > 0)
      this.setState({curr: this.state.curr - 1})
  }

  reset = () => {
    shuffled = {}
    this.setState({score: 0, curr: 0, mine: 0, show: false, done: false})
  }

  send = (correct, i) => {
    if (correct) {
      this.props.gj()
      this.setState({score: this.state.score + 1})
    }

    this.setState({show: true, mine: i})
    setTimeout(() => {
      this.setState({show: false, mine: 0})
      this.next()
    }, 2000)
  }

  render = () => {
    if (this.props.quiz.questions) {
      if (this.state.done) {
        return <ReportCard score={this.state.score} reset={this.reset} />
      }
      return (
        <QuizCard
          q={this.props.quiz.questions[this.state.curr]}
          show={this.state.show}
          mine={this.state.mine}
          send={this.send}
        />
      )
    }
    return <LoadingCard init={this.props.init} />
  }

}
