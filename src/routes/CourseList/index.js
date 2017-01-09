import React from "react"
import {connect} from "react-redux"
import {reduxForm, Field, reset} from "redux-form"
import c from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"
import Tooltip from "react-tooltip"
import {push} from "connected-react-router"

import Icon from "../../components/Icon"
import Searchbar from "../../components/Searchbar"
import Grid from "../../components/Grid"
import Role from "../../components/Role"
import Upload from "../../components/Upload"

import {services} from "../../client/api"
import {setSnackbar} from "../../actions/app"
import {search, sort, filter} from "../../actions/search"

// const Tooltip = () => <div />

import s from "./CourseList.scss"

const ImageUpload = ({input}) => (
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
  const newUser = {_id: "00000000", username: "Book Cat", photo: "/images/icon/book.svg"}
  input.onChange(Array.isArray(input.value) ? [...input.value, newUser] : [newUser])
}

const Users = ({input}) => (
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

const subjects = [{
  value: "ComSci",
  label: "วิทยาการคอมพิวเตอร์"
}, {
  value: "Math",
  label: "คณิตศาสตร์"
}, {
  value: "Sciencce",
  label: "วิทยาศาสตร์"
}, {
  value: "Language",
  label: "ภาษาต่างประเทศ"
}]

const CourseCreation = reduxForm({form: "course"})(withStyles(s)(props => (
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
    <Tooltip place="top" type="dark" effect="float" />
  </form>
)))

/*
  <div
    className={s.cardMedia}
    style={{backgroundImage: `url(${props.thumbnail})`}}
  />
*/

const courseCardState = state => ({
  user: state.user
})

const courseCardDispatch = (dispatch, props) => ({
  delete: () => {
    dispatch(setSnackbar(`ลบคอร์ส ${props._id} ออกแล้วครับ`))
    dispatch(services.classes.remove(props._id))
  },
  enroll: () => dispatch(setSnackbar(`504 Not Implemented.`)),
  enter: id => {
    console.log(props.students, id)
    dispatch(setSnackbar(`กำลังเข้าสู่คอร์ส ${props.name}`))
    dispatch(services.classes.get(props._id))
    dispatch(services.lessons.find({query: {course: props._id}}))
    dispatch(services.userstate.create({CURRENT_COURSE: props._id}))
    setTimeout(() => dispatch(push("/course")), 150)
  }
})

const CourseCard = connect(courseCardState, courseCardDispatch)(withStyles(s)(props => (
  <Grid xs={props.xs || 12} sm={props.sm || 6} md={props.md} lg={props.lg}>
    <div>
      <Tooltip place="top" type="dark" effect="float" />
      <div className={c(s.card, s.class)} onClick={() => props.enter(props.user._id)}>
        <div className={s.cardBody}>
          <h2>{props.name}</h2>
          <h3>{props.description}</h3>
          <div className={s.profileList}>
            {props.owner && props.owner.map((e, i) => (
              <div
                data-tip={`(ผู้สอน) ${e.username}`}
                className={s.profile}
                style={{backgroundImage: `url(${e.photo})`}}
                key={i}
              />
            ))}
            {props.students && props.students.map((e, i) => (
              <div
                data-tip={`(ผู้เรียน) ${e.username}`}
                className={s.profile}
                style={{backgroundImage: `url(${e.photo})`}}
                key={i}
              />
            ))}
          </div>
        </div>
        <div data-tip="ลบห้องเรียน" className={s.cardRemove}>
          <Icon i="error" onClick={props.delete} />
        </div>
      </div>
    </div>
  </Grid>
)))

const CourseCardHeader = connect(null, dispatch => ({
  handleSort: () => dispatch(sort("classes"))
}))(withStyles(s)(({text, danger, success, handleSort}) => (
  <Grid r>
    <Grid xs={12}>
      <div className={c(s.cardTop, danger && s.danger, success && s.success)}>
        <span>{text}</span>
        <Tooltip place="top" type="dark" effect="float" />
        <div
          data-tip={`เปลี่ยนการเรียงลำดับสำหรับ ${text}`}
          className={s.cardTopIcon}
          onClick={handleSort}
        >
          <Icon i="moreVert" />
        </div>
      </div>
    </Grid>
  </Grid>
)))

const CourseList = props => (
  <div className={s.main}>
    <Searchbar
      searchText="ค้นหาคอร์สที่ท่านสนใจ"
      onSearch={props.handleSearch}
      value={props.search}
      onFilterToggle={() => props.toggleFilter(props.filter)}
      filter={props.filter}
      btn={props.settings}
      btnText="การตั้งค่าเพิ่มเติม"
      sort={props.sort}
    />
    <Grid r>
      <Role is="teacher">
        <Grid xs={12} md={4}>
          <CourseCreation onSubmit={data => props.createCourse(data, props.user._id)} />
        </Grid>
      </Role>
      <Grid xs={12} className="col-md">
        <div>
          <CourseCardHeader text="คอร์สที่ใช้งานล่าสุด" success />
          <Grid r>
            {props.classes.data && props.classes.data.map((item, i) => (
              <CourseCard key={i} sm={props.user.roles === "student" ? 4 : 12} {...item} />
            ))}
          </Grid>
        </div>
      </Grid>
      <Grid xs={12} md={5}>
        <div>
          <CourseCardHeader text="คอร์สทั้งหมด" />
          <Grid r>
            {props.classes.data && props.classes.data.map((item, i) => (
              <CourseCard key={i} {...item} />
            ))}
          </Grid>
        </div>
      </Grid>
    </Grid>
  </div>
)

const mapStateToProps = state => ({
  user: state.user,
  classes: state.classes.queryResult || {},
  search: state.search.classes.value || "",
  filter: state.search.classes.filter || "name",
  sort: state.search.classes.sort || false
})

const mapDispatchToProps = dispatch => ({
  handleSearch: value => dispatch(search(value, "classes")),
  toggleFilter: ev => {
    dispatch(filter(ev === "name" ? "description" : "name", "classes"))
  },
  createCourse: (data, user) => {
    data.owner = [user]
    console.log("Creating Courses:", data)
    dispatch(services.classes.create(data))
    dispatch(reset("course"))
  },
  settings: () => {
    dispatch(setSnackbar("ความสามารถนี้ยังไม่พร้อมใช้งานในขณะนี้ (503: Not Implemented)"))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(CourseList))
