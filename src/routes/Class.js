import React from "react"
import {Link} from "react-router"
import {connect} from "react-redux"

import {services} from "../client/api"

import Grid from "../components/Grid"
import LessonList from "../components/LessonList"
import QuizList from "../components/QuizList"
import Toolbar from "../components/Toolbar"
import Role from "../components/Role"
import Fab from "../components/Fab"
import Icon from "../components/Icon"
import {zCover} from "../components/Shadow"
import NoticeModal from "../components/NoticeModal"

const Class = props => (
  <div>
    <Toolbar title={props.class.name} background="#2d2d30" fixed hideTitle />
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
                <NoticeModal src={props.class.thumbnail} alpha="0.1">
                  <div style={{color: "black", lineHeight: "2.3em"}}>
                    <span style={{fontWeight: "bold", fontSize: "1.6em", marginBottom: "0.5em"}}>
                      {props.class.name}
                    </span><br />
                    <span>{props.class.description}</span>
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
                classId={props.params.id}
                sections={props.class.sections || [{name: "", description: ""}]}
                new={this.newLesson}
              />
            </Grid>
          </Grid>
          <Grid style={{paddingTop: "2em"}} r>
            <Grid xs={12}>
              <QuizList classId={props.params.id} new={this.newQuiz} />
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
              ในขณะนี้ คุณ {props.user.username} ยังไม่ได้รับการยืนยันบุคคล
              รบกวนคุณ {props.user.username} <b>ยืนยันตัวตน</b>กับผู้ดูแลระบบด้วยครับ
            </p>
          </div>
        </NoticeModal>
      </div>
    </Role>
    <Role is="teacher">
      <Link to={`${CLASS_URL}${props.params.id}/edit`}>
        <Fab><Icon i="pencil" /></Fab>
      </Link>
    </Role>
  </div>
)

const mapStateToProps = state => ({
  class: state.class.data.hasOwnProperty("queryResult") ? state.class.data.queryResult : null,
  user: state.user
})

const mapDispatchToProps = (dispatch, props) => ({
  get: data => dispatch(setClass(data)),
  createLesson: section => dispatch(services.lesson.create({
    name: "โน๊ตใหม่",
    description: "คำอธิบาย",
    url: Math.floor(Math.random() * 10000) + Date.now().toString().substring(5),
    thumbnail: "/images/cover/january.jpg",
    content: [{
      type: "card",
      content: ""
    }],
    parentCourse: props.params.id,
    section: section
  })),
  createQuiz: () => dispatch(services.quiz.create({
    name: "คำถามใหม่",
    questions: [{
      question: "คำถามแรก",
      choices: [
        {text: "ตัวเลือกแรก", correct: true},
        {text: "ตัวเลือกที่สอง", correct: true},
      ]
    }],
    parentCourse: props.params.id
  }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Class)
