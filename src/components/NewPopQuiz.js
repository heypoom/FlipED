import React, {Component} from "react"
import mapKeys from "lodash.mapkeys"

import Button from "./Button"
import Fa from "./Fa"
import Grid from "./Grid"
import {zLite} from "./Shadow"

import {app} from "../constants/api"

import {QUIZ_API, QUIZ_URL} from "../constants/api"
import {PRIMARY_COLOR, SECONDARY_COLOR} from "../constants/visual"

if (typeof window !== "undefined") {
  window.mapKeys = mapKeys
  // mapKeys(this.state.quiz, (v, k) => ({_id: "value", name: "label"}[k]))
}

export default class NewPopQuiz extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      quiz: [{_id: "", name: ""}]
    }
  }

  componentDidMount = () => {
    app.service(QUIZ_API)
    .find({
      query: {
        $select: ["_id", "name"]
      }
    })
    .then(e => this.setState({quiz: e.data}))
  }

  submitForm = v => (v.key === "Enter") && this.props.submit()

  new = () => {
    app.service(QUIZ_API)
    .create({
      name: "คำถามใหม่",
      questions: [{
        question: "",
        choices: [
          {text: "", correct: true}
        ]
      }]
    })
    .then(e => {
      this.props.update(e._id, "id", this.props.index)
      this.props.submit()
      this.context.router.transitionTo(
        `${QUIZ_URL}${e._id}/edit`
      )
    })
    .catch(e => swal("Error", e, "error"))
  }

  edit = () => this.context.router.transitionTo(`${QUIZ_URL}${this.props.id}/edit`)

  set = (id) => {
    this.props.update(id, "id", this.props.index)
    this.props.submit()
  }

  delete = () => {
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
      app.service(QUIZ_API)
      .remove(this.props.id)
      .then(() => this.unset())
      .catch(e => swal("Error", e, "error"))
    })
  }

  render = () => {
    const selectStyle = {
      border: "0em",
      background: PRIMARY_COLOR,
      color: "white",
      padding: "0.5em",
      width: "100%",
      outline: "none",
      marginBottom: "1em",
      boxShadow: zLite,
      height: "2.9em"
    }
    return (
      <div>
        <Grid md={8}>
          <select
            value={this.props.id}
            onChange={v => this.set(v.target.value)}
            style={selectStyle}
          >
            {
              this.state.quiz.map(item => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))
            }
          </select>
        </Grid>
        {
          this.props.id ? (
            <div>
              <Grid md={2}>
                <Button width="100%" onClick={this.edit} large>
                  <Fa i="pencil" />
                </Button>
              </Grid>
              <Grid md={2}>
                <Button width="100%" onClick={this.new} large>
                  <Fa i="plus" />
                </Button>
              </Grid>
            </div>
          ) : (
            <Grid md={4}>
              <Button width="100%" onClick={this.new} large>
                <Fa i="plus" />
              </Button>
            </Grid>
          )
        }
      </div>
    )
  }

}
