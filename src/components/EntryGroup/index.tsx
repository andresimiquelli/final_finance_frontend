import React from 'react';

import EntryCard from '../../components/Entry';
import ApiEntry from '../../types/ApiEntry';

import { Container, EntriesList } from './styles';

const entry1 = {
    id: 1,
    title: "Conta de luz",
    description: "Conta de luz referente a dezembro",
    type: 'DEBIT',
    paid: false,
    installment: 1,
    installmentTotal: 1,
    amount: 103.5
} as ApiEntry

const entry2 = {
    id: 1,
    title: "Internet",
    type: 'DEBIT',
    paid: false,
    installment: 1,
    installmentTotal: 1,
    amount: 69.9
} as ApiEntry

const entries = [entry1, entry2]

const EntryGroup: React.FC = () => {
    return (
        <Container>
            <h3>Título do grupo</h3>
            <EntriesList>
                {entries.map((entry, index) => <EntryCard key={index} entry={entry}/>)}                
            </EntriesList>
            
        </Container>
    );
}

export default EntryGroup;