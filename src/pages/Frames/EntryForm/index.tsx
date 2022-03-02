import React,{ useEffect, useState } from 'react';

import { Container, ErrorMessage } from './styles';

import InputRadio from '../../../components/InputRadio';
import ApiEntry from '../../../types/ApiEntry';
import ApiGroup from '../../../types/ApiGroup';
import { useAuth } from '../../../contexts/AuthContext';
import { useApi } from '../../../services/ApiService';
import Modal from '../../../components/Modal';
import Spinner from '../../../components/Spinner';

interface EntryFormProps {
    open: boolean;
    onClose(): void;
    entry?: ApiEntry;
    groups?: ApiGroup[];
    periodMonth: number;
    periodYear: number;
    onSave?(data: ApiEntry[]): void;
}

type postEntry = {
    periodId?: number;
    periodYear?: number;
    periodMonth?: number;
    walletId?: number;
    type: string;
    amount: number;
    title: string;
    description?: string;
    groupId?: number;
}

const EntryForm: React.FC<EntryFormProps> = ( props ) => {

    const { token, selectedWallet } = useAuth()
    const api = useApi(token)

    const[id,setId] = useState(0)
    const[type,setType] = useState('DEBIT')
    const[title,setTitle] = useState('')
    const[description,setDescription] = useState<string>('')
    const[group,setGroup] = useState<number>(0)
    const[amount,setAmount] = useState(0)
    const[installments,setInstallments] = useState(1)

    const[loading,setLoading] = useState(false)
    const[errorTitle,setErrorTitle] = useState('')

    useEffect(() => {
        setId(props.entry? props.entry.id : 0)
        setType(props.entry? props.entry.type : 'DEBIT')
        setTitle(props.entry? props.entry.title : '')
        setDescription(props.entry? props.entry.description? props.entry.description : '' : '')
        setGroup(props.entry? props.entry.group? props.entry.group.id : 0 : 0)
        setAmount(props.entry? props.entry.amount : 0)
    },[props.entry])

    function handleChangeAmount(value: string) {
        let am = parseFloat(value)
        setAmount(Math.floor(am*100))
    }

    function save() {
        
        if(validate())
        {
            if(id > 0)
                saveEdit()
            else
                saveNew()
        }
    }

    function saveNew() {
        setLoading(true)
        let data = mountData()
        api.post('/entries', data)
        .then(
            response => {
                cleanForm()
                props.onSave&&
                    props.onSave([response.data])
            }
        )
        .catch(
            error => console.log(error)
        )
        .finally(
            () => setLoading(false)
        )
    }

    function saveEdit() {
        setLoading(true)
        let data = mountData()
        api.put(`/entries/${id}`, data)
        .then(
            response => {
                cleanForm()
                props.onSave&&
                    props.onSave([response.data])
            }
        )
        .catch(
            error => console.log(error)
        )
        .finally(
            () => setLoading(false)
        )
    }

    function mountData(): postEntry {
        let data = {} as postEntry
        data.amount = amount
        data.type = type
        data.title = title
        data.periodMonth = props.periodMonth
        data.periodYear = props.periodYear
        data.walletId = selectedWallet?.id

        if(description.length > 0)
            data.description = description

        if(group>0)
            data.groupId = group

        return data
    }

    function validate(): boolean {
        let valid = true;

        if(title.trim().length===0){
            setErrorTitle('O título não pode ficar vazio')
            valid = false;
        }else{
            setErrorTitle('')
        }

        return valid;
    }

    function cleanForm() {
        setType('DEBIT')
        setTitle('')
        setDescription('')
        setGroup(0)
        setAmount(0)
        setInstallments(1)
    }

    function showForm() {
        return (
            <Modal visible={props.open} title="Entrada" onClose={props.onClose} onConfirm={save}>
                <Container>
                        <div>
                            <div>
                                <InputRadio 
                                    options={[
                                        {label: 'Saída', value: 'DEBIT'},
                                        {label: 'Entrada', value: 'CREDIT'}
                                    ]}
                                    value={type}
                                    onChange={(value) => setType(value.toString())} />
                            </div>
                            <div>
                                {
                                    props.groups&&
                                    <select onChange={(e) => setGroup(parseInt(e.target.value))} value={group}>
                                        <option value="0" key={`g-1`} >Sem grupo</option>
                                        {
                                            props.groups.map(g => 
                                                <option
                                                    key={`g${g.id}`} 
                                                    value={g.id}>
                                                    {g.name}
                                                </option>
                                            )
                                        }
                                    </select>
                                }                        
                            </div>
                        </div>
                        <div>
                            <div className='group'>
                                <input 
                                    type="text" value={title} 
                                    onChange={(e) => setTitle(e.target.value) }
                                    placeholder="Título"
                                    maxLength={54}/>
                                { errorTitle.length>0&& <ErrorMessage>{errorTitle}</ErrorMessage> }
                            </div>
                            
                        </div>
                        <div>
                            <input 
                                type="text" value={description} 
                                onChange={(e) => setDescription(e.target.value) }
                                placeholder="Descrição"/>
                        </div>
                        <div>
                            <div>
                                Valor
                                <input type="number" step=".01" value={amount} onChange={(e) => handleChangeAmount(e.target.value)} />
                            </div>
                            <div>
                                Parcelas
                                <input 
                                    disabled={props.entry?true:false}
                                    type="number" 
                                    step={1} 
                                    min={1} 
                                    max={99} 
                                    value={installments} 
                                    onChange={(e) => setInstallments(parseInt(e.target.value))}/>
                            </div>
                        </div>
                </Container>
            </Modal>
        )
    }

    return (
        loading? <Spinner /> : showForm()
    );
}

export default EntryForm;