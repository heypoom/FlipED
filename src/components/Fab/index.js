import React, {Component} from "react"
import c from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import s from "./Fab.scss"

@withStyles(s)
export default class Fab extends Component {

  componentDidMount = () => {
    Waves.init()
  }

  render = () => (
    <div
      className={c(s.fab, "waves-light", this.props.secondary && s.secondary)}
      ref={ref => Waves.attach(ref)}
      {...this.props}
    >
      {this.props.children}
    </div>
  )

}
