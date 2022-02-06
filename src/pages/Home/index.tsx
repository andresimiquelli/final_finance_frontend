import React, { useState, useEffect } from "react";
import { useApi } from "../../services/ApiService";
import { useAuth } from "../../contexts/AuthContext";

import Header from "../../components/Header";

import { Container, Row, Col } from 'react-grid-system';
import PeriodSelector from "../../components/PeriodSelector";
import SummaryCard from "../../components/SummaryCard";
import { PeriodSelectorContainer, SummaryContainer } from "./styles";
import EntryGroup from "../../components/EntryGroup";
import Spinner from "../../components/Spinner";
import ApiPeriod from "../../types/ApiPeriod";

const Home: React.FC = () => {

    const { token } = useAuth()
    const api = useApi(token)

    const date = new Date()
    const [periodYear, setPeriodYear] = useState(date.getFullYear())
    const [periodMonth, setPeriodMonth] = useState(date.getMonth()+1)
    const [loadingPeriod, setLoadPeriod] = useState(true)
    const [period, setPeriod] = useState<ApiPeriod>()

    useEffect(() => {
        loadPeriod(periodYear, periodMonth)
    },[])

    function handleYear(year: number) {
        setPeriodYear(year)
        loadPeriod(year, periodMonth)
    }

    function handleMonth(month: number) {
        setPeriodMonth(month)
        loadPeriod(periodYear, month)
    }

    function loadPeriod(year: number, month: number) {
        setLoadPeriod(true)
   
        api.get(`/periods/${year}/${month}`).then(
            response => {
                setPeriod(response.data)
            }
        ).catch(
            error => {
                console.log(error)
            }
        ).finally(
            () => setLoadPeriod(false)
        )
    }

    function mountGroups() {
        console.log(period)
    }

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
                            onChangeYear={handleYear}
                            onChangeMonth={handleMonth}
                        />
                        </Col>
                    </Row>
                </Container>
            </PeriodSelectorContainer>
            
            <Container>
                <Row>
                    <Col sm={12} md={12} lg={8}>
                        {
                            loadingPeriod? <Spinner /> : mountGroups()
                        }
                        <EntryGroup />
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