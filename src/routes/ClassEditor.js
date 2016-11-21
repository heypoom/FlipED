import React, {Component} from "react"
import {connect} from "redux-await"

import app from "../client/feathers"

import Toolbar from "../components/Toolbar"
import Cover from "../components/Cover"
import Paper from "../components/Paper"
import Grid from "../components/Grid"
import Fab from "../components/Fab"
import TextField from "../components/TextField"
import Fa from "../components/Fa"
import Upload from "../components/Upload"

import {CLASS_API} from "../constants/api"
import {SECONDARY_COLOR} from "../constants/visual"

const CLASS_INFO = [{
  n: "name",
  t: "ชื่อบทเรียน"
}, {
  n: "description",
  t: "คำอธิบายสั้นๆ"
}, {
  n: "thumbnail",
  t: "รูปภาพประกอบ"
}]


class ClassEditor extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      data: {
        _id: props.params.id
      }
    }
  }

  componentDidMount = () => {
    app.service(CLASS_API)
      .get(this.props.params.id)
      .then(e => {
        console.log(e)
        this.setState({data: e})
      })
      .catch(e => swal("Error", e, "error"))
  }

  set = (name, value) => {
    const data = this.state.data
    data[name] = value
    this.setState({data: data})
  }

  submit = () => {
    app.service(CLASS_API)
    .patch(this.state.data._id, this.state.data)
    .catch(e => swal("Error", e, "error"))
  }

  deleteClass = () => {
    swal({
      title: "Delete this class?",
      text: "You will NOT be able to recover it!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: SECONDARY_COLOR,
      confirmButtonText: "Yes.",
      closeOnConfirm: false
    }, () => {
      swal("Deleted!", "This class has been deleted.", "success")
      app.service(CLASS_API)
      .remove(this.state.data._id)
      .then(x => {
        console.log("DEL", x)
        this.context.router.transitionTo("/")
      })
      .catch(e => swal("Error", e, "error"))
    })
  }

  uploadThumbnail = e => {
    this.set("thumbnail", `/uploads/${e}`)
    this.submit()
  }

  render = () => (
    <div>
      <Toolbar title="ตัวช่วยสร้างบทเรียน" />
      <Grid c style={{paddingTop: "8em"}}>
        <Paper
          outerChild={
            <Cover
              marginBottom="0em"
              height="15em"
              textAlign="center"
              heading={`แก้ไขข้อมูลของห้องเรียน ${this.state.data.name}`}
              src={this.state.data.thumbnail} // src={`${CDN_URL}/images/cover/july.jpg`}
            />
          }
        >
          <Grid r>
            <Grid md="12">
              <Fab
                onClick={this.deleteClass}
                position="absolute"
                top="-2.3em"
                right="1em"
                bottom="auto"
                secondary
              >
                <Fa i="trash" />
              </Fab>
            </Grid>
          </Grid>
          <Grid r>
            {
              CLASS_INFO.map((item, index) => {
                if (item.n === "thumbnail") {
                  return (
                    <Grid xs="12" sm="4" md="4" lg="4" key={index}>
                      <Upload result={this.uploadThumbnail} />
                    </Grid>
                  )
                } else {
                  return (
                    <Grid xs="12" sm="4" md="4" lg="4" key={index}>
                      <TextField
                        value={this.state.data[item.n]}
                        onChange={v => this.set(item.n, v.target.value)}
                        placeholder={item.t}
                        onKeyPress={v => { v.key === "Enter" && this.submit() }}
                      />
                    </Grid>
                  )
                }
              })
            }
          </Grid>
        </Paper>
      </Grid>
    </div>
  )

}

const mapStateToProps = state => ({
  class: state.classes.data
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ClassEditor)
