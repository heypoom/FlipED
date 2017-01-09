import React from "react"
import Dropzone from "react-dropzone"

import app from "../client/api"

const UPLOAD_PATH = "/uploads/"

const onDrop = (files, props) => {
  files.forEach(file => {
    const reader = new FileReader()

    reader.onload = () => {
      app.service("upload")
        .create({uri: reader.result})
        .then(x => {
          if (props.result)
            props.result(`${UPLOAD_PATH}${x.id}`)
          // console.log("ONLOAD_SUCCESS", x)
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
  <div className={props.className}>
    <Dropzone
      onDrop={files => onDrop(files, props)}
      style={props.style || {position: "static"}}
      {...props}
      result
    >
      {props.children}
    </Dropzone>
  </div>
)
