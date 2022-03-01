import React from 'react';

import { RiCloseFill } from 'react-icons/ri'

import { Container, Window, TitleBar, ButtonBar, Content } from './styles';

interface ModalProps {
    visible: boolean;
    onClose?(): void;
    onConfirm?(): void;
}

const Modal: React.FC<ModalProps> = ( props ) => {
    return (
        <Container visible={props.visible}>
            <Window>
                <TitleBar>
                    <h3>Title</h3>
                    <button 
                        onClick={() => props.onClose&& props.onClose()}>
                            <RiCloseFill />
                    </button>
                </TitleBar>
                <Content>
                    { props.children }
                </Content>
                <ButtonBar>
                    <button 
                        className='primary' 
                        onClick={() => props.onConfirm&& props.onConfirm()}>
                            Salvar
                    </button>
                </ButtonBar>
            </Window>
        </Container>
    );
}

export default Modal;