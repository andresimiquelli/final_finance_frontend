import styled from 'styled-components';

export const PeriodSelectorContainer = styled.div`
    margin: 1rem 0;
    border-top: 1px solid ${props => props.theme.surface3};
    border-bottom: 1px solid ${props => props.theme.surface3};
`;

export const SummaryContainer = styled.div`
    border-left: 1px solid ${props => props.theme.surface3};
    padding-left: 1rem;
`;

export const ButtonBar = styled.div`
    display: flex;
    align-items: center;

    padding: 1rem 0;

    > button {
        border: none;
        background-color: transparent;
        padding: .5rem 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${props => props.theme.text1};
        font-weight: bold;

        > svg {
            margin-right: .5rem;
        }

        &:hover {
            color: ${props => props.theme.primary};
        }
    }
`;