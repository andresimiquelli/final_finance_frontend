import React from 'react';

import { 
    Container, 
    TextContainer, 
    RecurrencyContainer,
    TypeContainer, 
    AmountContainer,
    PaidContainer,
    OptionsContainer } from './styles';

import { BiPlus, BiMinus } from 'react-icons/bi';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { IoRepeat } from 'react-icons/io5';
import { HiDotsHorizontal } from 'react-icons/hi';

import ApiEntry from '../../types/ApiEntry';

interface EntryProps {
    entry: ApiEntry;
    onPaidClick(id: number, paid: boolean): void;
}

const Entry: React.FC<EntryProps> = ( props ) => {
    
    return (
        <Container>
            <PaidContainer 
                className={props.entry.paid? 'checked' : 'unchecked'}
                onClick={() => props.onPaidClick(props.entry.id, props.entry.paid)}>
            {props.entry.paid? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
            </PaidContainer>
            <TextContainer>
                <h4>{props.entry.title}</h4>
                <small>{props.entry.description}</small>
            </TextContainer>
            <RecurrencyContainer>
                <IoRepeat />
            </RecurrencyContainer>
            <TypeContainer>
                {props.entry.type == 'CREDIT'? <BiPlus /> : <BiMinus />}
            </TypeContainer>
            <AmountContainer>
                R$ {props.entry.amount}
            </AmountContainer>
            <OptionsContainer>
                <button>
                  <HiDotsHorizontal />  
                </button>                
            </OptionsContainer>
        </Container>
    );
}

export default Entry;