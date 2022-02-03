import { createGlobalStyle } from 'styled-components';

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

    button {
        cursor: pointer;
    }
`;

export default GlobalStyles;