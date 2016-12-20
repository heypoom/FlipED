import React, {Component} from "react"

import Button from "./Button"
import QuizItem from "./QuizItem"

import {app} from "../constants/api"

import {QUIZ_API, TRACK_API} from "../constants/api"

export default class PopQuiz extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentQuiz: 0,
      score: 0,
      finished: false,
      quiz: {
        name: "",
        questions: [{
          _id: 404,
          question: "",
          choices: []
        }]
      },
    }
  }

  componentWillMount = () => {
    app.service(QUIZ_API)
    .get(this.props.id)
    .then(e => this.setState({
      quiz: e
    }))
  }

  nextQuiz = () => {
    const q = this.state.currentQuiz
    const length = this.state.quiz.questions.length
    const isInBounds = (q + 1 < length)
    this.setState({currentQuiz: isInBounds ? q + 1 : q})
    if ((q + 1) === this.state.quiz.questions.length) {
      app.service(TRACK_API).create({
        action: "POP_QUIZ_FINISHED",
        userId: app.get("user"),
        payload: {
          quizId: this.state.quiz._id,
          score: this.state.score
        }
      })
      .then(() => this.setState({finished: true}))
      .catch(e => swal("Error", e, "error"))
    }
  }

  retry = () => {
    app.service(TRACK_API).create({
      action: "POP_QUIZ_RETRY",
      userId: app.get("user"),
      payload: {
        quizId: this.state.quiz._id
      }
    })
    this.setState({score: 0, finished: false, currentQuiz: 0})
  }

  render = () => (
    <div>
      {
        this.state.finished ? (
          <div>
            <div style={{textAlign: "center"}}>
              <p style={{margin: "0em", fontSize: "2em"}}>
                Pop Quiz Fin-ished!
              </p>
              <p style={{margin: "0em", fontSize: "1.2em"}}>
                Your Score: {this.state.score}
              </p>
            </div>
            <Button
              onClick={this.retry}
              style={{marginTop: "1em", background: "white", color: "black"}}
            >
              Retry?
            </Button>
          </div>
        ) : (
          <QuizItem
            data={this.state.quiz}
            addScore={() => this.setState({score: this.state.score + 1})}
            currentQuiz={this.state.currentQuiz}
            next={this.nextQuiz}
          />
        )
      }
    </div>
  )

}
