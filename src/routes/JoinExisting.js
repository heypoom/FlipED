import React from "react"

import Grid from "../components/Grid"
import Paper from "../components/Paper"

import JoinExistingForm from "../components/Login/JoinExistingForm"

import {cover} from "../constants/visual"

const modal = {
  maxWidth: "27em",
  margin: "0 auto",
  paddingLeft: "0.75em",
  paddingRight: "0.75em"
}

export default ({location}) => (
  <Grid style={modal} vc n c>
    <Paper depth="z-flow" cover={cover}>
      <JoinExistingForm code={location.query && location.query.code} />
    </Paper>
  </Grid>
)
