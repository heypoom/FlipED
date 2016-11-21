import React, {Component} from "react"
import app from "../client/feathers"
import history from "../core/history"

import Grid from "./Grid"
import Paper from "./Paper"
import TextField from "./TextField"
import Fab from "./Fab"
import Fa from "./Fa"

import {CLASS_API, CLASS_URL} from "../constants/api"
import {DEFAULT_IMAGE} from "../constants/visual"

export default class NewClass extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      name: "",
      description: "",
      thumbnail: "",
      _addImage: false
    }
  }

  create = () => {
    app.service(CLASS_API)
    .create({
      name: this.state.name,
      description: this.state.description || " ",
      thumbnail: this.state.thumbnail || DEFAULT_IMAGE,
      url: Math.floor(Math.random() * 10000) + Date.now().toString().substring(5),
      content: [{
        type: "card",
        content: ""
      }]
    })
    .then(e => this.props.router.transitionTo(`${CLASS_URL}${e.url}/edit`))
    .catch(e => console.error(e))
  }

  submit = ev => { ev.key === "Enter" && this.create() }

  render() {
    return (
      <Paper style={{marginTop: "3em"}}>
        <Grid r>
          <Grid md={12}>
            <Fab
              onClick={this.create}
              position="absolute"
              top="-2.3em"
              right="1em"
              bottom="auto"
            >
              <Fa i="check" />
            </Fab>
          </Grid>
          <Grid md={12}>
            <Fab
              onClick={() => this.setState({_addImage: !this.state._addImage})}
              position="absolute"
              top="-2.3em"
              right="4.5em"
              bottom="auto"
            >
              <Fa i={`file${this.state._addImage ? "" : "-image-o"}`} />
            </Fab>
          </Grid>
        </Grid>
        <Grid r>
          <Grid md={6}>
            <TextField
              label="Class Name"
              value={this.state.name}
              onChange={v => this.setState({name: v.target.value})}
              onKeyPress={this.submit}
            />
          </Grid>
          <Grid md={6}>
            <TextField
              label="Class Tagline"
              value={this.state.description}
              onChange={v => this.setState({description: v.target.value})}
              onKeyPress={this.submit}
            />
          </Grid>
        </Grid>
        <div style={{display: this.state._addImage ? "block" : "none"}}>
          <Grid r style={{marginTop: "1em"}}>
            <Grid md={12}>
              <TextField
                label="Image URL"
                value={this.state.thumbnail}
                onChange={v => this.setState({thumbnail: v.target.value})}
              />
            </Grid>
          </Grid>
        </div>
      </Paper>
    )
  }

}
