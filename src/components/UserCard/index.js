import React from "react"
import c from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"
import Tooltip from "react-tooltip"

import CardStats from "./CardStats"

import Grid from "../../components/Grid"
import Icon from "../../components/Icon"

import {ROLE} from "../../constants/roles"

import s from "./UserCard.scss"

const UserCard = props => (
  <div className={s.card}>
    <Tooltip place="top" type="dark" effect="float" />
    <div className={s.cardTop}>
      <div>
        <Grid r>
          <Grid xs={3}>
            <div
              data-tip={`รูปโปรไฟล์ของผู้ใช้ ${props.username}`}
              className={s.cardProfile}
              style={{backgroundImage: `url(${props.photo})`}}
            />
          </Grid>
          <Grid style={{padding: 0}} xs={6}>
            <div
              data-tip={`${props.username} อยู่ในสถานะ${props.roles ? ROLE[props.roles].th : "ผู้เยี่ยมชม"}ครับ`}
              className={s.cardProfileText}
            >
              <h2>{props.username || props._id}</h2>
              <h3>{props.roles ? ROLE[props.roles].th : "ผู้เยี่ยมชม"}</h3>
              <h3>{props.email}</h3>
            </div>
          </Grid>
          <Grid xs={3}>
            <div
              data-tip={`ผู้ใช้ ${props.username} ${props.online ? "กำลัง" : "ไม่ได้"}ใช้งานอยู่ครับ`}
              className={c(s.cardIndicator, props.online && s.online)}
            >
              <Icon i={props.online ? "wifiOn" : "wifiOff"} />
            </div>
          </Grid>
        </Grid>
      </div>
      <div className={s.cardStatsWrapper}>
        <Grid r>
          <Grid xs={6}>
            <div className={s.cardStats}>
              <Icon i="backInTime" fill="#1770FB" />
              <span>15 Times</span>
            </div>
          </Grid>
          <Grid xs={6}>
            <div className={s.cardStats}>
              <Icon i="search" fill="#7561EC" />
              <span>Score</span>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
    <div className={s.cardBody}>
      <CardStats />
    </div>
    <div className={s.cardAction}>
      <Grid r>
        <Grid xs={6}>
          <div className={s.cardCta} onClick={props.elevate}>
            {props.elevate ? "เลื่อนสิทธิ" : "แก้ไข"}
          </div>
        </Grid>
        <Grid xs={6}>
          <div className={s.cardCta}>
            แก้ไข
          </div>
        </Grid>
      </Grid>
    </div>
  </div>
)

export default withStyles(s)(UserCard)
