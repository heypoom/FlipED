import React from "react"
import Quill from "react-quill"

import TextField from "material-ui/TextField"

import Grid from "./Grid"
import Upload from "./Upload"

const ContentEditor = props => {
  const submit = v => {
    if (v.key === "Enter")
      props.submit()
  }

  const uploadThumbnail = e => {
    props.update(`/uploads/${e}`, "thumbnail", props.index)
    props.submit()
  }

  switch (props.item.type) {
    case "card":
      return (
        <Quill
          value={props.data.content}
          onChange={v => props.update(v, "content", props.index)}
          theme="snow"
        />
      )
    case "media":
      return (
        <div>MEDIA EDITOR</div>
      )
    case "cover":
      return (
        <Upload result={uploadThumbnail} />
      )
    case "quiz":
      return (
        <div>QUIZ EDITOR</div>
      )
    case "embed":
      return (
        <Grid r>
          <TextField
            value={props.data.src}
            onChange={v => props.update(v.target.value, "src", props.index)}
            label="ลิ้งค์ที่จะฝัง"
            onKeyPress={submit}
          />
        </Grid>
      )
    default:
      return <div />
  }
}

export default ContentEditor
