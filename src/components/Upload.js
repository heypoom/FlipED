import React, {Component} from "react"
import Dropzone from "react-dropzone"

import {app} from "../constants/api"
import {PRIMARY_COLOR} from "../constants/visual"

import Button from "./Button"

export default class Upload extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  onDrop = files => {
    files.forEach(file => {
      const reader = new FileReader()

      reader.onload = () => {
        app.service("api/upload")
          .create({uri: reader.result})
          .then(x => this.props.result ? this.props.result(x.id) : console.log(x.id))
          .catch(x => console.error(x))
      }

      reader.onprogress = event => {
        if (event.lengthComputable) {
          console.info(event.total, event.loaded)
        }
      }

      reader.readAsDataURL(file)
    })
  }

  render() {
    return (
      <div>
        <Dropzone
          onDrop={this.onDrop}
          style={{
            margin: this.props.margin || "auto",
            textAlign: this.props.align || "center",
            padding: this.props.padding,
            width: this.props.width,
            color: this.props.color || PRIMARY_COLOR,
            background: this.props.background || "transparent"
          }}
        >
          <Button>{this.props.text || "อัพโหลดรูป"}</Button>
        </Dropzone>
      </div>
    )
  }

}
