import React from "react"
import {connect} from "react-redux"

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
  minHeight: "16em"
}

const CourseList = props => (
  <Grid r>
    <Grid style={{marginBottom: "1.5em"}} xs={12} sm={6} md={3}>
      <Paper
        cover={{height: "25%", src: DEFAULT_IMAGE}}
        footer="เข้าร่วมคอร์สอื่น"
        fClick={() => props.enroll("")}
        cardStyle={card}
      >
        <h2 style={h2}>สร้างคอร์สของคุณ</h2>
        <p style={p}>
          รู้หรือไม่ว่าคุณก็สร้างคอร์สของตัวเองได้ ลองสร้างเลยสิครับ!
        </p>
      </Paper>
    </Grid>
    {props.class && props.class.data.map((item, i) => (
      <Grid style={{marginBottom: "1.5em"}} key={i} xs={12} sm={6} md={3}>
        <Paper
          cover={{height: "25%", src: item.thumbnail}}
          footer="เข้าสู่คอร์ส"
          fClick={() => props.enter(item._id, item.name)}
          cardStyle={{minHeight: "16em"}}
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
  class: state.classes.queryResult
})

const mapDispatchToProps = dispatch => ({
  enroll: () => dispatch(setSnackbar(`504 Not Implemented.`)),
  enter: (id, name) => {
    dispatch(setSnackbar(`กำลังเข้าสู่คอร์ส ${name}`))
    dispatch(services.classes.get(id))
    dispatch(services.lessons.find({query: {parentCourse: id}}))
    dispatch(services.userstate.create({CURRENT_COURSE: id}))
    setTimeout(() => dispatch(setUi("dashTab", "home")), 150)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CourseList)
