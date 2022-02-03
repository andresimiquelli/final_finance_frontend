import styled from "styled-components";


export const Container = styled.div`
    width: 100%;   

    margin-top: 1rem;

    > img {
        height: 2rem;
    }
`;

export const Logo = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 4rem;
`;

export const User = styled.div`
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    > h5 {
        margin-right: 1rem;
    }
`;