import React, {Component} from "react"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import UserCard from "../../components/UserCard"
import Searchbar from "../../components/Searchbar"
import Grid from "../../components/Grid"

import app, {services} from "../../client/api"
import {setUi} from "../../actions/app"

import s from "./UserList.scss"

const mapStateToProps = state => ({
  socket: state.socket,
  online: state.socket.queryResult ? state.socket.queryResult.online : [],
  user: state.user,
  students: state.students.queryResult ? state.students.queryResult.data : {},
  search: state.app.ui.studentSearch || "",
  filter: state.app.ui.studentFilter || "username"
})

const mapDispatchToProps = dispatch => ({
  getOnline: () => dispatch(services.socket.find()),
  getUsers: () => dispatch(services.students.find()),
  handleSearch: (value) => {
    dispatch(setUi("studentSearch", value))
    dispatch(services.students.find())
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
@withStyles(s)
export default class Students extends Component {

  componentDidMount() {
    this.props.getUsers()
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
    <div className={s.main}>
      <Searchbar
        searchText="ค้นหารายชื่อผู้ใช้งาน"
        onSearch={this.props.handleSearch}
        value={this.props.search}
        onFilterToggle={() => this.props.toggleFilter(this.props.filter)}
        filter={this.props.filter}
        btn={() => ({})}
        btnText="การตั้งค่าเพิ่มเติม"
        hr top
      />
      <div>
        {
          Array.isArray(this.props.students) && this.props.students.map((c, index) => (
            <Grid key={index} r>
              {
                onlineFirst(c.owner, this.props.online).map((user, i) => (
                  <Grid style={{marginBottom: "2em"}} xs={12} sm={6} md={4} key={i}>
                    <UserCard
                      online={this.props.online[user._id]}
                      {...user}
                    />
                  </Grid>
                ))
              }
              {
                onlineFirst(c.students, this.props.online).map((user, i) => (
                  <Grid style={{marginBottom: "2em"}} xs={12} sm={6} md={4} key={i}>
                    <UserCard
                      online={this.props.online[user._id]}
                      {...user}
                    />
                  </Grid>
                ))
              }
            </Grid>
          ))
        }
      </div>
    </div>
  )

}
