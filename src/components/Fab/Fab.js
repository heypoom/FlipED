import React, {Component} from "react"
import c from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import s from "./Fab.scss"

class Fab extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    Waves.init()
    Waves.attach(this.refs.fab)
  }

  render = () => (
    <div
      onClick={this.props.onClick}
      className={c(
        s.fab,
        this.props.secondary && s.secondary,
        "waves-light",
        "waves-float"
      )}
      style={{
        position: this.props.position || "fixed",
        left: this.props.left,
        top: this.props.top,
        right: this.props.right,
        bottom: this.props.bottom,
        width: this.props.width,
        height: this.props.height,
        lineHeight: this.props.lineHeight,
        background: this.props.color,
        color: this.props.textColor,
      }}
      ref="fab"
    >
      {this.props.children}
    </div>
  )
}

export default withStyles(s)(Fab)
