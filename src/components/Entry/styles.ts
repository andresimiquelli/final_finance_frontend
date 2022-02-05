import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    margin-bottom: .7rem;
    padding-bottom: .7rem;

    display: flex;
    align-items: center;

    border-bottom: 1px solid ${props => props.theme.surface3};
`;

export const TextContainer = styled.div`
    flex: 1;

    > small {
        color: ${props => props.theme.text2};
    }
`;

export const RecurrencyContainer = styled.div`
    min-width: 1rem;
    color: ${props => props.theme.text3};
`;

export const TypeContainer = styled.div`
    width: 1.5rem;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const AmountContainer = styled.div`
    min-width: 25%;
`;

export const PaidContainer = styled.div`
    min-width: 2rem;
    font-size: 1.5rem;

    color: ${props => props.theme.text3};

    cursor: pointer;
    
    &.checked {
        color: ${props => props.theme.primary};
    }
`;

export const OptionsContainer = styled.div`
    min-width: 1.5rem;

    > button {
        width: 1.5rem;
        height: 1.5rem;
        border: none;
        background-color: transparent;
        color: ${props => props.theme.text2};
    }
`;