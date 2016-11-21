import React from "react"

import Cover from "./Cover"
import Paper from "./Paper"
import PopQuiz from "./PopQuiz"
import Grid from "./Grid"

import {IS_CLIENT} from "../constants/util"
import {PRIMARY_COLOR} from "../constants/visual"

const ytContainer = {
  position: "relative",
  paddingBottom: "56.25%",
  height: "0em",
  overflow: "hidden"
}

const ytMedia = {
  position: "absolute",
  top: "0em",
  left: "0em",
  width: "100%",
  height: "100%"
}

const imageStyle = {
  maxWidth: "100%",
  height: "auto"
}

const content = data => ({
  // HACK: CHANGE CARD BACK TO PAPER IF SHIT BREAKS
  card: (
    <Paper>
      <section
        dangerouslySetInnerHTML={{__html: data.content}}
      />
    </Paper>
  ),
  media: (
    <Paper padding="0em">
      {(() => {
        if (data.youtube) {
          return (
            <div style={ytContainer}>
              <iframe
                src={`https://www.youtube.com/embed/${data.youtube}?origin=${IS_CLIENT ? window.location.origin : ""}`}
                style={ytMedia}
                frameBorder="0"
                allowFullScreen
              />
            </div>
          )
        } else if (data.image) {
          return (
            <img
              src={data.image}
              style={imageStyle}
              alt={data.alt}
            />
          )
        }
      })()}
    </Paper>
  ),
  youtube: (
    <Paper padding="0em">
      <div style={ytContainer}>
        <iframe
          src={`https://www.youtubedata.com/embed/${data.youtube}?origin=${IS_CLIENT ? window.location.origin : ""}`}
          style={ytMedia}
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </Paper>
  ),
  image: (
    <Paper padding="0em">
      <img
        src={data.image}
        style={imageStyle}
        alt={data.alt}
      />
    </Paper>
  ),
  cover: (
    <div>
      <a name={data.title} />
      <Paper
        outerChild={
          <Cover
            src={data.thumbnail}
            heading={data.title}
            subheading={data.description}
            marginBottom="0em"
            height="25em"
            textAlign="left"
            left="10%"
            alpha="0.3"
            position="50% 75%"
            attachment="scroll"
          />
        }
      >
        <section
          dangerouslySetInnerHTML={{__html: data.content}}
        />
      </Paper>
    </div>
  ),
  quiz: (
    <Paper color="white" background={PRIMARY_COLOR}>
      <PopQuiz id={data.id} />
    </Paper>
  ),
  embed: (
    <iframe
      src={data.src}
      style={{width: "100%", height: "100%"}}
      scrolling="no"
      frameBorder="0"
    />
  )
}[data.type])

export default props => <div>{content(props.data)}</div>
