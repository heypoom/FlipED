import React from "react"
import Quill from "react-quill"

import NewPopQuiz from "./NewPopQuiz"
import Grid from "./Grid"
import TextField from "./TextField"
import NewMedia from "./NewMedia"
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
  return (
    <div>
      <div>
        {(() => {
          switch (props.item.type) {
            case "card":
              return (
                <Quill
                  value={props.data.content}
                  onChange={v => props.update(v, "content", props.index)} // props.submit()
                  theme="snow"
                />
              )
            case "media":
              return (
                <NewMedia
                  update={props.update}
                  submit={props.submit}
                  index={props.index}
                  data={props.data}
                />
              )
            case "cover":
              return (
                <Grid>
                  <Grid r>
                    <Grid xs="12" lg="4">
                      <TextField
                        value={props.data.title}
                        onChange={v => props.update(v.target.value, "title", props.index)}
                        label="Heading"
                        onKeyPress={submit}
                      />
                    </Grid>
                    <Grid xs="12" lg="4">
                      <TextField
                        value={props.data.description}
                        onChange={v => props.update(v.target.value, "description", props.index)}
                        label="Subheading"
                        onKeyPress={submit}
                      />
                    </Grid>
                    <Grid xs="12" lg="4">
                      <Upload result={uploadThumbnail} />
                    </Grid>
                  </Grid>
                  <Grid style={{marginTop: "1.5em"}}>
                    <Quill
                      value={props.data.content}
                      onChange={v => props.update(v, "content", props.index)} // props.submit()
                      theme="snow"
                    />
                  </Grid>
                </Grid>
              )
            case "quiz":
              return (
                <Grid r>
                  <Grid xs="12">
                    <NewPopQuiz
                      id={props.data.id}
                      update={props.update}
                      submit={props.submit}
                      index={props.index}
                      url={props.url}
                    />
                  </Grid>
                </Grid>
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
              // INVALID TYPE.
          }
        })()}
      </div>
    </div>
  )
}

export default ContentEditor
