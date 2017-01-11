import React from "react"
import Tooltip from "react-tooltip"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"
import c from "classnames"
import {reduxForm, Field} from "redux-form"
import {Link} from "react-router"

import Grid from "./Grid"
import Role from "./Role"
import Icon from "./Icon"

import {services} from "../client/api"

import FancyCard from "../routes/CourseList/FancyCard"
import {ImageUpload} from "../routes/CourseList/CourseCreator"

import s from "../routes/CourseList/CourseList.scss"

const LectureCreator = reduxForm({
  form: "lecture"
})(withStyles(s)(props => (
  <form className={c(s.card, s.create)} action="post" onSubmit={props.handleSubmit}>
    <div className={s.createCardTitle}>
      <Icon i="noteAdd" fill="#1D74FD" />
      <h2>สร้างบทเรียน</h2>
    </div>
    <div className={s.createForm}>
      <div>เลือกวิชาที่คุณจะสอนและสร้างบทเรียนที่นี่</div>
      <Field
        data-tip="ใส่ชื่อบทเรียนที่คุณจะสอน"
        component="input"
        type="text"
        name="name"
        placeholder="ชื่อบทเรียน"
        required
      />
      <Field
        data-tip="อธิบายโดยย่อว่าคุณจะสอนเกี่ยวกับอะไร"
        component="input"
        type="text"
        name="description"
        placeholder="คำอธิบายบทเรียน"
        required
      />
      <Field
        component={ImageUpload}
        name="thumbnail"
        required
      />
    </div>
    <div className={s.createSubmit}>
      <button
        type="submit"
        data-tip="คลิกที่นี่เพื่อสร้างบทเรียน"
      >
        สร้างบทเรียน
      </button>
    </div>
    <Tooltip place="top" type="dark" effect="float" />
  </form>
)))

const link = {
  textDecoration: "none",
  color: "#222"
}

const grid = {
  style: {marginBottom: "2em"},
  xs: 12,
  sm: 6,
  md: 4,
  lg: 3
}

const LectureList = props => (
  <Grid r>
    <Role is="teacher">
      <Grid xs={12} sm={5} md={3}>
        <LectureCreator onSubmit={props.create} />
      </Grid>
    </Role>
    <Grid xs={12} a="sm">
      <Grid r>
        {props.lessons && props.lessons.data.map((item, i) => (
          <Grid {...grid}>
            <Link
              to={`/notes/${item._id}`}
              onClick={() => props.link(item._id)}
              style={link}
              key={i}
            >
              <FancyCard
                delete={() => props.remove(item._id)}
                deleteTip="ลบเนื้อหา"
                {...item}
              />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Grid>
)

const mapStateToProps = state => ({
  user: state.user || {},
  lessons: state.lessons.queryResult
})

const mapDispatchToProps = (dispatch, props) => ({
  remove: id => dispatch(services.lessons.remove(id)),
  link: id => dispatch(services.lessons.get(id)),
  create: data => {
    dispatch(services.lessons.create({
      ...data,
      content: [{
        type: "card",
        content: "ยินดีต้อนรับครับ"
      }],
      course: props.classId
    }))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LectureList)
