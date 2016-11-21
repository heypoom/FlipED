import React, {Component} from "react"

import Button from "./Button"
import Grid from "./Grid"

export default class QuizItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      indicate: false,
      submit: ""
    }
  }

  submitAnswer = choiceText => {
    if (!this.state.indicate) {
      this.setState({indicate: true, submit: choiceText})
      setTimeout(() => {
        this.setState({indicate: false, submit: ""})
        this.props.next()
      }, 1300)
    }
    this.props.data.questions[this.props.currentQuiz].choices.forEach(e => {
      if (e.text === choiceText && e.correct)
        this.props.addScore()
    })
  }

  render = () => {
    const quiz = this.props.data.questions[this.props.currentQuiz || 0] || {}
    return (
      <div style={this.props.style}>
        {
          quiz.hasOwnProperty("question") ? (
            <div>
              <Grid r>
                <div
                  style={{
                    fontSize: "1.65em",
                    fontWeight: 300,
                    textAlign: "center",
                    margin: "auto"
                  }}
                >
                  {quiz.question}
                </div>
                <img
                  src={quiz.image}
                  style={{
                    display: quiz.image ? "block" : "none",
                    maxWidth: "100%",
                    margin: "auto",
                    marginTop: "1em",
                    width: "20%"
                  }}
                  alt="Quiz"
                />
              </Grid>
              <Grid r style={{marginTop: "1em"}}>
                {
                  quiz.choices.map((item, i) => {
                    const isCorrect = item.correct ? "#4caf50" : "#ff5722"
                    const show = this.state.submit === item.text || item.correct ?
                      "visible" : "hidden"
                    return (
                      <Grid
                        key={item._id}
                        xs={12}
                        sm={(i % 2 === 0) && (i === quiz.choices.length - 1) ? 12 : 6}
                      >
                        <Button
                          style={{
                            marginBottom: "1em",
                            visibility: this.state.indicate ? show : "visible",
                            color: this.state.indicate ? "#fefefe" : "#2d2d30",
                            background: this.state.indicate ? isCorrect : "#fefefe"
                          }}
                          onClick={() => this.submitAnswer(item.text)}
                          block
                          large
                        >
                          {item.text}
                        </Button>
                      </Grid>
                    )
                  })
                }
              </Grid>
            </div>
          ) : (
            <div>
              <h1>No Quiz.</h1>
            </div>
          )
        }
      </div>
    )
  }
}
