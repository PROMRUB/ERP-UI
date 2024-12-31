import type { AppProps } from 'next/app'
import ThemeProvider from '../theme';
import { SnackbarProvider, MaterialDesignContent } from 'notistack';

import '../assets/css/global.css';

import { styled, Box } from '@mui/material';

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent-success': {
    backgroundColor: '#D8FBDE',
    color: '#0A5554',
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: '#FFE9D5',
    color: '#7A0916',
  },
}));

export default function App({ Component, pageProps }: AppProps) {

  return <ThemeProvider>
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      Components={{
        success: StyledMaterialDesignContent,
        error: StyledMaterialDesignContent,
      }}
    >
      <Box sx={{ background: '#fff', minHeight: '100vh' }}>
        <Component {...pageProps} />
      </Box>
    </SnackbarProvider>
  </ThemeProvider>
}