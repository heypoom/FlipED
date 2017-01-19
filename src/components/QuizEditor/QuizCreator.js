import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router"
import {push} from "connected-react-router"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Fab from "material-ui/FloatingActionButton"
import DeleteIcon from "material-ui/svg-icons/action/delete"

import Button from "../Button"

import {services} from "../../client/api"

import s from "./QuizCreator.scss"

const QuizCreator = ({id, add, del, set}) => (
  <div>
    <div className={s.rightmost}>
      <Fab data-tip="ลบ" onClick={del} mini>
        <DeleteIcon />
      </Fab>
    </div>
    <div className={s.creator}>
      <img src="/images/fdesk3.svg" role="presentation" />
      <h2>Quiz Creator</h2>
      <div className={s.cta}>
        {id ? (
          <Link to={`/quiz/${id}`} className={s.link}>
            <Button className={s.button}>
              แก้ไขคำถาม
            </Button>
          </Link>
        ) : (
          <Button className={s.button} onClick={add}>
            เพิ่มคำถามใหม่
          </Button>
        )}
      </div>
      <div>
        <small>รหัสเชิงเทคนิค: {id}</small>
      </div>
    </div>
  </div>
)

const mapDispatchToProps = (dispatch, props) => ({
  add: () => {
    dispatch(services.quizzes.create({name: "My Quiz"})).then(({value}) => {
      console.log("Added new Quiz:", value)
      props.set("id", value._id)
      props.save()
      dispatch(push(`/quiz/${value._id}`))
    })
  },
  del: () => {
    dispatch(services.quizzes.remove(props.id)).then(item => {
      console.log("Removed Quiz Safely:", item)
      props.remove()
      props.save()
    }).catch(err => {
      console.error(`Unable to remove ${props.id} safely:`, err)
      props.remove(err)
    })
  }
})

export default connect(null, mapDispatchToProps)(withStyles(s)(QuizCreator))
