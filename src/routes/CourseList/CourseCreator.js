import React from "react"
import Tooltip from "react-tooltip"
import withStyles from "isomorphic-style-loader/lib/withStyles"
import c from "classnames"
import {reduxForm, Field} from "redux-form"

import Icon from "../../components/Icon"
import Upload from "../../components/Upload"

import s from "./CourseList.scss"

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

export const ImageUpload = ({input}) => (
  <div>
    <Upload result={id => input.onChange(id)}>
      <div
        data-tip="อัพโหลดรูปภาพที่สื่อถึงคอร์สของคุณ"
        className={s.upload}
        style={{background: input.value && `
          linear-gradient(to right, white, rgba(255, 255, 255, 0.8)),
          url(${input.value}) center / cover no-repeat
        `}}
      >
        <span>{input.value ? `อัพโหลดรูปภาพแล้ว` : "อัพโหลดไฟล์รูปภาพ"}</span>
      </div>
    </Upload>
  </div>
)

const addUser = input => {
  const newUser = {
    _id: "00000000",
    username: "Book Cat",
    photo: "/images/icon/book.svg"
  }
  input.onChange(Array.isArray(input.value) ? [...input.value, newUser] : [newUser])
}

export const Users = ({input}) => (
  <div>
    <div className={s.profileList}>
      {Array.isArray(input.value) && input.value.map((item, i) => (
        <div>
          <Tooltip place="top" type="dark" effect="float" />
          <div
            data-tip={item.username}
            className={s.profile}
            style={{backgroundImage: `url(${item.photo})`}}
            key={i}
          />
        </div>
      ))}
    </div>
    <div style={{marginTop: "1em"}} onClick={() => addUser(input)}>
      Add Users
    </div>
  </div>
)

/*
  <hr className={s.hr} />
  <div className={s.createCardTitle} style={{marginTop: "3em"}}>
    <Icon i="wifiOn" fill="#FF9950" />
    <h2>เพิ่มผู้เรียน</h2>
    <Icon i="dropdown" />
  </div>
  <div>
    <Field component={Users} name="students" />
  </div>
  <div className={s.createCardTitle} style={{marginTop: "3em"}}>
    <Icon i="wifiOff" fill="#F8334A" />
    <h2>เพิ่มผู้สอน</h2>
    <Icon i="dropdown" />
  </div>
  <div>
    <Field component={Users} name="owner" />
  </div>
*/

const CourseCreator = withStyles(s)(props => (
  <form className={c(s.card, s.create)} action="post" onSubmit={props.handleSubmit}>
    <div className={s.createCardTitle}>
      <Icon i="noteAdd" fill="#1D74FD" />
      <h2>สร้างคอร์ส</h2>
    </div>
    <div className={s.createCardTitle}>
      <Icon i="details" fill="#7561EC" />
      <h2>รายละเอียดพื้นฐาน</h2>
    </div>
    <div className={s.createForm}>
      <div>เลือกวิชาที่คุณจะสอนและสร้างคอร์สที่นี่</div>
      <div className={s.select}>
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
        <div className={s.selectIcon}><Icon i="dropdown" /></div>
      </div>
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
    </div>
    <div className={s.createSubmit}>
      <button
        type="submit"
        data-tip="คลิกที่นี่เพื่อสร้างคอร์สได้เลย คอร์สของคุณจะสามารถเปิดใช้งานได้ทันที"
      >
        สร้างคอร์ส
      </button>
    </div>
    <Tooltip place="top" type="dark" effect="float" />
  </form>
))

export default reduxForm({form: "course"})(CourseCreator)
