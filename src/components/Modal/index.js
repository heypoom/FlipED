import React from "react"
import c from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Paper from "../Paper"
import Grid from "../Grid"

import s from "./Modal.scss"

const rel = {
  position: "relative"
}

const Modal = props => (
  <div className={s.fixed} style={{display: props.show ? "block" : "none"}}>
    <div
      onClick={props.toggle}
      className={c(s.fixed, s.backdrop)}
      style={{background: props.drop}}
    />
    <Grid className={s.modalWrapper} vc>
      <Paper style={rel} depth="z-flow" anim {...props.paper}>
        {props.children}
      </Paper>
    </Grid>
  </div>
)

export default withStyles(s)(Modal)
