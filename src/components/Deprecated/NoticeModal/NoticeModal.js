import React from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Grid from "../Grid"
import Paper from "../Paper"
import Cover from "../Cover"

import {CDN_URL} from "../../constants/visual"

import s from "./NoticeModal.scss"

const NoticeModal = props => (
  <Grid c={!props.noCenter}>
    <Paper
      className={s.modal}
      outerChild={
        <Cover
          marginBottom="0em"
          height={props.coverHeight || "24em"}
          textAlign="center"
          heading={props.heading}
          alpha={props.alpha}
          subheading={props.subheading}
          src={props.src || `${CDN_URL}/images/cover/july.jpg`}
          attachment="scroll"
          outerChild={
            <img
              alt="Black Ribbon" style={{position: "absolute", top: 0}}
              src={`${CDN_URL}/images/ribbon_topleft.png`}
            />
          }
        />
      }
    >
      {props.children}
    </Paper>
  </Grid>
)

export default withStyles(s)(NoticeModal)
