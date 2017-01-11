import React from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"
import Tooltip from "react-tooltip"
import c from "classnames"

import Icon from "../Icon"
import Upload from "../Upload"

import s from "./SimpleForm.scss"

export const ImageUpload = withStyles(s)(({input}) => (
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
))

export const Select = withStyles(s)(props => (
  <div className={s.select}>
    {props.children}
    <div className={s.selectIcon}><Icon i="dropdown" /></div>
  </div>
))

const SimpleForm = props => (
  <form className={c(s.card, s.create)} action="post" onSubmit={props.onSubmit}>
    <div className={s.createCardTitle}>
      <Icon i="noteAdd" fill="#1D74FD" />
      <h2>สร้าง{props.type}</h2>
    </div>
    <div className={s.createCardTitle}>
      <Icon i="details" fill="#7561EC" />
      <h2>รายละเอียดพื้นฐาน</h2>
    </div>
    <div className={s.createForm}>
      <div>เลือกวิชาที่คุณจะสอนและสร้างบทเรียนที่นี่</div>
      {props.children}
    </div>
    <div className={s.createSubmit}>
      <button
        type="submit"
        data-tip={`คลิกที่นี่เพื่อสร้าง${props.type}`}
      >
        สร้าง{props.type}
      </button>
    </div>
    <Tooltip place="top" type="dark" effect="float" />
  </form>
)

export default withStyles(s)(SimpleForm)
