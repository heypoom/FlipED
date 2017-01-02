import React, {Component} from "react"
import KeyHandler from "react-key-handler"

import app from "../client/api"

import {Link} from "react-router"
import Fab from "../components/Fab"
import QuizItem from "../components/QuizItem"
import Background from "../components/Background"
import Button from "../components/Button"
import Grid from "../components/Grid"
import Icon from "../components/Icon"
import Toolbar from "../components/Toolbar"

import {QUIZ, QUIZ_URL} from "../constants/api"
import {PRIMARY_COLOR} from "../constants/visual"

export default class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentQuiz: 0,
      quiz: {
        name: "",
        questions: [{
          _id: 404,
          question: "",
          choices: []
        }],
      },
      score: 0,
      allowNav: false
    }
  }

  componentWillMount = () => {
    app.service(QUIZ)
    .get(this.props.params.id)
    .then(e => this.setState({
      quiz: e
    }))
  }

  nextQuiz = () => {
    const q = this.state.currentQuiz
    const isInBounds = (q + 1 < this.state.quiz.questions.length)
    this.setState({currentQuiz: isInBounds ? q + 1 : q})
  }

  prevQuiz = () => {
    const q = this.state.currentQuiz
    const isInBounds = (q - 1 >= 0)
    this.setState({currentQuiz: isInBounds ? q - 1 : q})
  }

  addScore = score => this.setState({score: this.state.score + score})

  render = () => (
    <div>
      <Toolbar title="คำถาม" background="#2d2d30" fixed hideTitle />
      <Background color={PRIMARY_COLOR} text="#fefefe">
        <div style={{marginTop: "10vw"}}>
          <Grid c>
            <QuizItem
              data={this.state.quiz}
              addScore={this.addScore}
              currentQuiz={this.state.currentQuiz}
              next={this.nextQuiz}
            />
          </Grid>
          <span
            style={{
              fontSize: "2.3em",
              position: "fixed",
              top: "1em",
              zIndex: 2,
              right: "1em",
              display: "none"
            }}
          >
            {this.state.score}
          </span>
          <div
            style={{
              position: "fixed",
              bottom: "0.5em",
              width: "70%",
              left: "15%",
              zIndex: 1,
              display: "none"
            }}
          >
            <Grid r>
              <Button
                width="100%"
                onClick={this.prevQuiz}
                className="col-md-6"
                large
              >
                ก่อนหน้า
              </Button>
              <Button
                width="100%"
                onClick={this.nextQuiz}
                className="col-md-6"
                large
              >
                ถัดไป
              </Button>
            </Grid>
          </div>
          <KeyHandler keyEventName="keydown" keyValue="ArrowLeft" onKeyHandle={this.prevQuiz} />
          <KeyHandler keyEventName="keydown" keyValue="ArrowRight" onKeyHandle={this.nextQuiz} />
        </div>
      </Background>
      <Link to={`${QUIZ_URL}${this.props.params.id}/edit`}>
        <Fab><Icon i="pencil" /></Fab>
      </Link>
    </div>
  )
}
