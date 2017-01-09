import React from "react"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Snackbar from "material-ui/Snackbar"

import Sidebar from "../Sidebar"

import {setSnackbar} from "../../actions/app"

import s from "./Layout.scss"

const Layout = props => (
  <div className={s.root}>
    <Sidebar />
    {props.children}
  </div>
)

export const Root = props => (
  <div>
    {props.children}
    <Snackbar
      open={!!props.snackbar}
      message={props.snackbar || ""}
      action="DISMISS"
      autoHideDuration={4000}
      onActionTouchTap={props.handleRequestClose}
      onRequestClose={props.handleRequestClose}
    />
  </div>
)

const mapStateToProps = state => ({
  snackbar: state.app.snackbar
})

const mapDispatchToProps = dispatch => ({
  handleRequestClose: () => dispatch(setSnackbar(null)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Layout))
