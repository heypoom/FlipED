import React, {Component} from "react"

import Grid from "./Grid"
import TextField from "./TextField"
import Button from "./Button"
import Fa from "./Fa"
import Upload from "./Upload"

import {
  SECONDARY_COLOR,
  SUCCESS_COLOR,
  DANGER_COLOR
} from "../constants/visual"

export default class NewMedia extends Component {

  constructor(props) {
    super(props)

    let initialType = "youtube"

    if (props.data.youtube) {
      initialType = "youtube"
    } else if (props.data.image) {
      initialType = "image"
    }

    this.state = {_type: initialType}
  }

  submit = v => {
    if (v.key === "Enter") {
      let videoId = this.props.data[this.state._type].split("v=")[1]
      const ampersandPosition = videoId.indexOf("&")
      if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition)
      }
      this.props.update(videoId, this.state._type, this.props.index)
      this.props.submit()
    }
  }

  uploadThumbnail = e => {
    this.props.update(`/uploads/${e}`, "thumbnail", this.props.index)
    this.props.submit()
  }

  render = () => (
    <div>
      <Grid r>
        <Grid md="12">
          {
            this.state._type === "image" ? <Upload result={this.uploadThumbnail} /> : (
              <TextField
                value={this.props.data[this.state._type]}
                onChange={v => this.props.update(
                  v.target.value, this.state._type, this.props.index
                )}
                label="ลิ้งค์วิดิโอยูทูป"
                onKeyPress={this.submit}
              />
            )
          }
        </Grid>
      </Grid>
      <Grid r style={{marginTop: "1em"}}>
        <Grid xs="5">
          <Button
            onClick={() => this.setState({_type: "youtube"})}
            background={this.state._type === "youtube" && SECONDARY_COLOR}
            width="100%"
          >
            <Fa i="youtube" />
          </Button>
        </Grid>
        <Grid xs="5">
          <Button
            onClick={() => this.setState({_type: "image"})}
            background={this.state._type === "image" && SECONDARY_COLOR}
            width="100%"
          >
            <Fa i="picture-o" />
          </Button>
        </Grid>
        <Grid xs="2">
          <Button
            onClick={() => {
              this.props.update(!this.props.data.full, "full", this.props.index)
              this.props.submit()
            }}
            background={this.props.data.full ? SUCCESS_COLOR : DANGER_COLOR}
            width="100%"
          >
            <Fa i="arrows-alt" />
          </Button>
        </Grid>
      </Grid>
    </div>
  )

}
