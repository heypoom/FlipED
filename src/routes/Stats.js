import React, {Component} from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"
import {connect} from "react-redux"
import concat from "lodash.concat"
import uniqBy from "lodash.uniqby"
import reject from "lodash.reject"

import Paper from "../components/Paper"
import Toolbar from "../components/Toolbar"
import Grid from "../components/Grid"
import Fab from "../components/Fab"
import Role from "../components/Role"
import Fa from "../components/Fa"
import StudentList from "../components/StudentList"
import StudentInfo from "../components/StudentInfo"
import TextField from "../components/TextField"
import Cover from "../components/Cover"

import {setOnlineUsers, setActionList} from "../actions/track"
import {setTitle, setNav} from "../actions/runtime"

import {ROLE} from "../constants"
import {app, TRACK_API, SOCKET_API} from "../constants/api"
import {PRIMARY_COLOR, SECONDARY_COLOR, CDN_URL} from "../constants/visual"
import {TRACK_TYPE_DESC, TRACK_PAYLOAD_DESC} from "../constants/track"

import s from "./Login.scss"

const skips = 5

const cardTop = {
  padding: "1em",
  color: "#fefefe",
  background: SECONDARY_COLOR,
  fontSize: "1.15em"
}

const topStyle = {
  marginTop: "0.5em"
}

class Stats extends Component {

