import styled from 'styled-components';

export const LoginForm = styled.div`
    width: 100%;
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    

    > div.box {
        width: 100% ;
        padding: 1rem;
        border: 1px solid ${props => props.theme.surface3};
        border-radius: 5px;
        box-shadow: 0 0 5px 2px ${props => props.theme.surface3};

        > form {
            > div {
                margin: .5rem 0;
                text-align: center;
            }
        }
    }
`;

export const Logo = styled.div`
    text-align: center;

    > img {
        width: 80%;
        margin: 2rem 0;
    }
`;

export const ErrorMessage = styled.div`
    padding: 1rem 0;
    font-weight: bold;
    font-size: .9rem;
    color: ${props => props.theme.danger};
`;

export const WalletList = styled.div`
    > div {
        display: flex;
        align-items: center;
         > h3 {
             flex: 1;
             padding: 1rem;
         }

         > h5 {
             min-width: 30%;
         }

         &:hover {
            color: ${props => props.theme.primary};
        }
    }

    cursor: pointer;
`;