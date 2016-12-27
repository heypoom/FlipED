import React, {Component} from "react"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import {setUi} from "../../actions/app"

import Grid from "../Grid"

import s from "./Video.scss"

const Video = props => (
  <div className={s.ytContainer}>
    {props.ytState ? (
      <iframe
        src={`https://www.youtube.com/embed/${props.src}?autoplay=1`}
        className={s.youtube}
        frameBorder="0"
        allowFullScreen
      />
    ) : (
      <div
        className={s.ytLoading}
        style={{backgroundImage: `url(http://img.youtube.com/vi/${props.src}/0.jpg)`}}
      >
        <Grid onClick={props.play} className={s.ytLoadingOverlay} vc>
          <svg style={{width: "4em", cursor: "pointer"}} viewBox="0 0 200 200" alt="Play">
            <circle cx="100" cy="100" r="90" fill="none" strokeWidth="15" stroke="#fff" />
            <polygon points="70, 55 70, 145 145, 100" fill="#fff" />
          </svg>
        </Grid>
      </div>
    )}
  </div>
)

const mapStateToProps = state => ({
  ytState: state.app.ui.ytState || false
})

const mapDispatchToProps = dispatch => ({
  play: () => dispatch(setUi("ytState", true))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Video))
