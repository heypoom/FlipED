import React, {Component} from "react"
import {connect} from "react-redux"
import {Link} from "react-router"

import GridList from "./GridList"
import Paper from "./Paper"
import TextField from "./TextField"

import {services, CLASS_URL} from "../constants/api"
import {addMessage, servicesGet} from "../actions/chat"

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

const CustomClassList = props => {
  const Wrapper = props.c
  return (
    <div>
      {
        props.class ? props.class.data.map(({name, description, thumbnail, color, _id}, i) => (
          <Wrapper type="card" key={i}>
            <div
              onClick={() => {
                props.dispatch(addMessage(`ไปที่ห้องเรียน ${name}`, 0))
                props.dispatch(servicesGet("api/classes", _id,
                  {type: "NOTIFY", payload: "Hello!"}, {}))
              }}
              className="waves waves-light waves-block"
            >
              <div
                style={{
                  height: "10em",
                  backgroundImage: `url(${thumbnail})`,
                  backgroundSize: "cover"
                }}
              />
              <span>{name}</span>
              <span>{description}</span>
            </div>
          </Wrapper>
        )) : null
      }
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

export const WidgetClassList = connect(mapStateToProps, mapDispatchToProps)(CustomClassList)

export default connect(mapStateToProps, mapDispatchToProps)(ClassList)
