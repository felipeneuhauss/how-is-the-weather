/** @jsxRuntime automatic */
/** @jsxImportSource theme-ui */

import { Box, ThemeProvider } from 'theme-ui';
import { toTheme } from '@theme-ui/typography';
import grandViewTheme from 'typography-theme-grand-view';
import React from 'react';
import Footer from 'components/Footer';
import { colors } from 'shared/consts';

const theme = toTheme(grandViewTheme);

function MainLayout({ children } : {children: React.ReactNode}) {
  return (
    <ThemeProvider theme={{ ...theme, colors }}>
      <Box>
        <main>
          {children}
        </main>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default MainLayout;
