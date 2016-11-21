import React, {Component} from "react"
import {connect} from "redux-await"

import concat from "lodash.concat"
import reject from "lodash.reject"

import GridList from "./GridList"
import Paper from "./Paper"
import TextField from "./TextField"
import Cover from "./Cover"

import app from "../client/feathers"

import {setClassList, search} from "../actions/classes"

import {CLASS_API, CLASS_URL} from "../constants/api"
import {CDN_URL} from "../constants/visual"

class ClassList extends Component {

  static contextTypes = {
    store: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      search: "",
      addClass: false
    }
  }

  componentDidMount = () => {
    Waves.init()
    Waves.attach(".waves") // TODO: Use refs instead of className.
    if (this.props.classes.data) {
      if (typeof this.props.classes.data[0] === "undefined") {
        if (this.props.user.hasOwnProperty("_id")) {
          this.search("")
        }
      }
    }

    const classes = app.service(CLASS_API)
    classes.on("created", res => {
      const c = this.props.classes
      c.data = concat(c.data, res)
      c.total += 1
      this.props.setClassList(c)
    })
    classes.on("patched", () => {
      this.search("")
    })
    classes.on("removed", res => {
      const c = this.props.classes
      c.data = reject(c.data, res)
      c.total -= 1
      this.props.setClassList(c)
    })
  }

  componentWillReceiveProps = props => {
    if (props.status === "success") {
      Waves.attach(".waves")
    } else if (props.status === "failure") {
      console.error(props.status, props.error)
    }
  }

  componentWillUnmount = () => {
    ["created", "removed", "patched"].forEach(e => app.service(CLASS_API).off(e))
  }

  search = query => {
    this.setState({search: query})
    this.props.search(query)
  }

  render = () => (
    <div style={this.props.style}>
      <Paper style={{marginTop: this.props.top}}>
        <TextField
          label="ค้นหาห้องเรียน"
          value={this.state.search}
          onChange={v => this.search(v.target.value)}
        />
      </Paper>
      <GridList
        data={this.props.classes.data}
        url={CLASS_URL}
        create="/create"
        cTitle="สร้างห้องเรียน"
      />
    </div>
  )

}

/*
  outerChild={
    <Cover
      marginBottom="0em"
      height="15em"
      textAlign="center"
      position="50% 75%"
      heading={`หน้าหลักของ ${this.props.user.username}`}
      src={`${CDN_URL}/images/cover/july.jpg`}
    />
  }
*/

const mapStateToProps = state => ({
  classes: state.classes.list,
  user: state.user,
  status: state.await.statuses.classSearch,
  error: state.await.errors.classSearch
})

const mapDispatchToProps = dispatch => ({
  setClassList: data => dispatch(setClassList(data)),
  search: query => dispatch(search(query))
})

export default connect(mapStateToProps, mapDispatchToProps)(ClassList)
