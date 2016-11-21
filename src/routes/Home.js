import React from "react"
import {Link} from "react-router"

import Toolbar from "../components/Toolbar"
import Cover from "../components/Cover"
import Button from "../components/Button"
import Paper from "../components/Paper"
import Fi from "../components/Fi"
import Grid from "../components/Grid"
import Background from "../components/Background"

import {CDN_URL} from "../constants/visual"

export default () => (
  <div>
    <Toolbar background="#2d2d30" title="หน้าหลัก" fixed hideTitle />
    <Cover
      src={`${CDN_URL}/images/pencil.jpg`}
      height="100%"
      heading="Practical and Fun way to teach, in a snap!"
      subheading="Do it your style. We'll help."
      attachment="scroll"
    >
      <Button>Get Started</Button>
      <Link to="/register">
        <Button style={{marginLeft: "1em"}} background="transparent">Register</Button>
      </Link>
      <Link to="/login">
        <Button style={{marginLeft: "1em"}} background="transparent">Login</Button>
      </Link>
    </Cover>
    <Grid c>
      <Grid style={{paddingTop: "2em", paddingBottom: "2em"}} r>
        <Grid sm={4}>
          <Fi size="8em" src="/images/icon/listening.svg" />
          <div style={{textAlign: "center"}}>
            <h2>Class Success</h2>
            <p>
              &nbsp;
              Whether it's Active Learning, Project Based Learning or
              Flipped Learning, FlipED can be your medium in enhancing your
              class' success.
            </p>
          </div>
        </Grid>
        <Grid sm={4}>
          <Fi size="8em" src="/images/icon/clock.svg" />
          <div style={{textAlign: "center"}}>
            <h2>Class Success</h2>
            <p>
              &nbsp;
              Whether it's Active Learning, Project Based Learning or
              Flipped Learning, FlipED can be your medium in enhancing your
              class' success.
            </p>
          </div>
        </Grid>
        <Grid sm={4}>
          <Fi size="8em" src="/images/icon/house.svg" />
          <div style={{textAlign: "center"}}>
            <h2>Class Success</h2>
            <p>
              &nbsp;
              Whether it's Active Learning, Project Based Learning or
              Flipped Learning, FlipED can be your medium in enhancing your
              class' success.
            </p>
          </div>
        </Grid>
      </Grid>
    </Grid>
    <Cover
      src={`${CDN_URL}/images/pencil.jpg`}
      height="20%"
      heading="Awesome"
    />
  </div>
)
