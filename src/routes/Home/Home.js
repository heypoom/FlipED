import React from "react"
import {Link} from "react-router"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Grid from "../../components/Grid"
import Cover from "../../components/Cover"
import Shadow from "../../components/Shadow"
import Paper from "../../components/Paper"

import s from "./Home.scss"

const IMAGE_1 = "https://image.freepik.com/free-photo/blurred-room-with-television-and-sofa_1203-611.jpg"

const Home = () => (
  <div>
    <Cover alpha="0.6" src={IMAGE_1}>
      <Grid c n vc>
        <Paper depth="z-flow" title="Hey">
          <h2>Welcome!</h2>
          <p>
            This is another example of a controllable tab. Remember, if you
            use controllable Tabs, you need to give all of your tabs values or else
            you wont be able to select them.
          </p>
          <p><Link to="/auth">Login</Link></p>
        </Paper>
      </Grid>
    </Cover>
    <Cover src="/images/cover/march.jpg">
      <h2>2</h2>
    </Cover>
  </div>
)

export default withStyles(s)(Home)
