import styled from 'styled-components';

interface ContainerProps {
    opacity?: boolean;
}

export const Container = styled.div<ContainerProps>`
    width: 100;
    padding-bottom: 1rem;

    opacity: ${props => props.opacity? '.4' : '1'};
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
