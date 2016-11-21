import React, {Component} from "react"
import c from "classnames"

import {z1} from "./Shadow"

// Flat circular icon module
// tabIndex={-1}

export default class Fi extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount = () => {
    Waves.init()
    Waves.attach(this.refs.icon)
  }

  render = () => (
    <div
      ref="icon"
      className={c(
        this.props.className,
        "waves-light",
        "waves-circle",
        "waves-float",
        "waves-block"
      )}
      onClick={this.props.onClick}
      style={{
        width: this.props.size ? this.props.size : this.props.width || "6em",
        height: this.props.size ? this.props.size : this.props.height || "6em",
        backgroundColor: this.props.color,
        backgroundImage: `url(${this.props.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "round",
        margin: "auto",
        borderRadius: this.props.round || "50%",
        boxShadow: this.props.shadow || z1,
        textAlign: "center",
        marginBottom: this.props.bottom || "1em",
        WebkitFilter: this.props.filter,
        filter: this.props.filter,
        cursor: this.props.cursor || "pointer"
      }}
    />
  )

}
