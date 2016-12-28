import React from "react"
import {connect} from "react-redux"

import Grid from "../Grid"
import Paper from "../Paper"

const Stats = props => (
  <div>
    <Grid n c>
      <Paper>
        ...Stats
      </Paper>
      <Paper>
        ...Stats
      </Paper>
    </Grid>
  </div>
)

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Stats)
