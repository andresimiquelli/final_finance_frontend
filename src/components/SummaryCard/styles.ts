import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;    
`;

export const Card = styled.div`
    flex: 1;
    padding: 5%;

    background-color: ${props => props.theme.surface0};
    border-radius: 5px;
    color: ${props => props.theme.text1};

    > div {
        display: flex;
        align-items: center;
        margin-bottom: .5rem;
        
        > small {
            margin-right: .5rem;
        }
    }

    &.leftover-positive {
        background-color: ${props => props.theme.secondary};
        color: ${props => props.theme.surface0};
    }

    &.leftover-negative {
        background-color: ${props => props.theme.danger};
        color: ${props => props.theme.surface0};
    }
`;