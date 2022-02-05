import React from 'react';

import { 
    Container, 
    YearBar, 
    YearButton, 
    YearDisplay,
    MonthBar,
    MonthButton } from './styles';

import { MdPlayArrow } from 'react-icons/md';

interface PeriodSelectorProps {
    year: number;
    month: number;
    onChangeYear(year: number): void;
    onChangeMonth(month: number): void;
}

const PeriodSelector: React.FC<PeriodSelectorProps> = ({ year, month, onChangeYear, onChangeMonth }) => {

    return (
        <Container>
            <YearBar>
                <YearButton 
                    className='prev'
                    onClick={() => onChangeYear(year-1)}>
                        <MdPlayArrow />
                </YearButton>
                <YearDisplay>{year}</YearDisplay>
                <YearButton 
                    className='next'
                    onClick={() => onChangeYear(year+1)}>
                        <MdPlayArrow />
                </YearButton>
            </YearBar>
            <MonthBar>
                <MonthButton onClick={() => onChangeMonth(1)} selected={month===1}>Jan</MonthButton>
                <MonthButton onClick={() => onChangeMonth(2)} selected={month===2}>Fev</MonthButton>
                <MonthButton onClick={() => onChangeMonth(3)} selected={month===3}>Mar</MonthButton>
                <MonthButton onClick={() => onChangeMonth(4)} selected={month===4}>Abr</MonthButton>
                <MonthButton onClick={() => onChangeMonth(5)} selected={month===5}>Mai</MonthButton>
                <MonthButton onClick={() => onChangeMonth(6)} selected={month===6}>Jun</MonthButton>
                <MonthButton onClick={() => onChangeMonth(7)} selected={month===7}>Jul</MonthButton>
                <MonthButton onClick={() => onChangeMonth(8)} selected={month===8}>Ago</MonthButton>
                <MonthButton onClick={() => onChangeMonth(9)} selected={month===9}>Set</MonthButton>
                <MonthButton onClick={() => onChangeMonth(10)} selected={month===10}>Out</MonthButton>
                <MonthButton onClick={() => onChangeMonth(11)} selected={month===11}>Nov</MonthButton>
                <MonthButton onClick={() => onChangeMonth(12)} selected={month===12}>Dez</MonthButton>
            </MonthBar>
        </Container>
    )
}

export default PeriodSelector;