import React, {Component} from "react"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Grid from "../Grid"
import Paper from "../Paper"
import Round from "../Round"

import app, {services} from "../../client/api"
import {setSnackbar} from "../../actions/app"

import {ROLE} from "../../constants/roles"
import {DEFAULT_PROFILE} from "../../constants/visual"

import s from "./Stats.scss"

const MODIFY = "SERVICES_SOCKET_FIND_FULFILLED"

const UserList = withStyles(s)(({user, approve}) => (
  <Grid style={{marginBottom: "1em"}} xs={12} sm={4} md={3} lg={2}>
    <Paper>
      <Round
        src={user.photo || DEFAULT_PROFILE}
        onClick={() => approve(user._id, user.roles)}
        size="3.5em"
      />
      <p className={s.profile}>
        <b><span>{user.username || user._id}</span></b> <br />
        <span>{user.roles ? ROLE[user.roles].th : "ผู้เยี่ยมชม"}</span>
      </p>
    </Paper>
  </Grid>
))

const mapStateToProps = state => ({
  socket: state.socket,
  online: state.socket.queryResult || {},
  user: state.user,
  users: state.users.queryResult || {}
})

const mapDispatchToProps = dispatch => ({
  fetch: () => dispatch(services.socket.find()),
  approve: (id, role) => {
    if (role) {
      const roles = role === "admin" ? "guest" : Object.keys(ROLE)[ROLE[role].perm + 1]
      dispatch(setSnackbar(`ปรับปรุงสิทธิการใช้งานเป็น${ROLE[roles].th}แล้วครับ`))
      dispatch(services.users.patch(id, {roles}))
      dispatch(services.users.find())
      dispatch(services.socket.find())
    } else {
      dispatch(setSnackbar("ไม่สามารถเพิ่มสิทธิให้ผู้เยี่ยมชมได้"))
    }
  },
  handleJoin: (ev, online) => {
    if (online) {
      const payload = online
      payload.count = ev.count
      payload.users = payload.users ? payload.users.concat(ev.user) : [ev.user]
      console.log("SOCKET::JOIN", {event: ev, before: online, after: payload})
      dispatch({type: MODIFY, payload})
    }
  },
  handleLeft: (ev, online) => {
    if (online) {
      const payload = online
      payload.count = ev.count
      payload.users = payload.users ?
        payload.users.filter(user => user._id !== ev.user._id) : []
      console.log("SOCKET::LEFT", {event: ev, before: online, after: payload})
      dispatch({type: MODIFY, payload})
    }
  }
})

@connect(mapStateToProps, mapDispatchToProps)
@withStyles(s)
export default class Stats extends Component {

  componentDidMount() {
    app.service("socket").on("connected", this.props.fetch)
    app.service("socket").on("disconnected", this.props.fetch)
  }

  componentWillUnmount() {
    app.service("socket").off("connected")
    app.service("socket").off("disconnected")
  }

  handleJoin = ev => this.props.handleJoin(ev, this.props.online)
  handleLeft = ev => this.props.handleLeft(ev, this.props.online)

  render = () => (
    <div>
      <Grid c>
        <Grid style={{marginBottom: "1.5em"}} r>
          <Grid xs={12}>
            <Paper>
              {this.props.online.count && (
                <h2 style={{lineHeight: "1.3em"}}>
                  Online Users: {this.props.online.count}&nbsp;
                  ({this.props.online.sessions} Connections)
                </h2>
              )}
            </Paper>
          </Grid>
        </Grid>
        <Grid r>
          {this.props.online.users && this.props.online.users.map((user, i) => (
            <UserList user={user} approve={this.props.approve} key={i} />
          ))}
        </Grid>
        <Grid r>
          {this.props.users.data && this.props.users.data.map((user, i) => (
            <UserList user={user} approve={this.props.approve} key={i} />
          ))}
        </Grid>
      </Grid>
    </div>
  )

}
