import React, {Component} from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Grid from "../Grid"

import s from "./Video.scss"

@withStyles(s)
export default class Video extends Component {

  constructor(props) {
    super(props)
    this.state = {play: false}
  }

  play = () => this.setState({play: !this.state.play})

  render = () => (
    <div className={s.ytContainer}>
      {this.state.play ? (
        <iframe
          src={`https://www.youtube.com/embed/${this.props.src}?autoplay=1`}
          className={s.youtube}
          frameBorder="0"
          allowFullScreen
        />
      ) : (
        <div
          className={s.ytLoading}
          style={{
            backgroundImage: this.props.src &&
              `url("http://i.ytimg.com/vi_webp/${this.props.src}/maxresdefault.webp")`
          }}
        >
          <Grid onClick={this.play} className={s.ytLoadingOverlay} vc>
            <svg style={{width: "4em", cursor: "pointer"}} viewBox="0 0 200 200" alt="Play">
              <circle cx="100" cy="100" r="90" fill="none" strokeWidth="15" stroke="#fff" />
              <polygon points="70, 55 70, 145 145, 100" fill="#fff" />
            </svg>
          </Grid>
        </div>
      )}
    </div>
  )

}
