import React, {Component} from "react"
import c from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import s from "./Button.scss"

@withStyles(s)
export default class Button extends Component {

  componentDidMount() {
    Waves.init()
  }

  render = () => (
    <button
      type={this.props.type}
      onClick={this.props.onClick}
      className={c(
        this.props.className,
        this.props.base && s.button,
        this.props.light && "waves-light"
      )}
      ref={ref => Waves.attach(ref)}
    >
      {this.props.children}
    </button>
  )

}
