import { alpha, Theme } from '@mui/material/styles';
import { IconButtonProps } from '@mui/material';

// ----------------------------------------------------------------------

const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;

// NEW VARIANT
declare module '@mui/material/IconButton' {
  interface ButtonPropsVariantOverrides {
    soft: true;
  }
}

export default function IconButton(theme: Theme) {
  const isLight = theme.palette.mode === 'light';

  const rootStyle = (ownerState: IconButtonProps) => {
    const colorStyle = COLORS.map((color) => ({
      ...(ownerState.color === color && {
        backgroundColor: theme.palette[color].main,
        color: 'white',
        '&:hover': {
            backgroundColor: theme.palette[color][isLight ? 'dark' : 'light'],
        },
      }),
    }));

    const disabledState = {
      '&.Mui-disabled': {
        backgroundColor: theme.palette.action.disabledBackground,
      },
    };

    return [...colorStyle, disabledState];
  };

  return {
    MuiIconButton: {
      defaultProps: {
        // disableElevation: true,
      },

      styleOverrides: {
        root: ({ ownerState }: { ownerState: IconButtonProps }) => rootStyle(ownerState),
      },
    },
  };
}
