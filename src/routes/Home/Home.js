import React from "react"
import Transition from "react/lib/ReactCSSTransitionGroup"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import s from "./Home.scss"

import Grid from "../../components/Grid"

const Home = props => (
  <div>
    <Grid c>
      <div className={s.chatBubble}>Hello</div>
    </Grid>
  </div>
)

export default withStyles(s)(Home)
