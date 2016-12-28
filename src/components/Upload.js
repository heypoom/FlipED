import React from "react"
import Dropzone from "react-dropzone"

import app from "../client/api"

import Button from "material-ui/RaisedButton"

const onDrop = (files, props) => {
  files.forEach(file => {
    const reader = new FileReader()

    reader.onload = () => {
      app.service("upload")
        .create({uri: reader.result})
        .then(x => {
          if (props.result)
            props.result(x.id)
          console.log("ONLOAD_SUCCESS", x)
        })
        .catch(x => console.error("ONLOAD_ERR", x))
    }

    reader.onprogress = ({lengthComputable, total, loaded}) => {
      if (lengthComputable) {
        if (props.progress)
          props.progress(total, loaded)
        console.info("ON_PROGRESS", {total, loaded})
      }
    }

    reader.readAsDataURL(file)
  })
}

export default props => (
  <div style={props.style} className={props.className}>
    <Dropzone onDrop={files => onDrop(files, props)} style={{position: "static"}}>
      {props.children ? props.children : (
        <Button label={props.text || "อัพโหลดรูป"} primary />
      )}
    </Dropzone>
  </div>
)
