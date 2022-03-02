import React, { useState, useEffect } from "react";
import { useApi } from "../../services/ApiService";
import { useAuth } from "../../contexts/AuthContext";

import Header from "../../components/Header";

import { Container, Row, Col } from 'react-grid-system';
import PeriodSelector from "../../components/PeriodSelector";
import SummaryCard from "../../components/SummaryCard";
import { FiPlus } from 'react-icons/fi';
import { VscNewFile } from 'react-icons/vsc';
import { ImUnlocked, ImLock } from 'react-icons/im';

import { PeriodSelectorContainer, SummaryContainer, ButtonBar } from "./styles";

import EntryGroup from "../../components/EntryGroup";
import Spinner from "../../components/Spinner";
import ApiPeriod from "../../types/ApiPeriod";
import ApiEntry from "../../types/ApiEntry";
import EntryForm from "../Frames/EntryForm";
import Modal from "../../components/Modal";

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

    const [entryFormIsVisible, setEntryFormIsVisible] = useState(false)
    const [editEntry, setEditEntry] = useState<ApiEntry | undefined>()
    const [isPromisse, setIsPromisse] = useState(false)

    const [deleteConfirmIsVisible, setDeleteConfirmIsVisible] = useState(false)
    const [deleteId, setDeleteId] = useState(0)

    const [closePeriodConfirmIsVisible, setClosePeriodConfirmIsVisible] = useState(false)
    const [openPeriodConfirmIsVisible, setOpenPeriodConfirmIsVisible] = useState(false)

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
   
        api.get(`/periods/${year}/${month}?walletId=${selectedWallet?.id}`).then(
            response => {
                let lPeriod = response.data as ApiPeriod
                setPeriod(lPeriod)
                calcSummary(lPeriod.entries)
                setEntries(lPeriod.entries.map(ent => ent))
                setIsPromisse(false)
            }
        ).catch(
            error => {
                if(error.response) {
                    if(error.response.status==404){
                        let promisses = getPromisses()
                        setEntries(promisses)
                        calcSummary(promisses)
                        setIsPromisse(true)
                    }
                }

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

    function handleEditEntry(entry: ApiEntry) {
        setEditEntry(entry)
        setEntryFormIsVisible(true)
    }

    function handleDeleteEntry(id: number) {
        setDeleteId(id)
        setDeleteConfirmIsVisible(true)
    }

    function startPeriod() {
        setLoadPeriod(true)
        let data = {
            year: periodYear,
            month: periodMonth,
            walletId: selectedWallet?.id
        }

        api.post('/periods', data)
        .then(
            response => {
                let lPeriod = response.data as ApiPeriod
                loadPeriod(lPeriod.year, lPeriod.month)
            }
        )
        .catch(
            error => {
                console.log(error)
                setLoadPeriod(false)
            }
        )
    }

    function showGroups(lEntries: ApiEntry[]) {
        return (
            entries&&
                <>
                    <ButtonBar>
                    {
                        isPromisse&&                        
                            <button onClick={startPeriod}>
                                <VscNewFile/>Iniciar período
                            </button>
                    }
                    </ButtonBar>
                    <EntryGroup 
                        key={`group_0`}
                        groupId={null}
                        groupTitle="Não agrupados"
                        groupColor="inherit"
                        entries={lEntries}
                        onPaidClick={setPaid}
                        onDeleteClick={handleDeleteEntry}
                        onEditClick={handleEditEntry}
                        opacity={isPromisse}
                    />
                    {
                        selectedWallet?.groups.map((group, index) => 
                            <EntryGroup 
                                key={`group_${index}`}
                                groupId={group.id}
                                groupTitle={group.name}
                                groupColor={group.color}
                                entries={lEntries}
                                onPaidClick={setPaid}
                                onDeleteClick={handleDeleteEntry}
                                onEditClick={handleEditEntry}
                                opacity={isPromisse}
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

    function onSaveEntry(data: ApiEntry[]) {
        loadPeriod(periodYear, periodMonth)
        setEntryFormIsVisible(false)
    }

    function onCloseEntryForm() {
        setEntryFormIsVisible(false)
        setEditEntry(undefined)
    }

    function getPromisses(): ApiEntry[] {

        if(selectedWallet) {
            let promisses = selectedWallet?.recurrences.map(rec => {
                return {
                    id: rec.id,
                    type: rec.type,
                    amount: rec.amount,
                    title: rec.title,
                    description: rec.description,
                    installment: 1,
                    totalInstallments: 1,
                    paid: false,
                    group: rec.group
                } as ApiEntry
            })

            return promisses
        }        

        return []
    }

    function updatePeriod(status: 'OPEN' | 'CLOSE') {
        let data = {status: status}
        setOpenPeriodConfirmIsVisible(false)
        setClosePeriodConfirmIsVisible(false)
        setLoadPeriod(true)
        api.put(`/periods/${period?.id}`, data)
        .then(
            () => loadPeriod(periodYear, periodMonth)
        )
        .catch(
            error => console.log(error)
        )
        .finally(
            () => setLoadPeriod(false)
        )
    }

    function deleteEntry() {
        setLoadPeriod(true)
        setDeleteConfirmIsVisible(false)
        api.delete(`/entries/${deleteId}`)
        .then(
            () => {
                loadPeriod(periodYear, periodMonth)
            }
        )
        .catch(
            error => console.log(error)
        )
        .finally(
            () => setLoadPeriod(false)
        )
    }

    function handleClosePeriod() {
        setClosePeriodConfirmIsVisible(true)
    }

    function handleOpenPeriod() {
        setOpenPeriodConfirmIsVisible(true)
    }

    return (
        <>
            <Modal 
                visible={closePeriodConfirmIsVisible}
                onClose={() => setClosePeriodConfirmIsVisible(false)}
                onConfirm={() => updatePeriod("CLOSE")}
                showCloseButton
                confirmButtonText="Encerrar"
                closeButtonText="Cancelar"
                title="Encerrar período">
                    Ao encerrar o período, seu saldo se soma à carteira. <br/>
                    <strong>Deseja encerrar este período?</strong> 
            </Modal>
            <Modal 
                visible={openPeriodConfirmIsVisible}
                onClose={() => setOpenPeriodConfirmIsVisible(false)}
                onConfirm={() => updatePeriod("OPEN")}
                showCloseButton
                confirmButtonText="Reabrir"
                closeButtonText="Cancelar"
                title="Reabrir período">
                    Ao reabrir o período, seu saldo é subtraído da carteira. <br/>
                    <strong>Deseja reabrir este período?</strong> 
            </Modal>
            <Modal 
                visible={deleteConfirmIsVisible}
                onClose={() => setDeleteConfirmIsVisible(false)}
                onConfirm={deleteEntry}
                showCloseButton
                confirmButtonText="Excluir"
                closeButtonText="Cancelar"
                title="Excluir">
                Deseja exluir este lançamento?
            </Modal>
            <EntryForm 
                open={entryFormIsVisible}
                onClose={onCloseEntryForm}
                groups={selectedWallet?.groups}
                periodMonth={periodMonth}
                periodYear={periodYear}
                onSave={onSaveEntry}
                entry={editEntry}
            />
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
                            loadingPeriod? <Spinner /> : showGroups(entries? entries : [])
                        }                        
                    </Col>
                    <Col sm={12} md={12} lg={4}>
                        <SummaryContainer>
                            <ButtonBar>
                                {
                                    !isPromisse&&
                                        period&&
                                            period.status==='OPEN'&&
                                                <button onClick={() => setEntryFormIsVisible(true)}>
                                                    <FiPlus />Novo lançamento
                                                </button>
                                }
                                {
                                    period&&
                                        period.status==='CLOSE'&&
                                            <button onClick={handleOpenPeriod}>
                                                <ImLock /> Reabrir período
                                            </button>
                                }
                            </ButtonBar>
                            <SummaryCard 
                                credit={totalCredits}
                                debit={totalDebits}
                            />
                            <ButtonBar>
                                {
                                    !isPromisse&&
                                        period&&
                                            period.status === 'OPEN'&&
                                                <button onClick={handleClosePeriod}>
                                                    <ImUnlocked /> Encerrar período
                                                </button>
                                }
                                
                            </ButtonBar>
                        </SummaryContainer>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Home;