import React from "react"
import {connect} from "react-redux"
import {reduxForm, Field, reset} from "redux-form"

import SimpleForm, {Select, ImageUpload} from "./SimpleForm"
import {services} from "../client/api"
import {subjects} from "../constants/content"

const CourseCreator = reduxForm({form: "course"})(props => (
  <SimpleForm type="คอร์ส" onSubmit={props.handleSubmit}>
    <Select>
      <Field
        data-tip="เลือกวิชาที่คุณจะสอน"
        component="select"
        name="subject"
        required
      >
        <option>(เลือกวิชาที่จะสอน)</option>
        {subjects.map((item, i) => (
          <option value={item.value} key={i}>{item.label}</option>
        ))}
      </Field>
    </Select>
    <Field
      data-tip="ใส่ชื่อคอร์สที่คุณจะสอน"
      component="input"
      type="text"
      name="name"
      placeholder="ชื่อคอร์สของคุณ"
      required
    />
    <Field
      data-tip="อธิบายโดยย่อว่าคุณจะสอนเกี่ยวกับอะไร"
      component="input"
      type="text"
      name="description"
      placeholder="คำอธิบายคอร์สสั้นๆ"
      required
    />
    <Field
      component={ImageUpload}
      name="thumbnail"
      required
    />
  </SimpleForm>
))

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  createCourse: (data, user) => {
    data.owner = [user]
    console.log("Creating Courses:", data)
    dispatch(services.classes.create(data))
    dispatch(reset("course"))
  }
})

const ConnectedCourseCreator = props => (
  <CourseCreator onSubmit={data => props.createCourse(data, props.user._id)} />
)

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedCourseCreator)
