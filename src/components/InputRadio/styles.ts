import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;

    > button {
        padding: .5rem 1rem;

        border-top: 1px solid ${props => props.theme.text3};
        border-bottom: 1px solid ${props => props.theme.text3};
        border-left: 1px solid ${props => props.theme.text3};
        border-right: none;

        background-color: ${props => props.theme.surface2};
        color: ${props => props.theme.text2};

        :last-child {
            border-right: 1px solid ${props => props.theme.text3};
            border-radius: 0 5px 5px 0;
            
        }

        :first-child {
            border-radius: 5px 0 0 5px;
        }

        &.selected {
            background-color: ${props => props.theme.primary};
            color: ${props => props.theme.surface0};
            border-color: ${props => props.theme.primary};
        }

    }
`;