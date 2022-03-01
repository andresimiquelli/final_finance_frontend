import styled from 'styled-components';

interface ContainerProps {
    visible: boolean;
}

export const Container = styled.div<ContainerProps>`
    width: 100%;
    height: 100vh;
    z-index: 1;

    position: fixed;
    top: 0;
    left: 0;

    background-color: ${props => props.theme.text1+'55'};
    backdrop-filter: blur(3px);

    display: ${props => props.visible? `flex` : `none`};
    align-items: center;
    justify-content: center;
`;

export const Window = styled.div`
    width: 100%;
    max-width: 800px;

    min-height: 400px;
    max-height: 80vh;
    
    background-color: ${props => props.theme.surface0};

    border: 2px solid ${props => props.theme.surface3};
    border-radius: 7px;

    padding: 1.3rem;

    display: flex;
    flex-direction: column;
`;

export const TitleBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 1.3rem;
    border-bottom: 1px solid ${props => props.theme.surface3};

    > button {
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.3rem;
        border: none;
        color: ${props => props.theme.text2};
    }
`;

export const ButtonBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;

    padding-top: 1.3rem;
    border-top: 1px solid ${props => props.theme.surface3};
`;

export const Content = styled.div`
    width: 100%;
    flex: 1;

    padding-top: 1.3rem;
    padding-bottom: 1.3rem;

    overflow: auto;
`;