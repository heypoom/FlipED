import React from "react"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import FlatButton from "material-ui/FlatButton"
import Dialog from "material-ui/Dialog"

import Grid from "../Grid"
import Paper from "../Paper"
import Round from "../Round"
import Upload from "../Upload"

import {DEFAULT_PROFILE} from "../../constants/visual"
import {ROLE} from "../../constants/roles"

import {logout} from "../../actions/user"
import {toggleUi} from "../../actions/app"
import {services} from "../../client/api"

import s from "./NavCard.scss"

const title = {
  background: "#353E48",
  textAlign: "center"
}

const NavCard = props => (
  <div>
    {props.navCard && (
      <Grid className={s.userCardPos}>
        <Paper
          depth="z-1"
          title={props.user ? `Hello, <b>${props.user.username || "Guest"}.</b>` : "Login"}
          tStyle={title}
          footer={props.user ? "Logout" : "Login"}
          fClick={props.toggleLogout}
          anim
        >
          <Upload result={props.changeProfile}>
            <Round src={props.user.photo || DEFAULT_PROFILE} />
          </Upload>
          {props.user && (
            <p className={s.inner}>
              <b>{props.user.username || "Guest User"}</b>
              <br />
              {ROLE[props.user.roles].th || "ผู้เยี่ยมชม"}
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
  },
  changeProfile: url => {
    dispatch(services.accounts.patch(null, {photo: url}))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(NavCard))
