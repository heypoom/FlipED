import React from "react"

import Background from "../components/Background"
import Grid from "../components/Grid"
import Paper from "../components/Paper"

import LoginForm from "../components/Login"

import {cover} from "../constants/visual"

const padding = {
  paddingLeft: "0.75em",
  paddingRight: "0.75em"
}

export default () => (
  <Background color="#16a8af">
    <Grid style={padding} vc>
      <Paper depth="z-flow" cover={cover}>
        <LoginForm />
      </Paper>
    </Grid>
  </Background>
)
