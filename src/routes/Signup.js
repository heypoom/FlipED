import React from "react"

import Background from "../components/Background"
import Grid from "../components/Grid"
import Paper from "../components/Paper"

import Signup from "../components/Login/Signup"

const cover = {
  height: "10em",
  color: "#4caf50",
  src: "/images/landing.svg",
  size: "contain",
  position: "center 0.8em"
}

const modal = {
  maxWidth: "27em",
  margin: "0 auto"
}

export default () => (
  <Background grad="linear-gradient(to left, #76b852, #8DC26F)">
    <Grid style={modal} vc n c>
      <Paper depth="z-flow" cover={cover}>
        <Signup />
      </Paper>
    </Grid>
  </Background>
)
