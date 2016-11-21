import React from "react"
import {connect} from "redux-await"
import {Link} from "react-router"

import Fi from "../components/Fi"
import Grid from "../components/Grid"
import Role from "../components/Role"
import Paper from "../components/Paper"
import NoticeModal from "../components/NoticeModal"

import {ROLE} from "../constants"

const ProfileSidebar = props => (
  <Grid style={{paddingTop: props.top}} c>
    <Grid r>
      <Role is={props.role || "student"}>
        <div>
          <Grid xs="12" md="3">
            <Paper
              textAlign="center"
            >
              <Link to="/stats">
                <Fi src={props.user.photo || "/images/icon/listening.svg"} size="5em" />
              </Link>
              <p>
                <span style={{fontWeight: 700}}>{props.user.username}</span><br />
                {ROLE[props.user.roles].th}
              </p>
            </Paper>
          </Grid>
          <Grid xs="12" md="9">
            {props.children}
          </Grid>
        </div>
      </Role>
      <Role only="guest">
        <NoticeModal heading={props.guestHeading}>
          {props.guestChildren}
        </NoticeModal>
      </Role>
    </Grid>
  </Grid>
)

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps, () => ({}))(ProfileSidebar)
