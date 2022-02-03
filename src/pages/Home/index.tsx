import React from "react";

import Header from "../../components/Header";

import { Container, Row, Col } from 'react-grid-system';

const Home: React.FC = () => {
    return (
        <Container>
            <Row>
                <Col sm={12}>
                    <Header />
                </Col>
            </Row>
        </Container>
    )
}

export default Home;