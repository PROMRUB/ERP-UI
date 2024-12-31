// @mui
import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

type BgBlurProps = {
  blur?: number;
  opacity?: number;
  color?: string;
  imgUrl?: string;
};

export function bgBlur(props?: BgBlurProps) {
  const color = props?.color || '#000000';
  const blur = props?.blur || 6;
  const opacity = props?.opacity || 0.8;
  const imgUrl = props?.imgUrl;

  if (imgUrl) {
    return {
      position: 'relative',
      backgroundImage: `url(${imgUrl})`,
      '&:before': {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9,
        content: '""',
        width: '100%',
        height: '100%',
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        backgroundColor: alpha(color, opacity),
      },
    } as const;
  }

  return {
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    backgroundColor: alpha(color, opacity),
  };
}

// ----------------------------------------------------------------------

type BgGradientProps = {
  direction?: string;
  color?: string;
  startColor?: string;
  endColor?: string;
  imgUrl?: string;
};

export function bgGradient(props?: BgGradientProps) {
  const direction = props?.direction || 'to bottom';
  const startColor = props?.startColor;
  const endColor = props?.endColor;
  const imgUrl = props?.imgUrl;
  const color = props?.color;

  if (imgUrl) {
    return {
      background: `linear-gradient(${direction}, ${startColor || color}, ${
        endColor || color
      }), url(${imgUrl})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
    };
  }

  return {
    background: `linear-gradient(${direction}, ${startColor}, ${endColor})`,
  };
}

// ----------------------------------------------------------------------

export function textGradient(value: string) {
  return {
    background: `-webkit-linear-gradient(${value})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };
}

// ----------------------------------------------------------------------

export function filterStyles(value: string) {
  return {
    filter: value,
    WebkitFilter: value,
    MozFilter: value,
  };
}

// ----------------------------------------------------------------------

export const hideScrollbarY = {
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
} as const;

// ----------------------------------------------------------------------

export const hideScrollbarX = {
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  overflowX: 'scroll',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
} as const;

// ----------------------------------------------------------------------

export function textFieldSx(value?: string) {
  if (value === 'select-primary') {
    return {
      backgroundColor: 'white',
      width: '100%',
      borderRadius: 10,
      '&:hover fieldset': {
        border: '1px solid #00275e !important',
      },
      '&:focus-within fieldset, &:focus-visible fieldset': {
        border: '1px solid #00275e !important',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: '1px solid #00275e',
      },
      '& .MuiSelect-icon': {
        color: '#00275e',
        fontSize: '24px',
      }
    };
  }

  if (value === 'select') {
    return {
      backgroundColor: 'white',
      width: '100%',
      borderRadius: 10,
      '&:hover fieldset': {
        border: '1px solid #000000 !important',
      },
      '&:focus-within fieldset, &:focus-visible fieldset': {
        border: '1px solid #000000 !important',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: '1px solid #000000',
      },
      '& .MuiSelect-icon': {
        color: '#000000',
        fontSize: '24px',
      }
    };
  }

  if (value === 'select-error') {
    return {
      backgroundColor: 'white',
      width: '100%',
      borderRadius: 10,
      '&:hover fieldset': {
        border: '1px solid red !important',
      },
      '&:focus-within fieldset, &:focus-visible fieldset': {
        border: '1px solid red !important',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: '1px solid red',
      },
      '& .MuiSelect-icon': {
        color: 'red',
        fontSize: '24px',
      }
    };
  }

  if (value === 'select-error-black') {
    return {
      backgroundColor: 'black',
      width: '100%',
      borderRadius: 10,
      '&:hover fieldset': {
        border: '1px solid red !important',
      },
      '&:focus-within fieldset, &:focus-visible fieldset': {
        border: '1px solid red !important',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: '1px solid red',
      },
      '& .MuiSelect-icon': {
        color: 'red',
        fontSize: '24px',
      }
    };
  }

  if (value === 'select-black') {
    return {
      backgroundColor: 'black',
      width: '100%',
      borderRadius: 10,
      '&:hover fieldset': {
        border: '1px solid #00275e !important',
      },
      '&:focus-within fieldset, &:focus-visible fieldset': {
        border: '1px solid #00275e !important',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: '1px solid #00275e',
      },
      '& .MuiSelect-icon': {
        color: '#00275e',
        fontSize: '24px',
      }
    };
  }

  if (value === 'select-white') {
    return {
      backgroundColor: 'white',
      width: '100%',
      borderRadius: 10,
      '&:hover fieldset': {
        border: '1px solid #00275e !important',
      },
      '&:focus-within fieldset, &:focus-visible fieldset': {
        border: '1px solid white !important',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: '1px solid white',
      },
      '& .MuiSelect-icon': {
        color: '#00275e',
        fontSize: '24px',
      }
    };
  }

  if (value === 'black') {
    return {
      backgroundColor: 'black',
      width: '100%',
    };
  }

  return {
    backgroundColor: 'white',
    width: '100%',
  };
}

export function inputSx(value?: string) {
  if (value === 'primary') {
    return {
      textAlign: 'center',
      color: '#00275e',
      '&::placeholder': {
        color: '#00275e'
      },
    }
  }

  if (value === 'white') {
    return {
      textAlign: 'center',
      color: '#FFFFFF',
      '&::placeholder': {
        color: '#FFFFFF'
      },
    }
  }

  if (value === 'primary2') {
    return {
      textAlign: 'center',
      color: '#00275e',
      '&::placeholder': {
        color: '#000000'
      },
    }
  }

  return {
    textAlign: 'center',
    color: '#000000',
    '&::placeholder': {
      color: '#000000'
    },
  };
}

export function inputPropsSx(value?: string) {
  if (value === 'primary') {
    return {
      borderRadius: 10,
      '&:hover fieldset': {
        border: '1px solid #00275e !important',
      },
      '&:focus-within fieldset, &:focus-visible fieldset': {
        border: '1px solid #00275e !important',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: '1px solid #00275e',
      },
    }
  }

  if (value === 'error') {
    return {
      borderRadius: 10,
      '&:hover fieldset': {
        border: '1px solid red !important',
      },
      '&:focus-within fieldset, &:focus-visible fieldset': {
        border: '1px solid red !important',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: '1px solid red',
      },
    }
  }

  if (value === 'white') {
    return {
      borderRadius: 10,
      '&:hover fieldset': {
        border: '1px solid white !important',
      },
      '&:focus-within fieldset, &:focus-visible fieldset': {
        border: '1px solid white !important',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: '1px solid white',
      },
    }
  }

  return {
    borderRadius: 10,
    '&:hover fieldset': {
      border: '1px solid #000000 !important',
    },
    '&:focus-within fieldset, &:focus-visible fieldset': {
      border: '1px solid #000000 !important',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #000000',
    },
  };
}