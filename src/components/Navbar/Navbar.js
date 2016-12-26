import React, {PropTypes} from "react"
// import {Link} from "react-router"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import AppBar from "material-ui/AppBar"
import IconButton from "material-ui/IconButton"
import NavigationMenu from "material-ui/svg-icons/navigation/menu"
import FlatButton from "material-ui/FlatButton"
import Dialog from "material-ui/Dialog"

import Round from "../Round"
import Grid from "../Grid"
import Paper from "../Paper"

import s from "./Navbar.scss"

import {APP_TITLE} from "../../constants"
import {DEFAULT_PROFILE} from "../../constants/visual"
import {logout} from "../../actions/user"
import {toggleUi} from "../../actions/app"

const Navbar = (props, context) => {
  context.setTitle(`${props.title} - ${APP_TITLE}`)
  return (
    <div style={props.rootStyle}>
      <AppBar
        zDepth={0}
        style={props.style}
        title="FlipED"
        onTitleTouchTap={console.log}
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
      {props.children && (
        <div>
          {props.children}
        </div>
      )}
      {props.navCard && (
        <Grid className={s.userCardPos}>
          <Paper
            depth="z-1"
            title="Hello, <b>Pmc Dev.</b>"
            tStyle={{background: "#0c82d3", textAlign: "center"}}
            footer="Logout"
            fClick={props.toggleLogout}
            anim
          >
            <Round src={props.user.photo || DEFAULT_PROFILE} />
            <p className={s.inner}>
              <b>Pmc Dev</b> <br />
              ผู้ดูแลระบบ
            </p>
          </Paper>
        </Grid>
      )}
      <Dialog
        title="ออกจากระบบ"
        actions={[
          <FlatButton
            label="ยกเลิก"
            onTouchTap={props.toggleLogout}
          />,
          <FlatButton
            label="ออกจากระบบ"
            onTouchTap={props.confirmLogout}
            primary
          />,
        ]}
        modal={false}
        open={props.logoutDialog}
        onRequestClose={props.toggleLogout}
      >
        คุณต้องการออกจากระบบหรือไม่?
      </Dialog>
    </div>
  )
}

Navbar.contextTypes = {
  setTitle: PropTypes.func
}

const mapStateToProps = state => ({
  user: state.user,
  navCard: state.app.ui.navCard || false,
  logoutDialog: state.app.ui.logoutDialog || false
})

const mapDispatchToProps = dispatch => ({
  toggleLogout: () => dispatch(toggleUi("logoutDialog")),
  confirmLogout: () => {
    dispatch(logout())
    dispatch(toggleUi("navCard"))
    dispatch(toggleUi("logoutDialog"))
  },
  toggleNavCard: () => dispatch(toggleUi("navCard"))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Navbar))
