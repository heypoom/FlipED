import React, {Component} from "react"
import Dropzone from "react-dropzone"

import app from "../client/api"
import {PRIMARY_COLOR} from "../constants/visual"

import Button from "material-ui/RaisedButton"

export default class Upload extends Component {

  onDrop = files => {
    files.forEach(file => {
      const reader = new FileReader()

      reader.onload = () => {
        app.service("upload")
          .create({uri: reader.result})
          .then(x => {
            if (this.props.result)
              this.props.result(x.id)
            console.log("ONLOAD_SUCCESS", x)
          })
          .catch(x => console.error("ONLOAD_ERR", x))
      }

      reader.onprogress = ({lengthComputable, total, loaded}) => {
        if (lengthComputable) {
          if (this.props.progress)
            this.props.progress(total, loaded)
          console.info("ON_PROGRESS", {total, loaded})
        }
      }

      reader.readAsDataURL(file)
    })
  }

  render = () => (
    <Dropzone onDrop={this.onDrop} style={this.props.style}>
      {this.props.children ? this.props.children : (
        <Button label={this.props.text || "อัพโหลดรูป"} primary />
      )}
    </Dropzone>
  )

}
