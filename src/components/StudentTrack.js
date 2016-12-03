import React, {Component} from "react"
import {app} from "../constants/api"

export default class StudentTrack extends Component {

  static contextTypes = {
    store: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount = () => {
    // NOTE: Deprecated.
  }

  render = () => {
    const store = this.context.store.getState()
    return (
      <div>

      </div>
    )
  }

}
