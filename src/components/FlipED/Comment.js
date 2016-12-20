import React, {Component} from "react"
import {connect} from "react-redux"

import concat from "lodash.concat"
import reject from "lodash.reject"

import {app} from "../constants/api"

import TextField from "./TextField"
import Fab from "./Fab"
// import Button from "./Button"
import Paper from "./Paper"
import Grid from "./Grid"
import Icon from "./Icon"

import {COMMENT_API, USER_API} from "../constants/api"
import {PRIMARY_COLOR, SECONDARY_COLOR} from "../constants/visual"

class Comment extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      message: ""
    }
    this.ObjectID = {}
  }

  componentDidMount = () => {
    const comment = app.service(COMMENT_API)

    this.load()

    comment.on("created", msg => {
      if (msg.for === this.props.for || "global") {
        const data = this.state.data
        app.service(USER_API).get(msg.owner).then(e => {
          msg.owner = e
          data.unshift(msg)
          this.setState({data: data})
        })
      }
    })

    comment.on("removed", msg => {
      if (msg.for === this.props.for || "global") {
        this.setState({data: reject(this.state.data, msg)})
      }
    })

    comment.on("patched", msg => {
      if (msg.for === this.props.for || "global") {
        this.setState({data: concat(this.state.data, msg)})
      }
    })
  }

  componentWillReceiveProps = props => this.load(props)

  componentWillUnmount = () => {
    app.service(COMMENT_API).off("created")
    app.service(COMMENT_API).off("removed")
    app.service(COMMENT_API).off("updated")
    app.service(COMMENT_API).off("patched")
  }


  load = (props = this.props) => {
    const comment = app.service(COMMENT_API)

    comment.find({
      query: {
        $sort: {createdAt: -1},
        for: props.for || "global"
      }
    }).then(e => this.setState({data: e.data}))
  }

  new = () => {
    this.setState({message: ""})
    app.service(COMMENT_API)
    .create({
      owner: this.props.user._id,
      message: this.state.message,
      for: this.props.for || "global"
    })
    .catch(e => swal("Error", e, "error"))
  }

  remove = id => {
    app.service(COMMENT_API).remove(id)
    .catch(e => swal("Error", e, "error"))
  }

  newComment = e => {
    if (e.key === "Enter") {
      if (this.state.message) {
        this.new()
      }
    }
  }

  render() {
    return (
      <div>
        <Grid r>
          <Grid md={12}>
            <Paper
              style={{marginTop: "1em"}}
              outerChild={
                <div
                  style={{
                    padding: "1em",
                    color: "#fefefe",
                    background: SECONDARY_COLOR,
                    fontSize: "1.15em"
                  }}
                >
                  แสดงความคิดเห็น
                </div>
              }
            >
              <TextField
                value={this.state.message}
                label="เพิ่มความคิดเห็นที่นี่เลย!"
                onChange={v => this.setState({message: v.target.value})}
                onKeyPress={this.newComment}
              />
            </Paper>
          </Grid>
        </Grid>
        <Grid r>
          {
            this.state.data.map((e, i) => (
              <Grid md={12} key={i}>
                <Paper
                  bottom="0em"
                  style={{marginTop: "4.5em"}}
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
                        ความคิดเห็นของ {e.owner.username}
                      </div>
                      {
                        (e.owner.username === this.props.user.username) ?
                        (
                          <Grid r>
                            <Grid md={12}>
                              <Fab
                                onClick={() => this.remove(e._id)}
                                position="absolute"
                                top="-3.4em"
                                right="1.5em"
                                bottom="auto"
                                secondary
                              >
                                <Icon i="trash" />
                              </Fab>
                            </Grid>
                          </Grid>
                        ) : null
                      }
                    </div>
                  }
                >
                  {e.message}
                </Paper>
              </Grid>
            ))
          }
        </Grid>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
