import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 120px;
    
    background-color: ${props => props.theme.surface0};
    border-radius: 7px;
    box-shadow: 0 0 6px ${props => props.theme.text3};
`;

export const YearBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const YearButton = styled.button`

    width: 3rem;
    height: 3rem;

    display: flex;
    align-items: center;
    justify-content: center;

    border: none;
    background-color: ${props => props.theme.surface0};

    font-size: 1.5rem;
    color: ${props => props.theme.text1};

    &.prev {
        transform: rotate(180deg);
    }
`;

export const YearDisplay = styled.h2`
    color: ${props => props.theme.primary};
`;

export const MonthBar = styled.div`
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

interface MonthButtonProps {
    selected?: boolean;
}

export const MonthButton = styled.button<MonthButtonProps>`
    font-size: 1rem;
    font-weight: 300;
    padding: .5rem 1rem;
    
    background-color: ${props => props.selected? props.theme.primary : props.theme.surface0};
    border: none;
    border-radius: 5px;

    color: ${props => props.selected? props.theme.surface0 : props.theme.text2};

    transition: .4s;

    &:hover{
        background-color: ${props => props.selected? props.theme.primary : props.theme.surface2};
    }
`;