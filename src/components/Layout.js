import React from "react"
import {connect} from "react-redux"

import Snackbar from "material-ui/Snackbar"

import {setSnackbar} from "../actions/app"

const Layout = props => (
  <div>
    <div>
      {props.children}
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
