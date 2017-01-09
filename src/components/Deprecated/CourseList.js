import React from "react"
import {connect} from "react-redux"
import {push} from "connected-react-router"

import Grid from "./Grid"
import Paper from "./Paper"

import {services} from "../client/api"
import {setSnackbar, setUi} from "../actions/app"
import {DEFAULT_IMAGE} from "../constants/visual"

const h2 = {
  fontWeight: 300,
  textTransform: "capitalize",
  margin: 0,
  lineHeight: "1.2em"
}

const p = {
  color: "grey"
}

const card = {
  minHeight: "12em"
}

const CourseList = props => (
  <Grid r>
    {props.class && props.class.data.map((item, i) => (
      <Grid style={{marginBottom: "1.5em"}} key={i} xs={12} sm={6} md={3}>
        <Paper
          style={{cursor: "pointer"}}
          onClick={() => props.enter(item._id, item.name)}
          cover={{height: "25%", src: item.thumbnail}}
          footer="เข้าสู่คอร์ส"
          cardStyle={card}
          fSuccess
        >
          <h2 style={h2}>{item.name}</h2>
          <p style={p}>{item.description}</p>
        </Paper>
      </Grid>
    ))}
  </Grid>
)

const mapStateToProps = state => ({
  user: state.user,
  class: state.classes.queryResult
})

const mapDispatchToProps = dispatch => ({
  enroll: () => dispatch(setSnackbar(`504 Not Implemented.`)),
  enter: (id, name) => {
    dispatch(setSnackbar(`กำลังเข้าสู่คอร์ส ${name}`))
    dispatch(services.classes.get(id))
    dispatch(services.lessons.find({query: {course: id}}))
    dispatch(services.userstate.create({CURRENT_COURSE: id}))
    setTimeout(() => dispatch(setUi("dashTab", "home")), 150)
  },
  create: user => {
    dispatch(services.classes.create({
      name: `คอร์สใหม่ โดย ${user.username}`,
      description: "คำอธิบายคอร์ส",
      thumbnail: DEFAULT_IMAGE,
      owner: user._id
    }))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CourseList)
