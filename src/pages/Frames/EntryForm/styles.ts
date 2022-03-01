import styled from 'styled-components';

export const Container = styled.div`
    
    > div {
        padding: .5rem 0 .5rem 0;
        display: flex;
        align-items: center;

        > div {
            flex: 1;

            padding-left: .5rem;
            padding-right: .5rem;

            :last-child {
                padding-right: 0;
            }

            :first-child {
                padding-left: 0;
            }
        }

        > div.group {
            flex-direction: column;
        }
    }

`;

export const ErrorMessage = styled.small`
    color: ${props => props.theme.error};
    padding-left: .5rem;
`;