import React from "react"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import FlatButton from "material-ui/FlatButton"
import Dialog from "material-ui/Dialog"

import Grid from "../Grid"
import Paper from "../Paper"
import Round from "../Round"

import {DEFAULT_PROFILE} from "../../constants/visual"

import {logout} from "../../actions/user"
import {toggleUi} from "../../actions/app"

import s from "./Navbar.scss"

const NavCard = props => (
  <div>
    {props.navCard && (
      <Grid className={s.userCardPos}>
        <Paper
          depth="z-1"
          title={props.user ? `Hello, <b>${props.user.username}.</b>` : "Login"}
          tStyle={{background: "#2d2d30", textAlign: "center"}}
          footer={props.user ? "Logout" : "Login"}
          fClick={props.toggleLogout}
          anim
        >
          <Round src={props.user.photo || DEFAULT_PROFILE} />
          {props.user && (
            <p className={s.inner}>
              <b>{props.user.username}</b>
              <br />
              {props.user.roles}
            </p>
          )}
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(NavCard))
