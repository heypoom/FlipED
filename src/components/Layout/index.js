import React from "react"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Snackbar from "material-ui/Snackbar"

import Sidebar from "../Sidebar"
import Navbar from "../Navbar"

import {setSnackbar} from "../../actions/app"

import s from "./Layout.scss"

const Layout = props => (
  <div className={s.root}>
    <Sidebar />
    <div className={s.view}>
      <Navbar />
      <div className={!props.noTop && s.main}>
        {props.children}
      </div>
    </div>
  </div>
)

const mapStateToProps = state => ({
  snackbar: state.app.snackbar
})

const mapDispatchToProps = dispatch => ({
  handleRequestClose: () => dispatch(setSnackbar(null))
})

export const Root = connect(mapStateToProps, mapDispatchToProps)(props => (
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
))

export default withStyles(s)(Layout)
