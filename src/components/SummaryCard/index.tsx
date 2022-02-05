import React from 'react';

import { Container, Card } from './styles';

const SummaryCard: React.FC = () => {
    return (
        <Container>
            <Card className='leftover-negative'>
                <h4>Saldo</h4>
                <div>
                    <small>R$</small>
                    <h1>1.389.000,00</h1>
                </div>
            </Card>
            <Card>
                <h5>Receitas</h5>
                <div>
                    <small>R$</small>
                    <h2>1.389.000,00</h2>
                </div>
                <h5>Despesas</h5>
                <div>
                    <small>R$</small>
                    <h2>1.389.000,00</h2>
                </div>
            </Card>
        </Container>
    );
}

export default SummaryCard;