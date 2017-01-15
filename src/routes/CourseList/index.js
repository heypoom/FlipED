import React from "react"
import {connect} from "react-redux"
import {reset} from "redux-form"
import c from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"
import Tooltip from "react-tooltip"
import {push} from "connected-react-router"

import CourseCreator from "./CourseCreator"

import Icon from "../../components/Icon"
import Searchbar from "../../components/Searchbar"
import Grid from "../../components/Grid"
import Role from "../../components/Role"
import FancyCard from "../../components/FancyCard"

import {services} from "../../client/api"
import {setSnackbar} from "../../actions/app"
import {search, sort, filter} from "../../actions/search"

// const Tooltip = () => <div />

import s from "./CourseList.scss"

const courseCardState = state => ({
  user: state.user
})

const courseCardDispatch = (dispatch, props) => ({
  delete: () => {
    dispatch(setSnackbar(`ลบคอร์ส ${props._id} ออกแล้วครับ`))
    dispatch(services.classes.remove(props._id))
  },
  enter: () => {
    dispatch(setSnackbar(`กำลังเข้าสู่คอร์ส ${props.name}`))
    dispatch(services.classes.get(props._id))
    dispatch(services.lessons.find({query: {course: props._id}}))
    dispatch(services.userstate.create({CURRENT_COURSE: props._id}))
    setTimeout(() => dispatch(push("/course")), 150)
  }
})

const CourseCard = connect(courseCardState, courseCardDispatch)(FancyCard)

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
        <Grid xs={12} sm={4}>
          <CourseCreator onSubmit={data => props.createCourse(data, props.user._id)} />
        </Grid>
      </Role>
      <Grid xs={12} a="sm">
        <div className={s.gridSpacing}>
          <CourseCardHeader text="คอร์สที่ใช้งานล่าสุด" success />
          <Grid r>
            {props.classes.data && props.classes.data.map((item, i) => (
              <Grid xs={12} md={6} lg={4} key={i}>
                <CourseCard {...item} />
              </Grid>
            ))}
          </Grid>
        </div>
      </Grid>
      <Role only="student">
        <Grid xs={12} sm={5}>
          <div>
            <CourseCardHeader text="คอร์สทั้งหมด" />
            <Grid r>
              {props.classes.data && props.classes.data.map((item, i) => (
                <Grid xs={12} lg={6} key={i}>
                  <CourseCard {...item} />
                </Grid>
              ))}
            </Grid>
          </div>
        </Grid>
      </Role>
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
