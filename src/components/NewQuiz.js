import React, {Component} from "react"
import {app} from "../constants/api"
import history from "../core/history"

import Paper from "./Paper"
import TextField from "./TextField"
import Fab from "./Fab"
import Grid from "./Grid"
import Fa from "./Fa"

import {QUIZ_API, QUIZ_URL} from "../constants/api"

export default class NewQuiz extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {quizName: ""}
  }

  create = () => {
    app.service(QUIZ_API)
    .create({
      name: this.state.quizName,
      questions: [{
        question: "",
        choices: [
          {text: "", correct: true}
        ]
      }],
      parentCourse: this.props.classId
    })
    .then(e => {
      if (this.props.onCreated)
        this.props.onCreated(e._id)
      this.context.router.transitionTo(`${QUIZ_URL}${e._id}/edit`)
    })
    .catch(e => swal("Error", e, "error"))
  }

  submit = ev => { ev.key === "Enter" && this.create() }

  render = () => (
    <Paper style={{marginTop: "3em"}}>
      <Grid r>
        <Grid md={12}>
          <Fab
            onClick={this.create}
            position="absolute"
            top="-2.3em"
            right="1em"
            bottom="auto"
          >
            <Fa i="check" />
          </Fab>
        </Grid>
      </Grid>
      <Grid r>
        <Grid md={12}>
          <TextField
            label="ชื่อควิซที่จะสร้าง"
            value={this.state.quizName}
            onChange={v => this.setState({quizName: v.target.value})}
            onKeyPress={this.submit}
          />
        </Grid>
      </Grid>
    </Paper>
  )

}
