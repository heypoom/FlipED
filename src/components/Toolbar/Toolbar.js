import React, {Component} from "react"
import {Link} from "react-router"
import {connect} from "redux-await"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import s from "./Toolbar.scss"

// import Fa from "../Fa"
import {zLite} from "../Shadow"

import {APP_TITLE} from "../../constants"
import {PRIMARY_COLOR} from "../../constants/visual"

import {logout} from "../../actions/user"

class Toolbar extends Component {

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

  render = () => {
    const wrapper = {
      background: this.props.transparent ? "none" : this.props.background || PRIMARY_COLOR,
      position: this.props.fixed ? "fixed" : "absolute",
      boxShadow: this.props.transparent ? "none" : zLite
    }
    const title = {
      display: this.props.hideTitle ? "none" : "inline-block"
    }
    return (
      <div className={s.wrapper} style={wrapper}>
        <div className={s.left}>
          <Link to="/">
            <img
              className={s.logo}
              alt="Back"
              src="/images/flip_logo.svg"
            />
          </Link>
          <span
            className={s.title}
            style={title}
            onClick={() => history.go(-1)}
          >
            {this.props.title}
          </span>
        </div>
        <div className={s.nav}>
          <div
            className={s.profile}
            onClick={() => this.props.logout()}
            style={{backgroundImage: `url(${this.props.user.photo || "/images/icon/listening.svg"})`}}
          />
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Toolbar))
