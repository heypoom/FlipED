import React, {Component} from "react"
import KeyHandler from "react-key-handler"

import app from "../client/api"

import Button from "../components/Button"
import Paper from "../components/Paper"
import Fab from "../components/Fab"
import TextField from "../components/TextField"
import Grid from "../components/Grid"
import Icon from "../components/Icon"
import Toolbar from "../components/Toolbar"

import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  SUCCESS_COLOR,
  DANGER_COLOR
} from "../constants/visual"

import {QUIZ, CLASS_URL} from "../constants/api"

export default class QuizEditor extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      data: {
        _id: "",
        name: "",
        questions: []
      },
      temp: {},
      _choiceName: "",
      _choiceCorrect: false,
      _showImage: false
    }
  }

  componentDidMount() {
    app.service(QUIZ)
    .get(this.props.params.id)
    .then(e => this.setState({data: e}))
    .catch(e => swal("Error", e, "error"))
  }

  submit = () => {
    app.service(QUIZ)
    .patch(this.state.data._id, this.state.data)
    .catch(e => swal("Error", e, "error"))
  }

  new = () => {
    const data = this.state.data
    data.questions.push({
      question: "",
      choices: [
        {text: "", correct: true},
      ]
    })
    this.setState({data: data})
  }

  update = (value, target, index) => {
    const data = this.state.data
    data.questions[index][target] = value
    this.setState({data: data})
  }

  move = (array, fromIndex, toIndex) => {
    array.splice(toIndex, 0, array.splice(fromIndex, 1)[0])
  }

  moveQuestion = (oldIndex, newIndex) => {
    const data = this.state.data
    this.move(data.questions, oldIndex, newIndex)
    this.setState({data: data})
  }

  moveChoice = (qIndex, oldIndex, newIndex) => {
    const data = this.state.data
    this.move(data.questions[qIndex].choices, oldIndex, newIndex)
    this.setState({data: data})
  }

  updateChoice = (value, target, qIndex, cIndex) => {
    const data = this.state.data
    data.questions[qIndex].choices[cIndex][target] = value
    this.setState({data: data})
  }

  removeChoice = (qIndex, cIndex) => {
    const data = this.state.data
    data.questions[qIndex].choices.splice(cIndex, 1)
    this.setState({data: data})
  }

  newChoice = (qIndex, text, isCorrect) => {
    const data = this.state.data
    data.questions[qIndex].choices.push({
      text: text,
      correct: isCorrect
    })
    this.setState({data: data, _choiceName: "", _choiceCorrect: false})
  }

  removeQuestion = (qIndex) => {
    const data = this.state.data
    data.questions.splice(qIndex, 1)
    this.setState({data: data})
  }

  set = (name, value) => {
    const data = this.state.data
    data[name] = value
    this.setState({data: data})
  }

  deleteQuiz = () => {
    swal({
      title: "Delete this quiz?",
      text: "You will NOT be able to recover it!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: SECONDARY_COLOR,
      confirmButtonText: "Yes.",
      closeOnConfirm: false
    }, () => {
      swal("Deleted!", "This quiz has been deleted.", "success")
      app.service(QUIZ)
      .remove(this.state.data._id)
      .then(x => {
        console.log(x)
        this.context.router.transitionTo(`${CLASS_URL}${x.parentCourse}`)
      })
      .catch(e => swal("Error", e, "error"))
    })
  }

  formSubmit = ev => { ev.key === "Enter" && this.submit() }

  render = () => (
    <div>
      <Toolbar title="ตัวช่วยสร้างคำถาม" />
      <Grid c style={{paddingTop: "6em"}}>
        <Grid c r>
          <Paper bottom="0em" style={{marginTop: "2em"}}>
            <Grid r>
              <Grid md={12}>
                <Fab
                  onClick={this.deleteQuiz}
                  position="absolute"
                  top="-2.3em"
                  right="1em"
                  bottom="auto"
                  secondary
                >
                  <Icon i="trash" />
                </Fab>
              </Grid>
            </Grid>
            <Grid r>
              <Grid xs={12}>
                <TextField
                  value={this.state.data.name}
                  onChange={v => this.set("name", v.target.value)}
                  label="Quiz Name"
                  onKeyPress={this.formSubmit}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {
          this.state.data.questions.map((e, qIndex) => (
            <Grid c r key={qIndex}>
              <Paper
                style={{marginTop: "2.8em"}}
                outerChild={
                  <div>
                    <TextField
                      value={this.state.data.questions[qIndex].question}
                      onChange={v => this.update(v.target.value, "question", qIndex)}
                      padding="1em"
                      background={PRIMARY_COLOR}
                      placeholder="Type your question here."
                      color="white"
                      onKeyPress={this.formSubmit}
                    />
                    <Grid r>
                      <Grid md={12}>
                        <Fab
                          onClick={() => this.removeQuestion(qIndex)}
                          position="absolute"
                          top="-3.5em"
                          right="2.2em"
                          bottom="auto"
                          secondary
                        >
                          <Icon i="trash" />
                        </Fab>
                      </Grid>
                      <Grid md={12}>
                        <Fab
                          onClick={() => this.setState({_showImage: !this.state._showImage})}
                          position="absolute"
                          top="-3.5em"
                          right="5.7em"
                          bottom="auto"
                        >
                          <Icon i={`file${this.state._showImage ? "" : "-image-o"}`} />
                        </Fab>
                      </Grid>
                      <Grid md={12}>
                        <Fab
                          onClick={() => this.moveQuestion(qIndex, qIndex + 1)}
                          position="absolute"
                          top="-3.5em"
                          right="9.2em"
                          bottom="auto"
                        >
                          <Icon i="arrow-down" />
                        </Fab>
                      </Grid>
                    </Grid>
                  </div>
                }
              >
                <div style={{display: this.state._showImage ? "block" : "none"}}>
                  <div style={{marginBottom: "1.3em"}}>
                    <TextField
                      value={this.state.data.questions[qIndex].image}
                      onChange={v => this.update(v.target.value, "image", qIndex)}
                      label="Image URL"
                      onKeyPress={this.formSubmit}
                    />
                  </div>
                </div>
                <div>
                  {
                    e.choices.map((choice, cIndex) => (
                      <Grid r style={{marginBottom: "1em"}} key={cIndex}>
                        <Grid sm={8}>
                          <TextField
                            value={this.state.data.questions[qIndex].choices[cIndex].text}
                            placeholder="Type your choices here."
                            onChange={v => this.updateChoice(
                              v.target.value, "text", qIndex, cIndex
                            )}
                            onKeyPress={this.formSubmit}
                          />
                        </Grid>
                        <Grid sm={2}>
                          <Button
                            width="100%"
                            style={{background: choice.correct ? SUCCESS_COLOR : DANGER_COLOR}}
                            onClick={() => this.updateChoice(
                              !choice.correct, "correct", qIndex, cIndex
                            )}
                          >
                            <Icon i={`${choice.correct ? "check" : "close"}`} />
                          </Button>
                        </Grid>
                        <Grid sm={2}>
                          <Button
                            secondary
                            onClick={() => this.removeChoice(qIndex, cIndex)}
                          >
                            <Icon i="trash" />
                          </Button>
                        </Grid>
                      </Grid>
                    ))
                  }
                </div>
                <Grid r style={{marginBottom: "1em"}}>
                  <Grid sm={8}>
                    <TextField
                      value={this.state._choiceName}
                      label="New Choice"
                      onChange={v => this.setState({_choiceName: v.target.value})}
                      onKeyPress={ev => {
                        if (ev.key === "Enter") {
                          this.newChoice(
                            qIndex, this.state._choiceName, this.state._choiceCorrect
                          )
                          this.submit()
                        }
                      }}
                    />
                  </Grid>
                  <Grid sm={2}>
                    <Button
                      width="100%"
                      style={{background: this.state._choiceCorrect ? SUCCESS_COLOR : DANGER_COLOR}}
                      onClick={() => this.setState({_choiceCorrect: !this.state._choiceCorrect})}
                    >
                      <Icon i={`${this.state._choiceCorrect ? "check" : "close"}`} />
                    </Button>
                  </Grid>
                  <Grid sm={2}>
                    <Button
                      width="100%"
                      onClick={() => this.newChoice(
                        qIndex, this.state._choiceName, this.state._choiceCorrect
                      )}
                    >
                      <Icon i="plus" />
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))
        }
        <Grid c r style={{marginTop: "1em"}}>
          <Paper>
            <Button
              width="100%"
              onClick={this.new}
              large
            >
              <Icon i="plus" />
            </Button>
          </Paper>
        </Grid>
      </Grid>
      <KeyHandler
        keyEventName="keydown"
        keyValue="Control"
        onKeyHandle={this.submit}
      />
      <Fab onClick={this.submit} secondary>
        <Icon i="floppy-o" />
      </Fab>
    </div>
  )

}
