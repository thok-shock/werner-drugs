import React, { useEffect, useState } from "react";
import { hydrate, render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import {
  Card,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  ListGroup,
  Navbar,
  NavDropdown,
  Row,
  ToastBody,
} from "react-bootstrap";
import Routing from "./components/Routing";
import { toast, ToastContainer } from "react-toastify";
import Fuse from "fuse.js";


export default function App() {
  const [user, setUser] = useState(null);
  const [allDrugs, setDrugs] = useState(null);
  const [query, setQuery] = useState("");
  const [queriedDrugs, setQueriedDrugs] = useState([]);

  useEffect(() => {
    fetch("/api/users", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          //do nothing
        }
      })
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        toast.error("An unexpected error occurred");
      });
  }, []);

  useEffect(() => {
    fetch("/api/drugs", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then((res) => {
        setDrugs(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (allDrugs) {
      const fuse = new Fuse(allDrugs, { keys: ["name"] });
      setQueriedDrugs(fuse.search(query));
    }
  }, [query]);

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/">Werner Drugs</Navbar.Brand>
          <NavDropdown drop="start" title="More" menuVariant="dark">
            <NavDropdown.Item href="/">Home</NavDropdown.Item>
            {user ? (
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            ) : (
              <NavDropdown.Item href="/login/google">Login</NavDropdown.Item>
            )}
          </NavDropdown>
        </Container>
      </Navbar>

      <Container className="mt-3" fluid>
        <Row>
          <Col lg="2">
            <Card className="mb-3">
              <Card.Header>
                <Card.Title>All Drugs</Card.Title>
              </Card.Header>
              <Form.Group style={{ padding: "0.5rem" }}>
                <Form.Control
                  placeholder="Search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
              <ListGroup
                variant="flush"
                style={{ maxHeight: "80vh", overflowY: "auto" }}
              >
                {query ? (
                  queriedDrugs && queriedDrugs.length > 0 ? (
                    queriedDrugs.map((drug) => {
                      return (
                        <ListGroup.Item
                          action
                          href={`/${drug.item.name}`}
                          key={drug.item.id}
                          style={{
                            textTransform: "capitalize",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            height: "38px",
                          }}
                        >
                          {drug.item.name}
                        </ListGroup.Item>
                      );
                    })
                  ) : (
                    <ListGroup.Item>No drugs found</ListGroup.Item>
                  )
                ) : (
                  allDrugs &&
                  allDrugs.map((drug) => {
                    return (
                      <ListGroup.Item
                        action
                        href={`/${drug.name}`}
                        key={drug.id}
                        style={{
                          textTransform: "capitalize",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          height: "38px",
                        }}
                      >
                        {drug.name}
                      </ListGroup.Item>
                    );
                  })
                )}
              </ListGroup>
            </Card>
          </Col>
          <Col lg="8">
            <Routing user={user} />
          </Col>
          <Col lg="2"></Col>
        </Row>
      </Container>
    </div>
  );
}


 
const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<BrowserRouter>
    <App />
    <ToastContainer />
  </BrowserRouter>, rootElement);
} else {
  render(<BrowserRouter>
    <App />
    <ToastContainer />
  </BrowserRouter>, rootElement);
}

if (module.hot) {
  module.hot.accept();
}
