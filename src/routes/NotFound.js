import React from "react"
import {Link} from "react-router"

import Paper from "material-ui/Paper"
import {Tabs, Tab} from "material-ui/Tabs"

import Grid from "../components/Grid"
import Background from "../components/Background"
import Shadow from "../components/Shadow"

const paper = {
  fontFamily: "Roboto, Pridi",
  margin: "0 auto"
}

export default () => (
  <Background color="#e65550">
    <Grid style={{fontSize: "1.15em"}} vc c>
      <Shadow depth="z-flow" style={paper} w>
        <div style={{padding: "1em", background: "#272737", color: "white"}}>
          <b>404</b> - Page Not Found.
        </div>
        <Tabs tabItemContainerStyle={{backgroundColor: "#272737"}}>
          <Tab label="ไม่พบหน้าที่ต้องการ" value="notfound">
            <div style={{padding: "1.5em 1.5em 0.5em 1.5em", marginBottom: "1em"}}>
              <h2>Page Not Found</h2>
              <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga.
              </p>
              <p>
                <Link to="/">Back to Home</Link>
              </p>
            </div>
          </Tab>
          <Tab label="ข้อความเตือนใจ" value="note">
            <div style={{padding: "2.5em"}}>
              <Grid r>
                <Grid xs="12" sm="6">
                  <p>
                    ...แต่คนย่อมเป็นคน บ่คือควายที่โง่งึม <br />
                    ไผเหวยจะนอนพึม และพ่ายแพ้ลงพังภินท์ <br />
                    ฟ้าลวกด้วยเปลวเลือด ระอุเดือดทั้งแดนดิน <br />
                    วอดวายทุกชีวิน แต่คนยังจะหยัดยืน <br />
                  </p>
                </Grid>
                <Grid xs="12" sm="6">
                  <p>
                    ถึงยุคทมิฬมาร จะครองเมืองด้วยควันปืน <br />
                    ขื่อแปจะพังครืน และกลิ่นเลือดจะคลุ้งคาว <br />
                    แต่คนย่อมเป็นคน ในสายธารอันเหยียดยาว <br />
                    คงคู่กับเดือนดาว ผงาดเด่นในดินแดน <br />
                  </p>
                </Grid>
              </Grid>
              <Grid r>
                <Grid xs="12" sm="6">
                  <p>
                    ถึงปืนก็เถอะปืน เจ้ายิงคนอย่างหมิ่นแคลน <br />
                    ใจสู้นี้เหลือแสน กว่าปืนสูจะตัดสิน <br />
                    คาวเลือดที่ไหลอาบ ซึมกำซาบในเนื้อดิน <br />
                    ปลุกใจอยู่อาจิณ ให้กวาดล้างพวกกาลี <br />
                  </p>
                </Grid>
                <Grid xs="12" sm="6">
                  <p>
                    ฟ้ามืดเมื่อมีได้ ก็ฟ้าใหม่ย่อมคงมี <br />
                    แสงทองเหนือธรณี จะท้าทายอย่างทรนง <br />
                    เมื่อนั้นแหละคนนี้ จะยืดตัวได้หยัดตรง <br />
                    ประกาศด้วยอาจอง กูใช่ทาสหากคือไท <br />
                  </p>
                </Grid>
              </Grid>
              <Grid style={{textAlign: "right", marginRight: "3%"}} r>
                <span>จิตร ภูมิศักดิ์</span>
              </Grid>
            </div>
          </Tab>
        </Tabs>
      </Shadow>
    </Grid>
  </Background>
)
