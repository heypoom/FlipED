import React from "react"
import {Link} from "react-router"
import {connect} from "react-redux"

import AppBar from "material-ui/AppBar"
import IconButton from "material-ui/IconButton"
import NavigationMenu from "material-ui/svg-icons/navigation/menu"

import Round from "../Round"
import NavCard from "./NavCard"

import {APP_TITLE} from "../../constants"
import {DEFAULT_PROFILE} from "../../constants/visual"

import {toggleUi} from "../../actions/app"

const link = {
  color: "#fefefe",
  textDecoration: "none"
}

const Navbar = props => (
  <div>
    <AppBar
      zDepth={props.zDepth || 1}
      style={props.style || {background: "#2d2d30"}}
      title={<Link to="/" style={link}>FlipED</Link>}
      // onTitleTouchTap={console.log}
      iconElementLeft={<IconButton><NavigationMenu /></IconButton>}
      iconElementRight={
        <div style={{margin: "0.2em 1em"}}>
          <Round
            src={props.user.photo || DEFAULT_PROFILE}
            onClick={props.toggleNavCard}
            size="2.4em"
            n
          />
        </div>
      }
    />
    {props.children && <div>{props.children}</div>}
    <NavCard />
  </div>
)

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  toggleNavCard: () => dispatch(toggleUi("navCard"))
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
