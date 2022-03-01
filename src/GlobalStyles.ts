import { createGlobalStyle } from 'styled-components';
import { isPropertySignature } from 'typescript';

import DefaultTheme from './themes/DefaultTheme';

const GlobalStyles = createGlobalStyle`

    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box; 
    }

    body {
        font-family: 'Ubuntu', sans-serif;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    input[type=text], input[type=password], input[type=number], input[type=email]  {
        width: 100%;
        padding: .5rem 1rem;
        border: 1px solid ${props => DefaultTheme.text3};
        border-radius: 5px;
    }

    button {
        cursor: pointer;

        &.primary {
            padding: .5rem 1rem;
            font-size: 1rem;
            font-weight: 500;
            background-color: ${props => DefaultTheme.primary};
            color: ${props => DefaultTheme.surface0};
            border: none;
            border-radius: 5px;
        }

        &.secondary {
            padding: .5rem 1rem;
            font-size: 1rem;
            font-weight: 500;
            background-color: ${props => DefaultTheme.secondary};
            color: ${props => DefaultTheme.surface0};
            border: none;
            border-radius: 5px;
        }
    }

    select {
        padding: .5rem 1rem;
        border: 1px solid ${props => DefaultTheme.text3};
        border-radius: 5px;
    }
`;

export default GlobalStyles;