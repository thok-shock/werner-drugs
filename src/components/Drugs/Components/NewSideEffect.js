import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

export default function NewSideEffect(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function createSideEffect() {
    fetch(`/api/side-effects/${name}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: description }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("An unexpected error occurred");
        }
      })
      .then(() => {
        setName("");
        setDescription("");
        props.setAsOf(new Date());
        props.onHide(false);
        toast.success("Added side effect");
      })
      .catch(() => {
        toast.error("An unexpected error occurred");
      });
  }

  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.onHide(false);
      }}
    >
      <Modal.Header>
        <Modal.Title>New Side Effect</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          This page is used to add a new side effect if not previously listed.
        </p>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="name"
            ></Form.Control>
            <Form.Text>This appears on the bullet points.</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              as="textarea"
              type="description"
            ></Form.Control>
            <Form.Text>This appears when users hover over the name.</Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            if (name.length > 1 && description.length > 1) {
              createSideEffect();
            } else {
              toast.error("Name or description are too short");
            }
          }}
        >
          Submit
        </Button>
        <Button
          variant="outline-danger"
          onClick={() => {
            props.onHide(false);
          }}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
