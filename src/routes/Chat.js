import React from "react"

import Grid from "../components/Grid"
import ChatStage from "../components/ChatStage"

import {FLIPED, FLIPED_CHARS} from "../constants/chatscripts"

export default () => (
  <Grid style={{marginTop: "2em"}} c n>
    <ChatStage stage={FLIPED} users={FLIPED_CHARS} />
  </Grid>
)
