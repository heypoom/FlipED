import React, {Component} from "react"

import app from "../client/feathers"

import Fi from "./Fi"
import Grid from "./Grid"

import {ROLE} from "../constants"
import {USER_API, TRACK_API} from "../constants/api"

export default class StudentInfo extends Component {

  static contextTypes = {
    store: React.PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props)
    this.state = {
      data: context.store.getState().user,
      track: context.store.getState().track.actions
    }
  }

  componentWillReceiveProps = props => this.update(props)

  setRole = () => {
    const role = this.state.data.roles
    let newRole
    if (role === "none") {
      newRole = "guest"
    } else if (role === "guest") {
      newRole = "student"
    } else if (role === "student") {
      newRole = "teacher"
    } else if (role === "teacher") {
      newRole = "admin"
    } else if (role === "admin") {
      newRole = "guest"
    }
    app.service(USER_API).patch(this.state.data.id, {roles: newRole}).then(() => {
      this.update(this.props)
    })
  }

  update = props => {
    app.service(USER_API).get(props.id).then(e => {
      this.setState({data: e})
    })
    app.service(TRACK_API).find({
      query: {
        userId: props.id
      }
    }).then(e => this.setState({track: e}))
  }

  render = () => (
    <Grid>
      <Fi src={this.state.data.photo} size="5em" />
      <div style={{textAlign: "center", margin: "0 auto"}}>
        <p>ชื่อนักเรียน: {this.state.data.username}</p>
        <p>อีเมล์: {this.state.data.email}</p>
        <p onClick={this.setRole}>สิทธิ: {ROLE[this.state.data.roles].th}</p>
      </div>
    </Grid>
  )
}
