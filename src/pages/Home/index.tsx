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
import ApiEntry from "../../types/ApiEntry";
import Modal from "../../components/Modal";
import EntryForm from "../Frames/EntryForm";

const Home: React.FC = () => {

    const { token, selectedWallet } = useAuth()
    const api = useApi(token)

    const date = new Date()
    const [periodYear, setPeriodYear] = useState(date.getFullYear())
    const [periodMonth, setPeriodMonth] = useState(date.getMonth()+1)
    const [loadingPeriod, setLoadPeriod] = useState(true)
    const [period, setPeriod] = useState<ApiPeriod>()
    const [entries, setEntries] = useState<ApiEntry[]>()
    const [totalCredits, setTotalCredits]  = useState(0)
    const [totalDebits, setTotalDebits]  = useState(0)

    const [entryFormIsVisible, setEntryFormIsVisible] = useState(true)

    useEffect(() => {
        loadPeriod(periodYear, periodMonth)
    },[periodYear, periodMonth])

    function handleYear(year: number) {
        setPeriodYear(year)
    }

    function handleMonth(month: number) {
        setPeriodMonth(month)
    }

    function loadPeriod(year: number, month: number) {
        setLoadPeriod(true)
   
        api.get(`/periods/${year}/${month}`).then(
            response => {
                let lPeriod = response.data as ApiPeriod
                setPeriod(lPeriod)
                calcSummary(lPeriod.entries)
                setEntries(lPeriod.entries.map(ent => ent))
            }
        ).catch(
            () => {
                setPeriod(undefined)
            }
        ).finally(
            () => setLoadPeriod(false)
        )
    }

    function setPaid(id: number, paid: boolean) {
        let ents = entries?.map(ent => {
            if(ent.id === id)
                ent.paid = !paid
            return ent
        })
        
        setEntries(ents)

        api.put(`/entries/${id}`,{paid: !paid})
        .catch(
            () => {
                let ents = entries?.map(ent => {
                    if(ent.id === id)
                        ent.paid = paid
                    return ent
                })

                setEntries(ents)
            }
        )
    }

    function showGroups() {
        return (
            period&&
                <>
                    <EntryGroup 
                        key={`group_0`}
                        groupId={null}
                        groupTitle="Não agrupados"
                        groupColor="inherit"
                        entries={entries? entries: []}
                        onPaidClick={setPaid}
                    />
                    {
                        selectedWallet?.groups.map((group, index) => 
                            <EntryGroup 
                                key={`group_${index}`}
                                groupId={group.id}
                                groupTitle={group.name}
                                groupColor={group.color}
                                entries={entries? entries : []}
                                onPaidClick={setPaid}
                            />
                        )
                    }
                </>
        )
    }

    function calcSummary(lEntries: ApiEntry[]) {
        let credits = 0
        let debits = 0
        lEntries.forEach(entry => {
            if(entry.type==='CREDIT')
                credits += entry.amount
            else
                debits += entry.amount
        })

        setTotalCredits(credits)
        setTotalDebits(debits)
    }

    return (
        <>
            <Modal visible={entryFormIsVisible} onClose={() => setEntryFormIsVisible(false)}>
                <EntryForm />
            </Modal>
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
                            loadingPeriod? <Spinner /> : showGroups()
                        }                        
                    </Col>
                    <Col sm={12} md={12} lg={4}>
                        <SummaryContainer>
                            <SummaryCard 
                                credit={totalCredits}
                                debit={totalDebits}
                            />
                        </SummaryContainer>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Home;