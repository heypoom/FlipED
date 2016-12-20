import React, {Component} from "react"
import c from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import s from "./Button.scss"

const smallSize = "2.5em"
const largeSize = "54px"

class Button extends Component {

  componentDidMount() {
    Waves.init()
    Waves.attach(this.refs.button)
  }

  render = () => (
    <button
      type={this.props.type}
      onClick={this.props.onClick}
      className={c(
        s.button,
        "waves-float",
        this.props.secondary && s.secondary,
        this.props.light && "waves-light"
      )}
      style={Object.assign({
        color: this.props.color,
        background: this.props.background,
        fontSize: this.props.fontSize,
        height: this.props.height || (this.props.large ? largeSize : smallSize),
        lineHeight: this.props.lineHeight || (this.props.large ? largeSize : smallSize),
        width: this.props.block ? "100%" : this.props.width
      }, this.props.style || {})}
      ref="button"
    >
      {this.props.children}
    </button>
  )
}


export default withStyles(s)(Button)
