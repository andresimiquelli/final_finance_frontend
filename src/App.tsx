import React from 'react';
import { ThemeProvider } from 'styled-components';

import Home from './pages/Home';

import DefaultTheme from './themes/DefaultTheme';
import GlobalStyles from './GlobalStyles';


const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={DefaultTheme}>
        <GlobalStyles />
        <Home />
      </ThemeProvider>
    </>
  );
}

export default App;
