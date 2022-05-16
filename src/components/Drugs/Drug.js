import React, { useEffect, useState } from "react";
import { Col, Row, Container, Card, Form, Button } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";
import { useLocation } from "react-router-dom";
import {CKEditor} from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import EditButton from "./Components/EditButton";
import NewSideEffect from "./Components/NewSideEffect";


function renderAllSideEffects(allSideEffects) {
  if (allSideEffects && allSideEffects.length > 0) {
    return allSideEffects.map(sx => {
      return <Form.Group><Form.Check label={sx.name}></Form.Check></Form.Group>
    })
  } else {
    return <div>No side effects available</div>
  }
}

export default function Drug(props) {
  const [drugInfo, setDrugInfo] = useState(null);
  const [doesNotExist, setDoesNotExist] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(null)
  const [pearls, setPearls] = useState(null)
  const [description, setDescription] = useState(null)
  const [newSideEffectOpen, setNewSideEffectOpen] = useState(null)
  const [sideEffects, setSideEffects] = useState(null)
  const [allSideEffects, setAllSideEffects] = useState(null)
  const [asOf, setAsOf] = useState(new Date())

  useEffect(() => {
      if (drugInfo) {
          setName(drugInfo.name)
          setPearls(drugInfo.pearls)
          setDescription(drugInfo.description)
      }
  }, [drugInfo])

  const location = useLocation();

  useEffect(() => {
    fetch(`/api/drugs/${location.pathname.replaceAll("/", "")}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          setDoesNotExist(true);
        }
      })
      .then((res) => {
        setDrugInfo(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location, asOf]);

  useEffect(() => {
    if (editMode) {
      fetch('/api/side-effects', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          console.log('an unexpected error occurred')
        }
      })
      .then(res => {
        setAllSideEffects(res)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }, [editMode, asOf])

  function updateDrug() {
    fetch(`/api/drugs/${location.pathname.replaceAll("/", "")}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: parseInt(drugInfo.id),
            name: name,
            description: description,
            pearls: pearls
        })
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                alert('An unexpected error occurred')
            }
        })
        .then(res => {
            console.log(res)
            setEditMode(false)
        })
        .catch(err => {
            console.log(err)
        })
    
  }

  function createMarkup(html) {
    return {__html: html}
  }

  return (
    <Container className="mt-1">
      <Row>
        <Col>
          {drugInfo && (
            <Card className="shadow-sm">
              <Card.Body>
              {editMode && <Form.Group>
                        <Form.Label>Drug Name</Form.Label>
                        <Form.Control type='name' value={name} onChange={e => setName(e.target.value)}></Form.Control>
                        <Form.Text>The name of the drug. Typically this will be the generic name of the drug. Brand names will go in the a.k.a section.</Form.Text>
                    </Form.Group>}
                {!editMode && <Card.Title as='h1'>
                {drugInfo.name}{" "}
                    <EditButton user={props.user} setEditMode={setEditMode} />    
                </Card.Title>}
                <Card.Subtitle className="text-muted">
                  <small>also known as Zestril, Prinvil</small>
                </Card.Subtitle>
                <div className="mt-3">
                  <p>
                    Drug Class: <a href="/">ACE-Inhibitor</a>
                  </p>
                  <h3>Counseling Pearls <EditButton user={props.user} setEditMode={setEditMode} />  </h3>
                  {!editMode && <p dangerouslySetInnerHTML={createMarkup(drugInfo.pearls)}></p>}
                  {editMode && <div className='my-3'><CKEditor editor={ClassicEditor} data={pearls} onChange={(e, editor) => {setPearls(editor.getData())}} id='pearls' /></div>
                      }
                  <h3>Side Effects <EditButton user={props.user} setEditMode={setEditMode} />  </h3>
                  {editMode && <div>
                    <div className='d-flex flex-column flex-wrap' style={{maxHeight: '10rem'}}>{renderAllSideEffects(allSideEffects)}</div>
                    <Button size='sm' className='my-3' onClick={() => {setNewSideEffectOpen(true)}}>New Side Effect</Button>
                    </div>}
                  <h3>Description <EditButton user={props.user} setEditMode={setEditMode} />  </h3>
                  {!editMode && <p>{drugInfo.description}</p>}
                  {editMode && <div className='my-3'><CKEditor editor={ClassicEditor} data={description} onChange={(e, editor) => {setDescription(editor.getData())}} id='description' /></div>}
                </div>
              </Card.Body>
              {editMode && <Card.Footer>
                  <Button onClick={() => {updateDrug()}}>Save Changes</Button>
                  </Card.Footer>}
            </Card>
          )}
          {doesNotExist && (
            <Card>
              <Card.Body>
                <Card.Title>Drug Not Found</Card.Title>
                <Card.Text>
                  Uh oh! It appears that we do not have an entry for this drug.
                  If you believe that this is incorrect, please contact us.
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
      <NewSideEffect show={newSideEffectOpen} onHide={setNewSideEffectOpen} setAsOf={setAsOf}></NewSideEffect>
    </Container>
  );
}
