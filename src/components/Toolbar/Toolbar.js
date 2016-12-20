import React, {Component} from "react"
import {Link} from "react-router"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"

/*
<Navbar color="faded" light>
  <NavbarBrand>
    <Link to="/">
      <img
        className={s.logo}
        alt="Back"
        src="/images/flip_logo.svg"
      />
    </Link>
  </NavbarBrand>
  <Nav className="float-xs-right" navbar>
    <NavItem>
      <NavLink href="/components/">Components</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="https://nigga.co">Nigga</NavLink>
    </NavItem>
    <NavItem>
      <div
        style={{
          backgroundImage: `url(/images/icon/listening.svg)`,
        }}
        className={s.profile}
      />
    </NavItem>
  </Nav>
</Navbar>
*/

import s from "./Toolbar.scss"

import {APP_TITLE} from "../../constants"

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

  render = () => (
    <div>
      ...
    </div>
  )

}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Toolbar))
