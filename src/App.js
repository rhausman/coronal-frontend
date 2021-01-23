import { useState } from "react"
import { Row, Col, Navbar, Nav, Container } from "react-bootstrap";
import './Styles/App.css';

// custom components
import { FileForm, ShirtDisplay, ShirtContext, OrderForm } from './Components/ComponentIndex'



function App() {
  const [resp, setResp] = useState({ contents: { disp_str: "Please upload a file to recieve an analysis", threat_level: "unknown" } })
  const value = { resp, setResp }

  return (
    <div className="App">
      <Navbar expand="small" theme="light" sticky="none" style={{ color: "aqua" }}>
        <Container fluid>

          <Col className="col-md-3"><Nav><h1>Coronál</h1></Nav></Col>
          <Col className="col-md-7">
            <Nav>
              <h3>Diagnose COVID-19 using  <a style={{ textDecoration: "none" }} href="https://www.nature.com/articles/s41551-020-00640-6">your heart's data!</a></h3>
            </Nav>
          </Col>
          <Col>
            <Nav>
              Like it? Check out <a href="https://richard-website-1d919.firebaseapp.com/" style={{ textDecoration: "none" }}>my site!</a>
            </Nav>
          </Col>
        </Container>
      </Navbar>

      <ShirtContext.Provider value={value}>
        <div style={{ width: "80%" }} >
          <FileForm responseSetter={setResp} />

          <ShirtDisplay />
        </div>


      </ShirtContext.Provider>
    </div >
  );
}

export default App;
