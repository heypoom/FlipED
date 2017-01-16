import React, {Component} from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"
import c from "classnames"

import s from "./Round.scss"

@withStyles(s)
export default class RoundIcon extends Component {

  componentDidMount = () => {
    Waves.init()
  }

  render = () => (
    <div
      ref={ref => !this.props.n && Waves.attach(ref)}
      className={c(
        s.round,
        !this.props.n && "waves-light waves-block"
      )}
      onClick={this.props.onClick}
      style={{
        width: this.props.size,
        minWidth: this.props.size,
        height: this.props.size,
        minHeight: this.props.size,
        backgroundImage: `url(${this.props.src})`,
      }}
    />
  )

}
