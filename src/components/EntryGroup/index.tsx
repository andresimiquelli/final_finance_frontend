import React, { useState, useEffect } from 'react';

import EntryCard from '../../components/Entry';
import ApiEntry from '../../types/ApiEntry';

import { Container, EntriesList, GroupSummaryContainer, DottedLine } from './styles';

interface EntryGroupProps {
    groupId: number | null;
    groupTitle: string;
    groupColor: string;
    entries: ApiEntry[];
    onPaidClick(id: number, paid: boolean): void;
}

const EntryGroup: React.FC<EntryGroupProps> = ( props ) => {

    const [entries, setEntries] = useState<ApiEntry[]>([])
    const [amount, setAmount] = useState(0)

    useEffect(() => {
        let fEntries = props.entries.filter( entry => {
            if(!props.groupId){
                if(!entry.group)
                    return true
            } else {
                if(entry.group)
                    return entry.group.id === props.groupId
            }                

            return false
        })
        setEntries(fEntries)
        let fAmount = 0
        fEntries.forEach(entry => {
            entry.type === 'CREDIT'?
                fAmount += entry.amount :
                fAmount -= entry.amount
        })
        setAmount(fAmount)        
    },[props.groupId])

    return (
        <Container>
            <h3>{ props.groupTitle }</h3>
            <EntriesList>
                {
                    entries.map((entry, index) => <EntryCard key={index} entry={entry} onPaidClick={props.onPaidClick}/>)
                }                
            </EntriesList>
            <GroupSummaryContainer>
                <DottedLine />
                <div>
                    <h3>R$ { amount }</h3>
                </div>
            </GroupSummaryContainer>
        </Container>
    );
}

export default EntryGroup;