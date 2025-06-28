'use client';

import React, { FC, Suspense } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CircularProgress, CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FFB300',
      dark: '#FFC107',
    },
    background: {
      default: '#fafafa',
    },
  },
});

type Props = {
  children: React.ReactNode;
};

const App: FC<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Suspense fallback={<CircularProgress />}>{children}</Suspense>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
