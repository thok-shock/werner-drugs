import React, {useEffect, useState } from "react";
import { Col, Row, Container, Card, Form, Button } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";
import { useLocation } from "react-router-dom";
//import {CKEditor} from '@ckeditor/ckeditor5-react'
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import EditButton from "./Components/EditButton";
import NewSideEffect from "./Components/NewSideEffect";
import { toast } from "react-toastify";
import SideEffect from "./Components/SideEffect";
import BlackBoxWarnings from "./Components/BlackBoxWarnings";


function renderAllSideEffects(allSideEffects, drug_id, sideEffects, setAsOf) {
  if (allSideEffects && allSideEffects.length > 0) {
    return allSideEffects.map(sx => {
      return <SideEffect key={sx.id} name={sx.name} id={sx.id} drug_id={drug_id} side_effects={sideEffects} setAsOf={setAsOf} />
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
  const [showBBS, setShowBBS] = useState(false)
  const [BBSofDrug, setBBSofDrug] = useState(null)
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
        toast.error('An unexpected error occurred')
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
          toast.error('An unexpected error occurred')
        }
      })
      .then(res => {
        setAllSideEffects(res)
      })
      .catch(err => {
        toast.error('An unexpected error occurred')
      })
    }
  }, [editMode, asOf])

  useEffect(() => {
      if (drugInfo) {
        fetch(`/api/drugs/get-side-effects-of-drug/${drugInfo.name}`)
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                toast.error('An unexpected error occurred')
            }
        })
        .then(res => {
            setSideEffects(res)
        })
        .catch(() => {
            toast.error('An unexpected error occurred')
        })
      }
      
  }, [drugInfo, asOf])

  useEffect(() => {
      if (drugInfo) {
          fetch(`/api/drugs/get-black-box-warnings-of-drug/${drugInfo.name}`)
          .then(res => {
              if (res.ok) {
                  return res.json()
              } else {
                  throw new Error()
              }
          })
          .then(res => {
              setBBSofDrug(res)
          })
          .catch(() => {
              toast.error('An unexpected error occurred')
          })
      }
  }, [drugInfo, asOf, showBBS])

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
                toast.error('An unexpected error occurred')
            }
        })
        .then(res => {
            setAsOf(new Date())
            toast.success('Updated drug information')
            setEditMode(false)
        })
        .catch(err => {
            toast.error('An unexpected error occurred')
        })
    
  }

  function createMarkup(html) {
    return {__html: html}
  }

  function createDrug() {
      fetch(`/api/drugs/${location.pathname.replaceAll("/", "")}`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
          if (res.ok) {
              setAsOf(new Date())
              setDoesNotExist(false)
              toast.success('Created new Drug')
          } else {
              throw new Error()
          }
      })
      .catch(err => {
          toast.error('An unexpected error occurred')
      })
  }

  return (
<div>
          {drugInfo && (
            <Card className="shadow-sm">
              <Card.Body>
              {editMode && <Form.Group>
                        <Form.Label>Drug Name</Form.Label>
                        <Form.Control type='name' value={name} onChange={e => setName(e.target.value)}></Form.Control>
                        <Form.Text>The name of the drug. Typically this will be the generic name of the drug. Brand names will go in the a.k.a section.</Form.Text>
                    </Form.Group>}
                {!editMode && <Card.Title as='h1' style={{textTransform: 'capitalize'}}>
                {drugInfo.name}{" "}
                    <EditButton user={props.user} setEditMode={setEditMode} editMode={editMode} />    
                </Card.Title>}
                {/* <Card.Subtitle className="text-muted">
                  <small>also known as Zestril, Prinvil</small>
                </Card.Subtitle> */}
                <div className="mt-3">
                  {/* <p>
                    Drug Class: <a href="/">ACE-Inhibitor</a>
                  </p> */}
                  {BBSofDrug && BBSofDrug.length > 0 && BBSofDrug.map(bbw => {
                      return <Card key={bbw.id} style={{backgroundColor: 'black', color: 'white'}} className='my-3'>
                          <Card.Body>
                          <Card.Title>Black Box Warning</Card.Title>
                          <Card.Subtitle>{bbw.name}</Card.Subtitle>
                          <Card.Text className='mt-3'><small>{bbw.warning}</small></Card.Text>
                          </Card.Body>
                      </Card>
                  })}
                  {editMode && <Button onClick={() => setShowBBS(true)} variant='dark'>Black Box Warnings</Button>}
                  <h3>Counseling Pearls <EditButton user={props.user} setEditMode={setEditMode} editMode={editMode} />  </h3>
                  {!editMode && <p dangerouslySetInnerHTML={createMarkup(drugInfo.pearls)}></p>}
                  {editMode && <div className='my-3'><CKEditor editor={ClassicEditor} data={pearls} onChange={(e, editor) => {setPearls(editor.getData())}} id='pearls' /></div>
                      }
                  <h3>Side Effects <EditButton user={props.user} setEditMode={setEditMode} editMode={editMode} />  </h3>
                  {!editMode && sideEffects && <ul> {sideEffects.map(sx => {
                    return <li>{sx.name}</li>
                  })}</ul>}
                  {editMode && <div>
                    <div className='d-flex flex-column flex-wrap' style={{maxHeight: '10rem'}}>{renderAllSideEffects(allSideEffects, drugInfo.id, sideEffects, setAsOf)}</div>
                    <Button size='sm' className='my-3' onClick={() => {setNewSideEffectOpen(true)}}>New Side Effect</Button>
                    </div>}
                  <h3>Description <EditButton user={props.user} setEditMode={setEditMode} editMode={editMode} />  </h3>
                  {!editMode && <p dangerouslySetInnerHTML={createMarkup(drugInfo.description)}></p>}
                  {editMode && <div className='my-3'><CKEditor editor={ClassicEditor} data={description} onChange={(e, editor) => {setDescription(editor.getData())}} id='description' /></div>}
                </div>
              </Card.Body>
              {editMode && <Card.Footer>
                  <Button onClick={() => {updateDrug()}}>Save Changes</Button>
                  </Card.Footer>}
                  <BlackBoxWarnings show={showBBS} onHide={setShowBBS} drug_id={drugInfo.id} blackBoxWarningsOfDrug={BBSofDrug}></BlackBoxWarnings>
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
                {props.user ? <Button onClick={() => {createDrug()}}>Add To Database</Button> : <></>}
              </Card.Body>
            </Card>
          )}
      <NewSideEffect show={newSideEffectOpen} onHide={setNewSideEffectOpen} setAsOf={setAsOf}></NewSideEffect>
    </div>
  );
}
