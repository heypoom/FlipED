import React from "react"
import Tooltip from "react-tooltip"
import withStyles from "isomorphic-style-loader/lib/withStyles"
import c from "classnames"

import Role from "../../components/Role"
import Icon from "../../components/Icon"

import s from "./FancyCard.scss"

const DivHOC = props => (
  <div onClick={props.onClick}>
    {props.children}
  </div>
)

const FancyCard = ({wrapper: Wrapper = DivHOC, ...props}) => (
  <div>
    <Tooltip place="top" type="dark" effect="float" />
    <div className={c(s.class, s.card)}>
      <Wrapper onClick={props.enter} id={props._id}>
        <div
          className={s.cardMedia}
          style={{backgroundImage: `url(${props.thumbnail})`}}
        />
        <div className={s.cardBody}>
          <div className={s.cta}>
            <Icon i="moreVert" />
          </div>
          <h2>{props.name}</h2>
          <h3>{props.description}</h3>
          {(props.owner || props.students) && (
            <div className={s.profileList}>
              {props.owner && props.owner.map((e, i) => (
                <div
                  data-tip={`(ผู้สอน) ${e.username}`}
                  className={s.profile}
                  style={{backgroundImage: `url(${e.photo})`}}
                  key={i}
                />
              ))}
              {props.students && props.students.map((e, i) => (
                <div
                  data-tip={`(ผู้เรียน) ${e.username}`}
                  className={s.profile}
                  style={{backgroundImage: `url(${e.photo})`}}
                  key={i}
                />
              ))}
            </div>
          )}
        </div>
      </Wrapper>
      <Role is="teacher">
        <div data-tip={props.deleteTip || "ลบห้องเรียน"} className={s.cardRemove}>
          <Icon i="error" onClick={props.delete} />
        </div>
      </Role>
    </div>
  </div>
)

export default withStyles(s)(FancyCard)
