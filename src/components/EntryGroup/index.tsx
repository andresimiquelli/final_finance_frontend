import React, { useState, useEffect } from 'react';

import EntryCard from '../../components/Entry';
import ApiEntry from '../../types/ApiEntry';

import { Container, EntriesList, GroupSummaryContainer, DottedLine } from './styles';

interface EntryGroupProps {
    groupId: number | null;
    groupTitle: string;
    groupColor: string;
    entries: ApiEntry[];
}

const EntryGroup: React.FC<EntryGroupProps> = ( props ) => {

    const [entries, setEntries] = useState<ApiEntry[]>([])
    const [amount, setAmount] = useState(0)

    useEffect(() => {
        let fEntries = props.entries.filter(
            entry => entry.group&& 
                (props.groupId===null? 
                    (entry.group === null) :
                    (entry.group.id===props.groupId))
                )
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
                    entries.map((entry, index) => <EntryCard key={index} entry={entry}/>)
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