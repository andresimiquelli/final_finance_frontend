import React, { useState } from "react";

import Header from "../../components/Header";

import { Container, Row, Col } from 'react-grid-system';
import PeriodSelector from "../../components/PeriodSelector";

const Home: React.FC = () => {

    const date = new Date()
    const [periodYear, setPeriodYear] = useState(date.getFullYear())
    const [periodMonth, setPeriodMonth] = useState(date.getMonth()+1)

    return (
        <Container>
            <Row>
                <Col sm={12}>
                    <Header />
                    <PeriodSelector
                        year={periodYear}
                        month={periodMonth}
                        onChangeYear={setPeriodYear}
                        onChangeMonth={setPeriodMonth}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default Home;