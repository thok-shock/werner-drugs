import React from 'react'
import { Col, Row, Container, Card } from 'react-bootstrap'

export default function Drug(props) {
    return <Container className='mt-1'>
        <Row>
            <Col>
            <Card className='shadow-sm'>
                <Card.Body>
                <Card.Title>Lisinopril</Card.Title>
                <Card.Subtitle>also known as </Card.Subtitle>
                </Card.Body>
            </Card>
            </Col>
        </Row>
    </Container>
}