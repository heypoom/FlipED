import React, {Component} from "react"
import {connect} from "redux-await"
import concat from "lodash.concat"
import reject from "lodash.reject"

import {Link} from "react-router"
import Button from "./Button"
import Paper from "./Paper"
import TextField from "./TextField"
import Grid from "./Grid"

import app from "../client/feathers"
import {setQuizList} from "../actions/quiz"
import {QUIZ_API, QUIZ_URL} from "../constants/api"

class QuizList extends Component {

  static contextTypes = {
    store: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      search: ""
    }
  }

  componentDidMount = () => {
    if (this.props.quizzes) {
      if (typeof this.props.quizzes[0] === "undefined") {
        if (this.props.user.hasOwnProperty("_id")) {
          this.search("")
        }
      }
    } else {
      if (this.props.user.hasOwnProperty("_id")) {
        this.search("")
      }
    }
    const quiz = app.service(QUIZ_API)
    quiz.on("created", res => {
      const quizzes = this.props.quizzes
      quizzes.data = concat(quizzes.data, res)
      this.props.setQuizList(quizzes)
    })
    quiz.on("patched", () => {
      this.search("")
    })
    quiz.on("removed", res => {
      const quizzes = this.props.quizzes
      quizzes.data = reject(quizzes.data, res)
      this.props.setQuizList(quizzes)
    })
  }

  componentWillUnmount = () => {
    const ServiceEvent = ["created", "removed", "patched"]
    ServiceEvent.forEach(event => {
      app.service(QUIZ_API).off(event)
    })
  }

  search = (v) => {
    this.setState({search: v})
    app.service(QUIZ_API).find({
      query: {
        $select: ["_id", "name"],
        name: {
          $regex: v,
          $options: "ig"
        },
        parentCourse: this.props.classId
      }
    })
    .then(e => this.props.setQuizList(e))
    .catch(e => swal("Error", e, "error"))
  }

  create = () => {
    app.service(QUIZ_API)
    .create({
      name: "คำถามใหม่",
      questions: [{
        question: "คำถามแรก",
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

  render = () => (
    <div style={this.props.style}>
      <Paper style={{marginTop: this.props.top}}>
        <TextField
          label="ค้นหาควิซ"
          value={this.state.search}
          onChange={v => this.search(v.target.value)}
        />
      </Paper>
      <Grid r>
        {
          this.props.quizzes ? this.props.quizzes.map(e => (
            <Grid key={e._id} style={{marginBottom: "1em"}} md="3">
              <Link to={`${QUIZ_URL}${e._id}`}>
                <Button width="100%" large>
                  {e.name}
                </Button>
              </Link>
            </Grid>
          )) : null
        }
        <Grid style={{marginBottom: "1em"}} md="3">
          <Button onClick={this.create} width="100%" secondary large>
            สร้างคำถามใหม่
          </Button>
        </Grid>
      </Grid>
    </div>
  )

}


const mapStateToProps = state => ({
  quizzes: state.quiz.list.data,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  setQuizList: data => dispatch(setQuizList(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)
