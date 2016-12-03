import React, {Component} from "react"
import {connect} from "react-redux"

import GridList from "./GridList"
import Paper from "./Paper"
import TextField from "./TextField"

import {services, CLASS_URL} from "../constants/api"

class ClassList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      search: "",
      addClass: false
    }
  }

  componentDidMount = () => {
    this.props.search("")
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
        data={this.props.class.data}
        url={CLASS_URL}
        create="/create"
        cTitle="สร้างห้องเรียน"
      />
    </div>
  )

}

const mapStateToProps = state => ({
  user: state.user,
  class: state.class.queryResult
})

const mapDispatchToProps = dispatch => ({
  search: query => dispatch(services.class.find({
    query: {
      $select: ["_id", "name", "description", "thumbnail", "owner", "color"],
      name: {
        $regex: query,
        $options: "ig"
      }
    }
  }))
})

export default connect(mapStateToProps, mapDispatchToProps)(ClassList)
