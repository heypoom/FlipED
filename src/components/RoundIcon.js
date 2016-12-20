import React, {Component} from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"
import c from "classnames"

import s from "./Shadow/Shadow.scss"

@withStyles(s)
export default class RoundIcon extends Component {

  componentDidMount = () => {
    Waves.init()
    Waves.attach(this.refs.icon)
  }

  render = () => (
    <div
      ref="icon"
      className={c(
        this.props.className,
        s.z1,
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
        textAlign: "center",
        marginBottom: this.props.bottom || "1em",
        WebkitFilter: this.props.filter,
        filter: this.props.filter,
        cursor: this.props.cursor || "pointer"
      }}
    />
  )

}
