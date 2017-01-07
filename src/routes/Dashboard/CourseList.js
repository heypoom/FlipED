import React from "react"
import {connect} from "react-redux"
import {reduxForm, Field} from "redux-form"
import c from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Icon from "./Icon"
import Searchbar from "./Searchbar"
import Grid from "../../components/Grid"

import {ROLE} from "../../constants/roles"
import {services} from "../../client/api"
import {setUi, setSnackbar} from "../../actions/app"

import s from "./CourseList.scss"

const COURSE_SELECTOR = [
  "_id", "name", "description", "thumbnail", "owner",
  "updatedAt", "createdAt"
]

const CourseCreation = reduxForm({form: "course"})(withStyles(s)(props => (
  <form action="post" onSubmit={props.handleSubmit}>
    <div className={c(s.card, s.create)}>
      <div className={s.createCardTitle}>
        <Icon i="noteAdd" fill="#1D74FD" />
        <h2>Course Creation</h2>
      </div>
      <div className={s.createCardTitle}>
        <Icon i="dashboard" fill="#7561EC" />
        <h2>Basic Details</h2>
      </div>
      <div className={s.createForm}>
        <div>Choose the course type and create course here</div>
        <div className={s.select}>
          <Field component="select" label="Course type" name="type">
            <option value="ComSci">Computer Science</option>
            <option value="Math">Mathematics</option>
            <option value="Eng">English</option>
          </Field>
          <div className={s.selectIcon}><Icon i="dropdown" /></div>
        </div>
        <Field component="input" type="text" name="name" placeholder="Name" required />
        <Field component="input" type="text" name="description" placeholder="Description" required />
      </div>
      <div className={s.createCardTitle}>
        <Icon i="wifiOn" fill="#FF8F3F" />
        <h2>Thumbnail</h2>
      </div>
      <div style={{marginTop: "3em"}}>
        Thumbnail Files
      </div>
      <input type="submit" className={s.createBtn} label="Send" />
      <hr />
      <div className={s.createCardTitle} style={{marginTop: "3em"}}>
        <Icon i="check" fill="#FF9950" />
        <h2>Add Students</h2>
        <Icon i="dropdown" />
      </div>
      <div className={s.createCardTitle} style={{marginTop: "3em"}}>
        <Icon i="Chat" fill="#F8334A" />
        <h2>Add Teachers</h2>
        <Icon i="dropdown" />
      </div>
    </div>
  </form>
)))

/*
  <div
    className={s.cardMedia}
    style={{backgroundImage: `url(${props.thumbnail})`}}
  />
*/

const CourseCard = withStyles(s)(props => (
  <Grid xs={props.xs || 12} sm={props.sm || 6} md={props.md} lg={props.lg}>
    <div className={c(s.card, s.class)}>
      <h2>{props.name}</h2>
      <h3>{props.description}</h3>
    </div>
  </Grid>
))

const CourseCardHeader = withStyles(s)(({text, danger, success}) => (
  <Grid r>
    <Grid xs={12}>
      <div className={c(s.cardTop, danger && s.danger, success && s.success)}>
        <span>{text}</span>
        <Icon i="moreVert" />
      </div>
    </Grid>
  </Grid>
))

const CourseList = props => (
  <div>
    <Searchbar
      onSearch={props.handleSearch}
      value={props.search}
      onFilterToggle={() => props.toggleFilter(props.filter)}
      filter={props.filter}
      btn={props.settings}
      btnText="Settings"
    />
    <Grid r>
      <Grid xs={12} md={4}>
        <CourseCreation onSubmit={props.createCourse} />
      </Grid>
      <Grid xs={12} md={3}>
        <CourseCardHeader text="Active Courses" success />
        <Grid r>
          {props.classes.data && props.classes.data.map((item, i) => (
            <CourseCard key={i} sm="12" {...item} />
          ))}
        </Grid>
      </Grid>
      <Grid xs={12} md={5}>
        <CourseCardHeader text="All Courses" />
        <Grid r>
          {props.classes.data && props.classes.data.map((item, i) => (
            <CourseCard key={i} {...item} />
          ))}
        </Grid>
      </Grid>
    </Grid>
  </div>
)

const mapStateToProps = state => ({
  search: state.app.ui.courseSearch || "",
  filter: state.app.ui.courseFilter || "name",
  classes: state.classes.queryResult || {}
})

const mapDispatchToProps = dispatch => ({
  handleSearch: (value, filter) => {
    dispatch(setUi("courseSearch", value))
    dispatch(services.classes.find({
      query: {
        [filter || "name"]: {
          $regex: value,
          $options: "ig"
        },
        $select: COURSE_SELECTOR
      }
    }))
  },
  createCourse: data => {
    console.log(data)
  },
  toggleFilter: filter => {
    dispatch(setUi("courseFilter", filter === "name" ? "description" : "name"))
  },
  settings: () => dispatch(setSnackbar("503 Not Implemented"))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(CourseList))
