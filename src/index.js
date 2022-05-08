import React from "react";
import reactDom from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import Routing from "./components/Routing";

export default function App() {
  return (
    <div>
        <Navbar bg='dark' variant='dark'>
            <Container fluid>
                <Navbar.Brand href="/">Werner Drugs</Navbar.Brand>
            </Container>
        </Navbar>
      <Container className='m-1' fluid>
        <Row>
          <Col lg="2"></Col>
          <Col lg="8">
            <Routing />
            
          </Col>
          <Col lg="2"></Col>
        </Row>
      </Container>
    </div>
  );
}

const root = reactDom.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

if (module.hot) {
    module.hot.accept()
}