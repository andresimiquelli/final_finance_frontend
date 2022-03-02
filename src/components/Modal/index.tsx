import React from 'react';

import { RiCloseFill } from 'react-icons/ri'

import { Container, Window, TitleBar, ButtonBar, Content } from './styles';

interface ModalProps {
    visible: boolean;
    onClose?(): void;
    onConfirm?(): void;
    title?: string;
    showCloseButton?: boolean;
    closeButtonText?: string;
    hideCloseIcon?: boolean;
    hideTitleBar?: boolean;
    confirmButtonText?: string;
}

const Modal: React.FC<ModalProps> = ( props ) => {
    return (
        <Container visible={props.visible}>
            <Window>
                {
                    !props.hideTitleBar&&
                        <TitleBar>
                            <h3>{props.title}</h3>
                            {
                                !props.hideCloseIcon&&
                                <button 
                                    onClick={() => props.onClose&& props.onClose()}>
                                        <RiCloseFill />
                                </button>
                            }
                        </TitleBar>
                }
                
                <Content>
                    { props.children }
                </Content>
                <ButtonBar>
                    {
                        props.showCloseButton&&
                        <button className='secondary' onClick={() => props.onClose&& props.onClose()}>
                            {props.closeButtonText? props.closeButtonText : 'Cancelar'}
                        </button>
                    }
                    <button 
                        className='primary' 
                        onClick={() => props.onConfirm&& props.onConfirm()}>
                            { props.confirmButtonText? props.confirmButtonText : 'Ok'}
                    </button>
                </ButtonBar>
            </Window>
        </Container>
    );
}

export default Modal;