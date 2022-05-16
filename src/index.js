import React, { useEffect, useState } from "react";
import reactDom from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { Col, Container, Dropdown, DropdownButton, Navbar, NavDropdown, Row, ToastContainer } from "react-bootstrap";
import Routing from "./components/Routing";

export default function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("/api/users", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        //do nothing
      }
    })
    .then(res => {
      setUser(res)
    })
    .catch(err => {
      console.log('An unexpected error occurred')
    })
  }, []);

  return (
    <div>
        <Navbar bg='dark' variant='dark'>
            <Container fluid className='mx-5'>
                <Navbar.Brand href="/">Werner Drugs</Navbar.Brand>
                <NavDropdown drop='start' title='More' menuVariant="dark">
                  <NavDropdown.Item href='/'>Home</NavDropdown.Item>
                  {user ? <NavDropdown.Item href='/logout'>Logout</NavDropdown.Item> : <NavDropdown.Item href='/login/google'>Login</NavDropdown.Item>}
                </NavDropdown>
            </Container>
        </Navbar>

      <Container className='my-1' fluid>
        <Row>
          <Col lg="2"></Col>
          <Col lg="8">
            <Routing user={user} />
            
          </Col>
          <Col lg="2"></Col>
        </Row>
      </Container>

    </div>
  );
}

const root = reactDom.createRoot(document.getElementById("root"));

root.render(
  //<React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  //</React.StrictMode>
);

if (module.hot) {
    module.hot.accept()
}