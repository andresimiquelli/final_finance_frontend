import styled from 'styled-components';

export const Container = styled.div`
    width: 100;
`;

export const EntriesList = styled.div`
    padding: 1rem;
`;

export const GroupSummaryContainer = styled.div`
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

export const DottedLine = styled.div`
    flex: 1;
    border-bottom: 3px dotted ${props => props.theme.text3};
    margin: 0 1rem 0 0;
`;
