import React, {Component} from "react"
// import {Link} from "react-router"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import s from "./Toolbar.scss"

import {APP_TITLE} from "../../constants"
import {logout} from "../../actions/user"

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

@connect(mapStateToProps, mapDispatchToProps)
@withStyles(s)
export default class Toolbar extends Component {

  static contextTypes = {
    setTitle: React.PropTypes.func.isRequired,
  }

  constructor(props, context) {
    super(props)
    context.setTitle(`${props.title} - ${APP_TITLE}`)
  }

  componentWillReceiveProps = props => {
    this.context.setTitle(`${props.title} - ${APP_TITLE}`)
  }

  render = () => (
    <div>
      ...
    </div>
  )

}
