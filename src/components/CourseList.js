import React, {Component} from "react"
import {connect} from "react-redux"

import FlatButton from "material-ui/FlatButton"
import TextField from "material-ui/TextField"

import Shadow from "./Shadow"
import Grid from "./Grid"
import Paper from "./Paper"

import {services, reAuth} from "../client/api"
import {setSnackbar, setUi} from "../actions/app"

/*
<Grid r>
  <Grid xs={12} sm={6}>
    <Shadow depth="z">
      <TextField name="Node" />
    </Shadow>
  </Grid>
</Grid>
*/

const mapStateToProps = state => ({
  class: state.classes.queryResult,
})

const mapDispatchToProps = dispatch => ({
  enroll: () => dispatch(setSnackbar(`504 Not Implemented.`)),
  enter: (id, name) => {
    dispatch(setSnackbar(`กำลังเข้าสู่คอร์ส ${name}`))
    dispatch(setUi("dashTab", "home"))
    dispatch(services.classes.get(id))
    dispatch(services.lessons.find({query: {parentCourse: id}}))
    dispatch(services.userstate.create({CURRENT_COURSE: id}))
  },
  find: () => {
    // reAuth()
    // dispatch(services.class.find())
  },
})

@connect(mapStateToProps, mapDispatchToProps)
export default class CourseList extends Component {

  componentDidMount() {
    // reAuth()
    // this.props.find()
  }

  render = () => (
    <div>
      <Grid r>
        <Grid style={{marginBottom: "1.5em"}} xs={12} sm={6} md={3}>
          <Paper
            depth="z-flow"
            cover={{height: "25%", src: `/images/cover/june.jpg`, card: true}}
            footer="เข้าร่วมคอร์สอื่น"
            fClick={() => this.props.enroll("")}
            cardStyle={{minHeight: "16em"}}
            anim
          >
            <h2 style={{textTransform: "capitalize"}}>เข้าร่วมคอร์สอื่น</h2>
            <p>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti.
            </p>
          </Paper>
        </Grid>
        {this.props.class && this.props.class.data.map((item, i) => (
          <Grid style={{marginBottom: "1.5em"}} key={i} xs={12} sm={6} md={3}>
            <Paper
              depth="z-flow"
              cover={{height: "25%", src: item.thumbnail, card: true}}
              footer="เข้าสู่คอร์ส"
              fClick={() => this.props.enter(item._id, item.name)}
              cardStyle={{minHeight: "16em"}}
              fSuccess anim
            >
              <h2 style={{textTransform: "capitalize"}}>{item.name}</h2>
              <p>
                {item.description}
              </p>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  )

}
