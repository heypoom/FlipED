import React from "react"
import {connect} from "react-redux"

import Button from "material-ui/RaisedButton"
import Grid from "../components/Grid"

import {services} from "../constants/api"

const Dashboard = props => (
  <Grid c>
    <Button onClick={props.find} label="Hello!" primary />
    {
      props.class &&
        props.class.data.map((e, i) => <div key={i}>{JSON.stringify(e)}</div>)
    }
  </Grid>
)

const mapStateToProps = state => ({
  user: state.user,
  class: state.class.queryResult
})

const mapDispatchToProps = dispatch => ({
  find: () => dispatch(services.class.find())
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
