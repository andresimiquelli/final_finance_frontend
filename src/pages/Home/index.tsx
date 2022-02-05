import React, { useState } from "react";

import Header from "../../components/Header";

import { Container, Row, Col } from 'react-grid-system';
import PeriodSelector from "../../components/PeriodSelector";
import SummaryCard from "../../components/SummaryCard";
import { PeriodSelectorContainer, SummaryContainer } from "./styles";

const Home: React.FC = () => {

    const date = new Date()
    const [periodYear, setPeriodYear] = useState(date.getFullYear())
    const [periodMonth, setPeriodMonth] = useState(date.getMonth()+1)

    return (
        <>
            <Container>
                <Row>
                    <Col sm={12}>
                        <Header />
                    </Col>
                </Row>
            </Container>

            <PeriodSelectorContainer>
                <Container>
                    <Row>
                        <Col>
                        <PeriodSelector
                            year={periodYear}
                            month={periodMonth}
                            onChangeYear={setPeriodYear}
                            onChangeMonth={setPeriodMonth}
                        />
                        </Col>
                    </Row>
                </Container>
            </PeriodSelectorContainer>
            
            <Container>
                <Row>
                    <Col sm={12} md={12} lg={8}>
                    
                    </Col>
                    <Col sm={12} md={12} lg={4}>
                        <SummaryContainer>
                            <SummaryCard />
                        </SummaryContainer>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Home;