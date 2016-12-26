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

export default props => (
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
          <Tab label="Notes" value="note">
            <div style={{padding: "2.5em"}}>
              <h2>Info</h2>
              <p>
                {JSON.stringify(props)}
              </p>
            </div>
          </Tab>
        </Tabs>
      </Shadow>
    </Grid>
  </Background>
)
