import React from "react"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"
import {push} from "connected-react-router"

import Grid from "../Grid"
import FancyCard from "../FancyCard"

import {services} from "../../client/api"
import {setSnackbar} from "../../actions/app"

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

const CourseList = ({classes, xs = 12, sm = 6, md = 6, lg = 4}) => (
  <Grid r>
    {classes.data && classes.data.map((item, i) => (
      <Grid xs={xs} sm={sm} md={md} lg={lg} key={i}>
        <CourseCard {...item} />
      </Grid>
    ))}
  </Grid>
)

const mapStateToProps = state => ({
  user: state.user,
  classes: state.classes.queryResult || {}
})

export default connect(mapStateToProps)(withStyles(s)(CourseList))
