import React, {Component} from "react"
import c from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import s from "./RippleIcon.scss"

class RippleIcon extends Component {

  constructor(props) {
    super(props)
    this.state = {click: false}
  }

  render = () => (
    <button
      className={c(s.cbutton, s[this.props.type || "radomir"], this.state.click && s.click)}
      onClick={() => this.setState({click: !this.state.click})}
    >
      <i
        className={c(s.icon, "fa", `fa-${this.props.i}`, this.props.o)}
        style={{color: this.props.color}}
        aria-hidden
      />
      {this.props.alt && <span className={c(s.alt)}>{this.props.alt}</span>}
    </button>
  )

}

export default withStyles(s)(RippleIcon)
