import React from 'react';

import { Container, Card } from './styles';

interface SummaryCardProps {
    credit: number;
    debit: number;
}

const SummaryCard: React.FC<SummaryCardProps> = ( props ) => {
    return (
        <Container>
            <Card className='leftover-negative'>
                <h4>Saldo</h4>
                <div>
                    <small>R$</small>
                    <h1>{ props.credit - props.debit }</h1>
                </div>
            </Card>
            <Card>
                <h5>Receitas</h5>
                <div>
                    <small>R$</small>
                    <h2>{ props.credit }</h2>
                </div>
                <h5>Despesas</h5>
                <div>
                    <small>R$</small>
                    <h2>{ props.debit }</h2>
                </div>
            </Card>
        </Container>
    );
}

export default SummaryCard;