import React, {Component} from "react"
import {connect} from "react-redux"
import c from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"
import Tooltip from "react-tooltip"

import Icon from "../../components/Icon"
import Searchbar from "../../components/Searchbar"
import Grid from "../../components/Grid"

import {ROLE} from "../../constants/roles"

import app, {services} from "../../client/api"
import {setUi, setSnackbar} from "../../actions/app"

import s from "./UserList.scss"

// const Tooltip = () => <div />

const stats = [{
  time: "14:04",
  type: "Course",
  info: "Allahu Akbar with Pmc",
  note: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.`,
  icon: "Courses"
}, {
  time: "10:04",
  type: "Navigation",
  info: "Visits Dashboard",
  note: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.`,
  icon: "Dashboard"
}, {
  time: "8:04",
  type: "Connectivity",
  info: "Online",
  note: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.`,
  icon: "wifiOn"
}]

const CardStats = withStyles(s)(props => (
  <div className={s.stats}>
    {
      stats.map((stat, i) => (
        <div className={s.stat} key={i}>
          <div className={s.indicator} />
          <div className={s.date}>
            {stat.time}
          </div>
          <div className={s.info}>
            <div className={s.catIcon}>
              <Icon i={stat.icon || "Courses"} />
            </div>
            <div className={s.detail}>
              <h3>{stat.type}</h3>
              <h2>{stat.info}</h2>
              <small>{stat.note}</small>
            </div>
          </div>
          <div className={s.line} />
        </div>
      ))
    }
  </div>
))

const UserCard = withStyles(s)(props => (
  <div className={s.card}>
    <Tooltip place="top" type="dark" effect="float" />
    <div className={s.cardTop}>
      <div>
        <Grid r>
          <Grid xs={3}>
            <div
              data-tip={`รูปโปรไฟล์ของผู้ใช้ ${props.username}`}
              className={s.cardProfile}
              style={{backgroundImage: `url(${props.photo})`}}
            />
          </Grid>
          <Grid style={{padding: 0}} xs={6}>
            <div
              data-tip={`${props.username} อยู่ในสถานะ${props.roles ? ROLE[props.roles].th : "ผู้เยี่ยมชม"}ครับ`}
              className={s.cardProfileText}
            >
              <h2>{props.username || props._id}</h2>
              <h3>{props.roles ? ROLE[props.roles].th : "ผู้เยี่ยมชม"}</h3>
              <h3>{props.email}</h3>
            </div>
          </Grid>
          <Grid xs={3}>
            <div
              data-tip={`ผู้ใช้ ${props.username} ${props.online ? "กำลัง" : "ไม่ได้"}ใช้งานอยู่ครับ`}
              className={c(s.cardIndicator, props.online && s.online)}
            >
              <Icon i={props.online ? "wifiOn" : "wifiOff"} />
            </div>
          </Grid>
        </Grid>
      </div>
      <div className={s.cardStatsWrapper}>
        <Grid r>
          <Grid xs={6}>
            <div className={s.cardStats}>
              <Icon i="backInTime" fill="#1770FB" />
              <span>15 Times</span>
            </div>
          </Grid>
          <Grid xs={6}>
            <div className={s.cardStats}>
              <Icon i="search" fill="#7561EC" />
              <span>Score</span>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
    <div className={s.cardBody}>
      <CardStats />
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
    dispatch(setSnackbar("ความสามารถนี้ยังไม่พร้อมใช้งานในขณะนี้ (503: Not Implemented)"))
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
    <div className={s.main}>
      <Searchbar
        searchText="ค้นหารายชื่อผู้ใช้งาน"
        onSearch={this.props.handleSearch}
        value={this.props.search}
        onFilterToggle={() => this.props.toggleFilter(this.props.filter)}
        filter={this.props.filter}
        btn={this.props.addStudent}
        btnText="การตั้งค่าเพิ่มเติม"
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
