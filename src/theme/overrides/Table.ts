import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Table(theme: Theme) {
  return {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          position: 'relative',
          // borderBottom: `1px solid ${theme.palette.action.disabledBackground}`
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: theme.palette.action.selected,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          },
        },
        head: {
          border: '0px'
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          // borderBottom: 'none',
          padding: '5px 14px',
          border: `1px solid ${theme.palette.action.disabledBackground}`
        },
        head: {
          color: 'white',
          fontSize: 14,
          fontWeight: 600,
          backgroundColor: theme.palette.primary.main,
          textAlign: 'center',
          border: '0px',
          padding: 12,
        },
        body: {
          border: 'none',
          padding: 12,
          backgroundColor: 'white',
          color: theme.palette.primary.main,
        },
        stickyHeader: {
          backgroundColor: theme.palette.background.paper,
          backgroundImage: `linear-gradient(to bottom, ${theme.palette.background.neutral} 0%, ${theme.palette.background.neutral} 100%)`,
        },
        paddingCheckbox: {
          paddingLeft: theme.spacing(1),
        },
      },
    },
    MuiTablePagination: {
      defaultProps: {
        backIconButtonProps: {
          size: 'small',
        },
        nextIconButtonProps: {
          size: 'small',
        },
        SelectProps: {
          MenuProps: {
            MenuListProps: {
              sx: {
                '& .MuiMenuItem-root': {
                  ...theme.typography.body2,
                },
              },
            },
          },
        },
      },

      styleOverrides: {
        root: {
          borderTop: `solid 1px ${theme.palette.divider}`,
        },
        toolbar: {
          height: 64,
        },
        actions: {
          marginRight: theme.spacing(1),
        },
        select: {
          '&:focus': {
            borderRadius: theme.shape.borderRadius,
          },
        },
      },
    },
  };
}
