import React, {Component} from "react"
import {connect} from "react-redux"
import {Link} from "react-router"

import {services} from "../client/api"
import {CLASS_URL} from "../constants/api"
import {setField} from "../actions/app"
import {addMessage, servicesGet} from "../actions/chat"

const mapStateToProps = state => ({
  user: state.user,
  searchField: state.app.fields.SEARCH_CLASS,
  class: state.class.queryResult
})

const mapDispatchToProps = dispatch => ({
  search: (query = "") => {
    dispatch(setField("SEARCH_CLASS", query))
    dispatch(services.class.find({
      query: {
        $select: ["_id", "name", "description", "thumbnail", "owner", "color"],
        name: {
          $regex: query,
          $options: "ig"
        }
      }
    }))
  }
})

@connect(mapStateToProps, mapDispatchToProps)
export default class ClassList extends Component {

  componentDidMount = () => {
    this.props.search()
  }

  render = () => (
    <div style={this.props.style}>
      <Paper style={{marginTop: this.props.top}}>
        <TextField
          label="ค้นหาห้องเรียน"
          value={this.props.searchField}
          onChange={v => this.props.search(v.target.value)}
        />
      </Paper>
      <GridList
        data={this.props.class.data}
        url={CLASS_URL}
        cLink="/create"
        cTitle="สร้างห้องเรียน"
      />
    </div>
  )

}

export const WidgetClassList = connect(mapStateToProps, mapDispatchToProps)(props => {
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
})
