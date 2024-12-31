import { alpha, Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function AppBar(theme: Theme) {
  return {
    MuiAppBar: {
      styleOverrides: {
        root: {
          // backgroundColor: theme.palette.common.black,
          backgroundColor: 'transparent'
        },
      },
    },
  };
}
