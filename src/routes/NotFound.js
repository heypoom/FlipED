import React from "react"
import {Link} from "react-router"

import Grid from "../components/Grid"
import Background from "../components/Background"
import Paper from "../components/Paper"

export default () => (
  <Background color="#e65550">
    <Grid vc n c>
      <Paper depth="z-flow" title="404 - Page Not Found">
        <h2>Page Not Found</h2>
        <p>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos
          dolores et quas molestias excepturi sint occaecati cupiditate
          non provident, similique sunt in culpa qui officia deserunt
          mollitia animi, id est laborum et dolorum fuga.
        </p>
        <p>
          <Link to="/">Back to Home</Link>
        </p>
      </Paper>
    </Grid>
  </Background>
)
