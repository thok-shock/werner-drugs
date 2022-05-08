import React from 'react'
import { Col, Row, Container, Card } from 'react-bootstrap'

export default function Drug(props) {
    return <Container className='mt-1'>
        <Row>
            <Col>
            <Card className='shadow-sm'>
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
            </Card>
            </Col>
        </Row>
    </Container>
}