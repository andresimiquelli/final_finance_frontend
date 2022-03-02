import React, { useState } from 'react';

import { 
    Container, 
    TextContainer, 
    RecurrencyContainer,
    TypeContainer, 
    AmountContainer,
    PaidContainer,
    OptionsContainer,
    MenuBox } from './styles';

import { BiPlus, BiMinus } from 'react-icons/bi';
import { MdCheckBox, MdCheckBoxOutlineBlank, MdEdit, MdDelete } from 'react-icons/md'
import { IoRepeat } from 'react-icons/io5';
import { HiDotsHorizontal } from 'react-icons/hi';

import ApiEntry from '../../types/ApiEntry';

interface EntryProps {
    entry: ApiEntry;
    onPaidClick(id: number, paid: boolean): void;
    onDeleteClick(id: number): void;
    onEditClick(entry: ApiEntry): void;
    disableMenu?: boolean;
}

const Entry: React.FC<EntryProps> = ( props ) => {
    
    const[menuOpen, setMenuOpen] = useState(false)

    return (
        <Container>
            <PaidContainer 
                className={props.entry.paid? 'checked' : 'unchecked'}
                onClick={() => !props.disableMenu&& props.onPaidClick(props.entry.id, props.entry.paid)}>
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
                <button onClick={() => setMenuOpen(true)} onBlur={() => setMenuOpen(false)} disabled={props.disableMenu}>
                  <HiDotsHorizontal />
                  <MenuBox open={menuOpen}>
                    <div onClick={() => props.onEditClick(props.entry)}><MdEdit/></div>
                    <div onClick={() => props.onDeleteClick(props.entry.id)}><MdDelete/></div>
                  </MenuBox>  
                </button>                
            </OptionsContainer>
        </Container>
    );
}

export default Entry;