/** @jsxRuntime automatic */
/** @jsxImportSource theme-ui */

import { Box, ThemeProvider } from 'theme-ui';
import React from 'react';
import Header from 'components/Header';
import { colors } from 'shared/consts';
import MainWeatherProvider from 'contexts/MainWeatherProvider';
import { ToastContainer } from 'react-toastify';

import { toTheme } from '@theme-ui/typography';
import grandViewTheme from 'typography-theme-grand-view';

const theme = toTheme(grandViewTheme);

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={{ ...theme, colors }}>
      <MainWeatherProvider>
        <Box>
          <Header />
          <main>
            {children}
          </main>
        </Box>
        <ToastContainer />
      </MainWeatherProvider>
    </ThemeProvider>
  );
}

export default MainLayout;
