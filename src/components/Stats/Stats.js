import React, {Component} from "react"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Grid from "../Grid"
import Paper from "../Paper"
import Round from "../Round"

import app, {services} from "../../client/api"

import {DEFAULT_PROFILE} from "../../constants/visual"

import s from "./Stats.scss"

const MODIFY = "SERVICES_SOCKET_FIND_FULFILLED"

const mapStateToProps = state => ({
  socket: state.socket,
  online: state.socket.queryResult || {},
  user: state.user,
  users: state.users.queryResult || {}
})

const mapDispatchToProps = dispatch => ({
  fetch: () => dispatch(services.socket.find()),
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
    this.props.fetch()
    app.service("socket").on("connected", this.handleJoin)
    app.service("socket").on("disconnected", this.handleLeft)
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
        <Grid r>
          <div>
            {this.props.online.count && (
              <h2>
                Online Users: {this.props.online.count}&nbsp;
                ({this.props.online.sessions} Connections)
              </h2>
            )}
          </div>
          {this.props.online.users && this.props.online.users.map((user, i) => (
            <Grid style={{marginBottom: "1em"}} xs={12} sm={4} md={3} lg={2} key={i}>
              <Paper>
                <Round src={user.photo || DEFAULT_PROFILE} size="3.5em" />
                <p className={s.profile}>
                  <span>{user.username || user._id}</span>
                </p>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Grid r>
          {this.props.users.data && this.props.users.data.map((user, i) => (
            <Grid style={{marginBottom: "1em"}} xs={12} sm={4} md={3} lg={2} key={i}>
              <Paper>
                <Round src={user.photo || DEFAULT_PROFILE} size="3.5em" />
                <p className={s.profile}>
                  <span>{user.username}</span>
                </p>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  )

}
