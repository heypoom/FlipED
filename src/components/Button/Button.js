import React, {Component} from "react"
import c from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import s from "./Button.scss"

const smallSize = "2.5em"
const largeSize = "54px"

class Button extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    Waves.init()
    Waves.attach(this.refs.button)
  }

  render = () => (
    <button
      onClick={this.props.onClick}
      className={c(
        s.button,
        "waves-float",
        this.props.secondary && s.secondary,
        this.props.light && "waves-light"
      )}
      style={Object.assign({
        color: this.props.color || "white",
        background: this.props.background,
        height: this.props.height || (this.props.large ? largeSize : smallSize),
        fontSize: this.props.fontSize || "1.1em",
        lineHeight: this.props.lineHeight || (this.props.large ? largeSize : smallSize),
        fontWeight: 500,
        width: this.props.block ? "100%" : this.props.width,
        boxShadow: this.props.shadow || "0 1px 1.5px 1px rgba(0,0,0,.12)"
      }, this.props.style || {})}
      ref="button"
    >
      {this.props.children}
    </button>
  )
}


export default withStyles(s)(Button)
