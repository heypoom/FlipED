import React from "react"
import {connect} from "react-redux"
import {reduxForm, Field} from "redux-form"
import {Link} from "react-router"

import Grid from "./Grid"
import Role from "./Role"
import FancyCard from "./FancyCard"
import SimpleForm, {ImageUpload} from "./SimpleForm"

import {services} from "../client/api"

const LectureCreator = reduxForm({form: "lecture"})(props => (
  <SimpleForm type="บทเรียน" onSubmit={props.handleSubmit}>
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
  </SimpleForm>
))

const link = {
  textDecoration: "none",
  color: "#222"
}

const bottom = {
  marginBottom: "2em"
}

const LinkHOC = props => (
  <Link style={link} to={`/notes/${props.id}`} onClick={props.onClick}>
    {props.children}
  </Link>
)

const LectureList = props => (
  <Grid r>
    <Role is="teacher">
      <Grid xs={12} sm={6} md={4} lg={3}>
        <LectureCreator onSubmit={props.create} />
      </Grid>
    </Role>
    <Grid xs={12} sm={6} md={8} lg={9}>
      <Grid r>
        {props.lessons && props.lessons.data.map((item, i) => (
          <Grid xs={12} sm={6} md={4} lg={3} style={bottom}>
            <FancyCard
              delete={() => props.remove(item._id)}
              deleteTip="ลบเนื้อหา"
              enter={() => props.enter(item._id)}
              wrapper={LinkHOC}
              {...item}
            />
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
  enter: id => dispatch(services.lessons.get(id)),
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
