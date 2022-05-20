import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import { toast } from 'react-toastify'
import BBCheckbox from './BBCheckbox'
import NewWarning from './NewWarning'

function renderWarnings(warnings, warningsForDrug, drug_id) {
    if (warnings && warnings.length > 0) {
        return warnings.map(warn => {
            return <tr key={warn.id}>
                <td>{<BBCheckbox warn={warn} warningsForDrug={warningsForDrug} drug_id={drug_id} />}</td>
                <td>{warn.name}</td>
                <td>{warn.warning}</td>
            </tr>
        })
    }
}

export default function BlackBoxWarnings(props) {

    const [showNewModal, setShowNewModal] = useState(false)
    const [warnings, setWarnings] = useState(null)

    useEffect(() => {
        if (props.show) {
            fetch('/api/black-box-warnings', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error()
                }
            })
            .then(res => {
                setWarnings(res)
            })
            .catch(err => {
                toast.error('An unexpected error occurred')
            })
        }
        
    }, [showNewModal, props.show])

    return <Modal size='lg' show={props.show} onHide={() => {props.onHide(false)}}>
        <Modal.Header>Black Box Warnings</Modal.Header>
        <Modal.Body>
            <p>All Black Box Warnings will appear here. Select the Black Box Warnings that are applicable to this drug</p>
            <div style={{maxHeight: '50vh', overflowY: 'auto'}}>
            <Table>
                <thead><tr>
                    <td></td>
                    <td>Name</td>
                    <td>Warning</td>
                    </tr></thead>
                    <tbody>{renderWarnings(warnings, props.blackBoxWarningsOfDrug, props.drug_id)}</tbody>
            </Table>
            </div>
            <Button className='mt-3' onClick={() => {setShowNewModal(true)}}>Create New Warning</Button>
            <NewWarning show={showNewModal} onHide={setShowNewModal}></NewWarning>
        </Modal.Body>
    </Modal>
}