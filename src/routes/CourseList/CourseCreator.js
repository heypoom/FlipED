import React from "react"
import {reduxForm, Field} from "redux-form"

import SimpleForm, {Select, ImageUpload} from "../../components/SimpleForm"

const subjects = [{
  value: "compsci",
  label: "วิทยาการคอมพิวเตอร์"
}, {
  value: "maths",
  label: "คณิตศาสตร์"
}, {
  value: "science",
  label: "วิทยาศาสตร์"
}, {
  value: "language",
  label: "ภาษาต่างประเทศ"
}]

const CourseCreator = props => (
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
)

export default reduxForm({form: "course"})(CourseCreator)
