import React, {Component} from "react"
import c from "classnames"
import {connect} from "react-redux"
import {HotKeys} from "react-hotkeys"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Fab from "material-ui/FloatingActionButton"
import SaveIcon from "material-ui/svg-icons/content/save"

import Grid from "../../components/Grid"
import Button from "../../components/Button"

import {services} from "../../client/api"
import {setSnackbar} from "../../actions/app"

import s from "./QuizEditor.scss"

const Choice = withStyles(s)(({choice = {}, set}) => (
  <div className={c(s.choice, choice.correct && s.correct)}>
    <textarea
      value={choice.text}
      placeholder={choice.correct ? "Correct answer..." : "Wrong answer..."}
      onChange={set}
      className={"inlineInput"}
      required
    />
  </div>
))

const Question = withStyles(s)(({question, choices = [{}], setQ, setC, del}) => (
  <div className={s.card}>
    <div className={s.question}>
      <textarea
        value={question}
        placeholder="Your Question Here..."
        onChange={setQ}
        className="inlineInput"
      />
    </div>
    <div className={s.choices}>
      <Grid r>
        {[0, 1, 2, 3].map(i => (
          <Grid xs={12} sm={6} key={i}>
            <div>
              <Choice
                choice={choices[i]}
                set={e => setC(e.target.value, i)}
              />
            </div>
          </Grid>
        ))}
      </Grid>
      <div className={s.delete}>
        <Button onClick={del}>
          Delete
        </Button>
      </div>
    </div>
  </div>
))

const Questions = ({quiz, setQ, setC, add, remove}) => (
  <Grid r>
    {quiz && quiz.map((item, i) => (
      <Grid xs={12} sm={6} md={4} key={i}>
        <Question
          setQ={e => setQ(e.target.value, i)}
          setC={(text, choice) => setC(text, choice, i)}
          del={() => remove(i)}
          {...item}
        />
      </Grid>
    ))}
    <Grid xs={12} sm={6} md={4}>
      <div className={s.card}>
        <Button className={s.ripple} onClick={add}>
          <div className={s.add}>
            <img src="/images/fdesk2.svg" role="presentation" />
            <h2>Add Quiz</h2>
          </div>
        </Button>
      </div>
    </Grid>
  </Grid>
)

/*
  <div>
    <p>
      {JSON.stringify(this.state, null, 4)}
    </p>
  </div>
*/

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quizzes.data || {}
})

const mapDispatchToProps = (dispatch, props) => ({
  init: () => dispatch(services.quizzes.get(props.params.id)),
  patch: obj => {
    dispatch(services.quizzes.patch(props.params.id, obj))
    dispatch(setSnackbar(`กำลังบันทึกการแก้ไขคำถาม ${obj.name}`))
  }
})

@withStyles(s)
@connect(mapStateToProps, mapDispatchToProps)
export default class QuizEditor extends Component {

  constructor(props) {
    super(props)
    this.state = props.quiz || {}
  }

  componentDidMount() {
    if (!this.props.quiz.questions)
      this.props.init()
  }

  setQ = (text, i) => this.set("question", text, i)

  setC = (text, choice, question) => {
    const q = this.state.questions[question]
    if (q) {
      const ch = q.choices
      ch[choice] = {text, correct: !choice}
      this.set("choices", ch, question)
    }
  }

  set = (key, value, index) => {
    const q = this.state.questions
    q[index][key] = value
    this.setState({questions: q})
  }

  add = () => this.setState({questions: [...this.state.questions, {
    choices: [{correct: true}]
  }]})

  remove = i => {
    const q = this.state.questions
    if (this.state.questions[i]) {
      q.splice(i, 1)
      this.setState({questions: q})
    }
  }

  save = () => this.props.patch(this.state)

  handlers = {
    save: e => {
      e.preventDefault()
      this.save()
    }
  }

  render = () => (
    <HotKeys handlers={this.handlers}>
      <div className={s.main}>
        <div className={s.name}>
          <input
            className="inlineInput"
            type="text"
            value={this.state.name || this.props.quiz.name}
            onChange={e => this.setState({name: e.target.value})}
          />
        </div>
        <Questions
          quiz={this.state.questions || this.props.quiz.questions}
          setQ={this.setQ}
          setC={this.setC}
          add={this.add}
          remove={this.remove}
        />
        <div className={s.fab}>
          <Fab onClick={this.save}>
            <SaveIcon />
          </Fab>
        </div>
      </div>
    </HotKeys>
  )

}
