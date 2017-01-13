import React from "react"

import Background from "../components/Background"
import Grid from "../components/Grid"
import Paper from "../components/Paper"

import LoginForm from "../components/Login"

const cover = {
  height: "10em",
  color: "#4caf50",
  src: "/images/landing.svg",
  size: "contain",
  position: "center 0.8em"
}

export default () => (
  <Background grad="linear-gradient(to left, #76b852, #8DC26F)">
    <Grid vc>
      <Paper depth="z-flow" cover={cover}>
        <LoginForm />
      </Paper>
    </Grid>
  </Background>
)
