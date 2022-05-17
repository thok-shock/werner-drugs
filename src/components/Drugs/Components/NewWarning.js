import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'

export default function NewWarning(props) {

    const [name, setName] = useState('')
    const [warning, setWarning] = useState('')

    function createWarning() {
        fetch('/api/black-box-warnings', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name,
                warning: warning
            })
        })
        .then(res => {
            if (res.ok) {
                toast.success('Created black box warning')
                props.onHide(false)
            } else {
                throw new Error()
            }
        })
        .catch(err => {
            toast.error('An unexpected error occurred')
        })
    }

    return <Modal show={props.show} onHide={() => {props.onHide(false)}}>
        <Modal.Header>New Black Box Warning</Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control value={name} onChange={e => {setName(e.target.value)}}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Warning</Form.Label>
                    <Form.Control as='textarea' value={warning} onChange={e => {setWarning(e.target.value)}}></Form.Control>
                </Form.Group>
            </Form>
            <Button className='mt-3' onClick={() => {
                if (name.length > 1 && warning.length > 1) {
                    createWarning()
                } else {
                    toast.warning('Name or Warning not long enough')
                }
            }}>Create</Button>
        </Modal.Body>
    </Modal>
}