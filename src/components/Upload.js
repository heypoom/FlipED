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
        app.service("api/upload")
          .create({uri: reader.result})
          .then(x => this.props.result ? this.props.result(x.id) : console.log(x.id))
          .catch(x => console.error(x))
      }

      reader.onprogress = ({lengthComputable, total, loaded}) => {
        if (lengthComputable) {
          if (this.props.progress)
            this.props.progress(total, loaded)
          console.info({total, loaded})
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
          <Button label={this.props.text || "อัพโหลดรูป"} primary />
        </Dropzone>
      </div>
    )
  }

}
