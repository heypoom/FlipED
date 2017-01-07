import React, {Component} from "react"
import {connect} from "react-redux"
import c from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Icon from "./Icon"
import Searchbar from "./Searchbar"
import Grid from "../../components/Grid"

import {ROLE} from "../../constants/roles"
import app, {services} from "../../client/api"
import {setUi, setSnackbar} from "../../actions/app"

import s from "./UserList.scss"

const UserCard = withStyles(s)(props => (
  <div className={s.card}>
    <div className={s.cardTop}>
      <div>
        <Grid r>
          <Grid xs={3}>
            <div
              className={s.cardProfile}
              style={{backgroundImage: `url(${props.photo})`}}
            />
          </Grid>
          <Grid style={{padding: 0}} xs={6}>
            <div className={s.cardProfileText}>
              <h2>{props.username || props._id}</h2>
              <h3>{props.roles ? ROLE[props.roles].th : "ผู้เยี่ยมชม"}</h3>
            </div>
          </Grid>
          <Grid xs={3}>
            <div className={c(s.cardIndicator, props.online && s.online)}>
              <Icon i={props.online ? "wifiOn" : "wifiOff"} />
            </div>
          </Grid>
        </Grid>
      </div>
      <div style={{marginTop: "2em"}}>
        <Grid r>
          <Grid xs={6}>
            <div className={s.cardStats}>
              <Icon i="backInTime" fill="#1770FB" />
              15 Times
            </div>
          </Grid>
          <Grid xs={6}>
            <div className={s.cardStats}>
              <Icon i="error" fill="#7561EC" />
              Score
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
    <div className={s.cardBody}>
      E-mail: {props.email}

    </div>
    <div className={s.cardAction}>
      <Grid r>
        <Grid xs={6}>
          <div onClick={props.elevate} className={s.cardCta}>
            ปรับปรุงสิทธิ
          </div>
        </Grid>
        <Grid xs={6}>
          <div className={s.cardCta}>
            แก้ไข
          </div>
        </Grid>
      </Grid>
    </div>
  </div>
))

const USER_QUERY = {
  query: {
    $select: ["_id", "username", "photo", "roles", "email"]
  }
}

const mapStateToProps = state => ({
  socket: state.socket,
  online: state.socket.queryResult ? state.socket.queryResult.online : [],
  user: state.user,
  users: state.users.queryResult || {},
  search: state.app.ui.studentSearch || "",
  filter: state.app.ui.studentFilter || "username"
})

const mapDispatchToProps = dispatch => ({
  getOnline: () => dispatch(services.socket.find()),
  getUsers: () => dispatch(services.users.find(USER_QUERY)),
  elevate: (id, role) => {
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
  handleSearch: (value, filter) => {
    dispatch(setUi("studentSearch", value))
    dispatch(services.users.find({
      query: {
        [filter || "username"]: {
          $regex: value,
          $options: "ig"
        },
      }
    }))
    dispatch(services.socket.find())
  },
  toggleFilter: filter => {
    switch (filter) {
      case "username":
        dispatch(setUi("studentFilter", "email"))
        break
      case "email":
        dispatch(setUi("studentFilter", "roles"))
        break
      case "roles":
        dispatch(setUi("studentFilter", "username"))
        break
      default:
        break
    }
  },
  addStudent: () => {
    dispatch(setSnackbar("สร้างบัญชีผู้ใช้เสร็จแล้วครับ"))
  }
})

const onlineFirst = (arr, online) => {
  const data = arr
  data.forEach((item, i) => {
    if (online[item._id]) {
      data.splice(i, 1)
      data.unshift(item)
    }
  })
  return data
}

@connect(mapStateToProps, mapDispatchToProps)
export default class UserList extends Component {

  componentDidMount() {
    this.props.getOnline()
    app.service("socket").on("connected", this.props.getOnline)
    app.service("socket").on("disconnected", this.props.getOnline)
    app.service("users").on("patched", this.props.getUsers)
    app.service("users").on("created", this.props.getUsers)
  }

  componentWillUnmount() {
    app.service("socket").off("connected")
    app.service("socket").off("disconnected")
    app.service("users").off("created")
  }

  render = () => (
    <div>
      <Searchbar
        onSearch={this.props.handleSearch}
        value={this.props.search}
        onFilterToggle={() => this.props.toggleFilter(this.props.filter)}
        filter={this.props.filter}
        btn={this.props.addStudent}
        btnText="Add Students"
      />
      <Grid r>
        {this.props.users.data &&
          onlineFirst(this.props.users.data, this.props.online).map((user, i) => (
            <Grid style={{marginBottom: "2em"}} xs={12} sm={6} md={4} key={i}>
              <UserCard
                online={this.props.online[user._id]}
                elevate={() => this.props.elevate(user._id, user.roles)}
                {...user}
              />
            </Grid>
          ))
        }
      </Grid>
    </div>
  )

}