  static contextTypes = {
    store: React.PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props)
    this.state = {
      search: "",
      studentId: context.store.getState().user._id,
      skip: 0
    }
  }

  componentDidMount = () => {
    app.service(SOCKET_API).on("connected", e => {
      this.props.setOnlineUsers({
        users: concat(this.props.online.users, e.user),
        count: e.count
      })
    })
    app.service(SOCKET_API).on("disconnected", e => {
      const users = this.props.online.users
      users.splice(users.indexOf(e.user), 1)
      this.props.setOnlineUsers({
        users: users,
        count: e.count
      })
    })
  }

  componentWillUnmount() {
    app.service(SOCKET_API).off("connected")
    app.service(SOCKET_API).off("disconnected")
  }

  skipNext = () => {
    if ((this.state.skip + skips) <= this.props.actions.total) {
      this.setState({skip: this.state.skip + skips})
      this.search(true)
    }
  }

  skipBack = () => {
    if ((this.state.skip - skips) >= 0) {
      this.setState({skip: this.state.skip - skips})
      this.search(true)
    }
  }

  search = (noReset) => {
    if (!noReset)
      this.setState({skip: 0})
    app.service(TRACK_API).find({
      query: {
        $skip: this.state.skip,
        $sort: {createdAt: -1},
        action: {
          $regex: this.state.search,
          $options: "ig"
        }
      }
    })
    .then(e => this.props.setActionList(e))
    .catch(e => swal("Error", e, "error"))
  }

  remove = (id) => {
    app.service(TRACK_API).remove(id).then(e => {
      this.props.setActionList({
        data: reject(this.props.actions.data, e),
        total: this.props.actions.total - 1
      })
    })
    .catch(e => swal("Error", e, "error"))
  }

  render = () => (
    <div>
      <Toolbar title="สถิติ" />
      <Grid c style={{paddingTop: "7.5em"}}>
        <Role is="teacher">
          <div>
            <Grid r>
              <Grid xs={12} sm={8}>
                {
                  [{
                    data: uniqBy(this.props.online.users, "_id"),
                    label: `ผู้ที่กำลังใช้งานอยู่ ${uniqBy(this.props.online.users, "_id").length} คน
                    (${this.props.online.count} การเชื่อมต่อ)`
                  }, {
                    data: this.props.users.data,
                    label: `ผู้ใช้งานทั้งหมด`
                  }].map((e, i) => (
                    <Paper key={i} style={topStyle} outerChild={<div style={cardTop}>{e.label}</div>}>
                      <Grid r>
                        <StudentList
                          data={e.data}
                          user={this.props.user}
                          onClick={d => this.setState({studentId: d})}
                          online={uniqBy(this.props.online.users, "_id")}
                        />
                      </Grid>
                    </Paper>
                  ))
                }
              </Grid>
              <Grid xs={12} sm={4}>
                <Paper
                  style={topStyle}
                  fontSize="1em"
                  outerChild={<div style={cardTop}>ข้อมูลส่วนตัว</div>}
                >
                  <Grid r>
                    <StudentInfo id={this.state.studentId} />
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <Paper style={{marginTop: "3.5em"}}>
              <Grid r>
                <Grid md={12}>
                  <Fab
                    onClick={this.skipNext}
                    shadow={this.state.skip + skips > this.props.actions.total && "none"}
                    position="absolute"
                    top="-2.3em"
                    color={this.state.skip + skips > this.props.actions.total && "#efefef"}
                    right="3.5em"
                    bottom="auto"
                  >
                    <Fa i="arrow-left" />
                  </Fab>
                </Grid>
              </Grid>
              <Grid md={12}>
                <Fab
                  onClick={this.skipBack}
                  shadow={this.state.skip - skips < 0 && "none"}
                  position="absolute"
                  top="-2.3em"
                  color={this.state.skip - skips < 0 && "#efefef"}
                  right="0em"
                  bottom="auto"
                >
                  <Fa i="arrow-right" />
                </Fab>
              </Grid>
              <TextField
                value={this.state.search}
                label={
                  `Search (${this.props.actions.total} Total - Skipping ${this.state.skip})`
                }
                onChange={v => {
                  this.setState({search: v.target.value})
                  this.search(false)
                }}
              />
            </Paper>
            {
              this.props.actions.data.map(action => (
                <Grid xs={12} sm={6} key={action._id}>
                  <Paper
                    style={{marginTop: "2.5em"}}
                    outerChild={
                      <div>
                        <div
                          style={{
                            padding: "1em",
                            color: "#fefefe",
                            background: PRIMARY_COLOR,
                            fontSize: "1.15em"
                          }}
                        >
                          ID: {action._id.toString()}
                        </div>
                        <Grid r>
                          <Grid md={12}>
                            <Fab
                              onClick={() => this.remove(action._id)}
                              position="absolute"
                              top="-3.4em"
                              right="1.5em"
                              bottom="auto"
                              secondary
                            >
                              <Fa i="trash" />
                            </Fab>
                          </Grid>
                        </Grid>
                      </div>
                    }
                  >
                    User {action.userId.username} {TRACK_TYPE_DESC[action.action]} <br />
                    {
                      this.props.user.hasOwnProperty("role") ?
                      TRACK_PAYLOAD_DESC[action.action].map((e, index) => (
                        <Grid key={index}>
                          {`${e.label}: ${action.payload[e.index]}`}
                          <br />
                        </Grid>
                      )) : null
                    }
                  </Paper>
                </Grid>
              ))
            }
          </div>
        </Role>
        <Role less="student">
          <Paper
            style={{position: "relative", margin: "auto"}}
            className={s.width}

            outerChild={
              <Cover
                marginBottom="0em"
                height="24em"
                textAlign="center"
                heading="ฟีเจอร์ยังไม่พร้อมใช้งาน"
                src={`${CDN_URL}/images/cover/july.jpg`}
              />
            }
          >
            <h2>ฟีเจอร์ยังไม่พร้อมใช้งาน</h2>
            <p>
              ในขณะนี้ คุณ {this.props.user.username} ยังไม่สามารถใช้งานความสามารถสถิติได้
              คุณ {this.props.user.username} จำเป็นต้องมีสิทธิ<b>ผู้สอน</b>เพื่อที่จะดูสถิติได้ครับ
              <br />สิทธิปัจจุบัน: <b>{ROLE[this.props.user.roles].th}</b>
            </p>
          </Paper>
        </Role>
      </Grid>
    </div>
  )

}

const mapStateToProps = state => ({
  user: state.user,
  users: state.track.users,
  online: state.track.online,
  actions: state.track.actions
})

const mapDispatchToProps = dispatch => ({
  setOnlineUsers: data => dispatch(setOnlineUsers(data)),
  setActionList: data => dispatch(setActionList(data)),
  setTitle: t => dispatch(setTitle(t)),
  setNav: t => dispatch(setNav(t))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Stats))
