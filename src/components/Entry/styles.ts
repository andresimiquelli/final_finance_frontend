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
        height: 50px;
        border: none;
        background-color: transparent;
        color: ${props => props.theme.text2};

        position: relative;

        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            color: ${props => props.theme.primary};
        }
    }
`;

interface MenuBoxProps {
    open: boolean;
}

export const MenuBox = styled.div<MenuBoxProps>`
    height: 50px;
    padding: 10px;
    position: absolute;

    top: 0;
    left: 0;

    transform: translate(-100%, 0);

    display: ${props => props.open? 'flex' : 'none'};
    align-items: center;
    justify-content: center;

    > div {
        font-size: 1.2rem;
        color: ${props => props.theme.text2};
        padding: 6px;
        margin-right: 6px;
        border: 1px solid ${props => props.theme.surface0};
        background-color: ${props => props.theme.surface0};
        border-radius: 3px;

        display: flex;
        align-items: center;
        justify-content: center;

        box-shadow: 1px 1px 6px 1px ${props => props.theme.text3};

        cursor: pointer;

        :last-child {
            margin-right: 0;
        }

        :hover {
            background-color: ${props => props.theme.primary};
            color: ${props => props.theme.surface0};
        }
    }
`;