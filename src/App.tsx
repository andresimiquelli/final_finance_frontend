import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useAuth } from './contexts/AuthContext';

import AppRoutes from './routes/app.routes';
import AuthRoutes from './routes/auth.routes';

import DefaultTheme from './themes/DefaultTheme';
import GlobalStyles from './GlobalStyles';

const App: React.FC = () => {

  const { token, selectedWallet } = useAuth()

  return (
      <ThemeProvider theme={DefaultTheme}>
        <GlobalStyles />
        {
          token!=undefined? token!="" && selectedWallet!=undefined ? <AppRoutes /> : <AuthRoutes /> : <AuthRoutes />
        }
      </ThemeProvider>
  );
}

export default App;
