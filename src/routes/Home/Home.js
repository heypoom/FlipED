import React, {Component} from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import s from "./Home.scss"

import Grid from "../../components/Grid"
import ChatStage from "../../components/ChatStage"

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render = () => (
    <Grid style={{marginTop: "2em"}} c>
      <ChatStage />
    </Grid>
  )

}

export default withStyles(s)(Home)
