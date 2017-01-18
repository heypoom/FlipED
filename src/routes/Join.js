import React from "react"

import Background from "../components/Background"
import Grid from "../components/Grid"
import Paper from "../components/Paper"

import JoinForm from "../components/Login/JoinForm"

import {cover} from "../constants/visual"

const modal = {
  maxWidth: "27em",
  margin: "0 auto",
  paddingLeft: "0.75em",
  paddingRight: "0.75em"
}

export default ({location}) => (
  <Background color="#16a8af">
    <Grid style={modal} vc n c>
      <Paper depth="z-flow" cover={cover}>
        <JoinForm code={location.query && location.query.code} />
      </Paper>
    </Grid>
  </Background>
)
