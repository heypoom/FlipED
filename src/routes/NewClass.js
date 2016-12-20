import React, {Component} from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"
import {connect} from "react-redux"

import TextField from "../components/TextField"
import Paper from "../components/Paper"
import Grid from "../components/Grid"
import Toolbar from "../components/Toolbar"
import Cover from "../components/Cover"
import Upload from "../components/Upload"
import Background from "../components/Background"

import {app, CLASS_API, CLASS_URL} from "../constants/api"
import {CDN_URL} from "../constants/visual"

import s from "./Login.scss"

class NewClass extends Component {

  static contextTypes = {
    store: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      step: 0,
      className: "",
      classDescription: "",
      thumbnail: ""
    }
  }

  create = () => {
    app.service(CLASS_API).create({
      name: this.state.className,
      description: this.state.classDescription,
      thumbnail: this.state.thumbnail || `${CDN_URL}/images/cover/july.jpg`,
      owner: this.props.user._id
    }).then(e => {
      this.context.router.transitionTo(`${CLASS_URL}${e._id}`)
    })
    .catch(err => {
      swal("โอ๊โอ...", "พบข้อผิดพลาดบางอย่าง", "error")
      console.error(err)
    })
  }

  uploadThumbnail = e => {
    this.setState({thumbnail: `/uploads/${e}`})
  }

  submit = e => {
    if (e.key === "Enter") {
      this.create()
    }
  }

  render = () => (
    <Background
      background="url(images/cover/blurlogin.jpg) center / cover no-repeat"
    >
      <Toolbar title="สร้างห้องเรียน" background="#2d2d30" />
      <Grid style={{paddingTop: "7em"}} c>
        <Paper
          className={s.width}
          style={{margin: "auto"}}

          outerChild={
            <Cover
              marginBottom="0em"
              height="21em"
              textAlign="center"
              heading="สร้างห้องเรียน"
              src={this.state.thumbnail || "/images/cover/july.jpg"}
            />
          }
        >
          <Grid r>
            <Grid xs={4} style={{textAlign: "right", padding: "10px 10px 10px 5px"}}>
              ห้องเรียนของคุณชื่ออะไร?
            </Grid>
            <Grid xs={8}>
              <TextField
                value={this.state.className}
                onChange={v => this.setState({className: v.target.value})}
                placeholder="ชื่อของห้องเรียน"
                onKeyPress={this.submit}
              />
            </Grid>
          </Grid>
          <Grid r>
            <Grid xs={4} style={{textAlign: "right", padding: "10px 10px 10px 5px"}}>
              ลองบอกสั้นๆ ใน 1 บรรทัดว่าคุณสอนอะไรบ้าง
            </Grid>
            <Grid xs={8}>
              <TextField
                value={this.state.classDescription}
                onChange={v => this.setState({classDescription: v.target.value})}
                placeholder="อธิบายห้องเรียนใน 1 บรรทัด"
                onKeyPress={this.submit}
              />
            </Grid>
          </Grid>
          <Grid r>
            <Grid xs={4} style={{textAlign: "right", padding: "10px 10px 10px 5px"}}>
              อัพโหลดไฟล์รูปภาพ
            </Grid>
            <Grid xs={8}>
              <Upload result={this.uploadThumbnail} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Background>
  )

}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  dispatch: act => dispatch(act)
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(NewClass))
