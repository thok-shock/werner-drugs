import React, { useEffect, useState } from 'react'
import { Col, Row, Container, Card } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

export default function Drug(props) {

    const [drugInfo, setDrugInfo] = useState(null)
    const [doesNotExist, setDoesNotExist] = useState(false)
    const location = useLocation()

    useEffect(() => {
        fetch(`/api/drugs/${location.pathname.replaceAll('/', '')}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                setDoesNotExist(true)
            }
        })
        .then(res => {
            setDrugInfo(res)
        })
        .catch(err => {
            alert(err)
        })
    }, [location])


    return <Container className='mt-1'>
        <Row>
            <Col>
            {drugInfo && <Card className='shadow-sm'>
                <Card.Body>
                <Card.Title>Lisinopril</Card.Title>
                <Card.Subtitle className='text-muted'><small>also known as Zestril, Prinvil</small></Card.Subtitle>
                <div className='mt-3'>
                    <p>Drug Class: <a href='/'>ACE-Inhibitor</a></p>
                    <h6>Counseling Pearls</h6>
                    <p>These are some pearls</p>
                    <h6>Side Effects</h6>
                    <ul>
                        <li>Hypotension</li>
                    </ul>
                    <h6>Description</h6>
                    <p>Lisinopril is a medication that was designed for use for high-blood pressure</p>
                </div>
                </Card.Body>
            </Card>}
            {doesNotExist && <Card>
                <Card.Body>
                    <Card.Title>Drug Not Found</Card.Title>
                    <Card.Text>Uh oh! It appears that we do not have an entry for this drug. If you believe that this is incorrect, please contact us.</Card.Text>
                </Card.Body>
                </Card>}
            </Col>
        </Row>
    </Container>
}