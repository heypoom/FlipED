import React, {Component} from "react"
import {Link} from "react-router"
import {connect} from "redux-await"

import app from "../client/feathers"

import Grid from "../components/Grid"
import Cover from "../components/Cover"
import LessonList from "../components/LessonList"
import QuizList from "../components/QuizList"
import Toolbar from "../components/Toolbar"
import Role from "../components/Role"
import Fab from "../components/Fab"
import Fa from "../components/Fa"
import Fi from "../components/Fi"
import Paper from "../components/Paper"
import {zCover} from "../components/Shadow"
import NoticeModal from "../components/NoticeModal"

import {setClass} from "../actions/classes"

import {ROLE} from "../constants"
import {CDN_URL} from "../constants/visual"
import {CLASS_API, LESSON_URL, CLASS_URL, LESSON_API, QUIZ_API, QUIZ_URL} from "../constants/api"

class Class extends Component {

  static contextTypes = {
    store: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    app.service(CLASS_API).get(this.props.params.id).then(e => {
      this.props.setClass(e)
    })
    app.service(CLASS_API).on("patched", data => {
      console.log("Incoming:", data)
      if (data._id === this.props.class._id)
        this.props.setClass(data)
    })
  }

  componentWillReceiveProps = props => {
    if (props.params.id !== this.props.class._id) {
      console.log("Class Diff Detected!", props.params.id, this.props.class._id)
      app.service(CLASS_API).get(props.params.id).then(e => {
        console.log(`Fetched CLASS_API at ${props.params.id}. Originated from ${this.props.class._id}`, e)
        this.props.setClass(e)
      })
    }
  }

  newLesson = sect => {
    app.service(LESSON_API).create({
      name: "โน๊ตใหม่",
      description: "คำอธิบาย",
      url: Math.floor(Math.random() * 10000) + Date.now().toString().substring(5),
      thumbnail: "/images/cover/january.jpg",
      content: [{
        type: "card",
        content: ""
      }],
      parentCourse: this.props.params.id,
      section: sect
    })
    .then(e => this.context.router.transitionTo(`${LESSON_URL}${e.url}/edit`))
    .catch(e => console.error(e))
  }

  newQuiz = () => {
    app.service(QUIZ_API)
    .create({
      name: "คำถามใหม่",
      questions: [{
        question: "คำถามแรก",
        choices: [
          {text: "ตัวเลือกแรก", correct: true},
          {text: "ตัวเลือกที่สอง", correct: true},
        ]
      }],
      parentCourse: this.props.params.id
    })
    .then(e => {
      this.context.router.transitionTo(`${QUIZ_URL}${e._id}/edit`)
    })
    .catch(e => console.error(e))
  }

  render = () => (
    <div>
      <Toolbar title={this.props.class.name} background="#2d2d30" fixed hideTitle />
      <Role is="student">
        <div>
          <div
            style={{
              background: "#2d2d30",
              color: "#fefefe",
              minHeight: "34em",
              paddingTop: "6em"
            }}
          >
            <Grid c>
              <Grid r>
                <Grid xs={12}>
                  <NoticeModal src={this.props.class.thumbnail} alpha="0.1">
                    <div style={{color: "black", lineHeight: "2.3em"}}>
                      <span style={{fontWeight: "bold", fontSize: "1.6em", marginBottom: "0.5em"}}>
                        {this.props.class.name}
                      </span><br />
                      <span>{this.props.class.description}</span>
                    </div>
                  </NoticeModal>
                </Grid>
              </Grid>
            </Grid>
          </div>
          <div
            style={{
              padding: "2em",
              background: "linear-gradient(to left, rgb(116, 116, 191), rgb(52, 138, 199))",
              boxShadow: zCover,
              color: "#fefefe",
              marginBottom: "2.6em"
            }}
          />
          <Grid c>
            <Grid r>
              <Grid xs={12}>
                <LessonList
                  classId={this.props.params.id}
                  sections={this.props.class.sections || [{name: "", description: ""}]}
                  new={this.newLesson}
                />
              </Grid>
            </Grid>
            <Grid style={{paddingTop: "2em"}} r>
              <Grid xs={12}>
                <QuizList classId={this.props.params.id} new={this.newQuiz} />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Role>
      <Role only="guest">
        <div style={{paddingTop: "7em"}}>
          <NoticeModal heading="ยังไม่ได้รับการยืนยันบุคคล">
            <div>
              <h2>ยังไม่ได้รับการยืนยันบุคคล</h2>
              <p>
                ในขณะนี้ คุณ {this.props.user.username} ยังไม่ได้รับการยืนยันบุคคล
                รบกวนคุณ {this.props.user.username} <b>ยืนยันตัวตน</b>กับผู้ดูแลระบบด้วยครับ
              </p>
            </div>
          </NoticeModal>
        </div>
      </Role>
      <Role is="teacher">
        <Link to={`${CLASS_URL}${this.props.params.id}/edit`}>
          <Fab><Fa i="pencil" /></Fab>
        </Link>
      </Role>
    </div>
  )

}

const mapStateToProps = state => ({
  class: state.classes.data,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  setClass: data => dispatch(setClass(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Class)
