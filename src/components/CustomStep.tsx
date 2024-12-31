import { Check } from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
} from "@mui/material";

type Props = {
  step: number;
  activeStep: number;
}

export default function CustomStep({ step, activeStep }: Props) {

  return <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {Array.apply(null, new Array(step)).map((m, i) => (
      <Box key={i} sx={{ display: 'flex', alignItems: 'center' }}>
        {i !== 0 && (
          <Divider sx={{ width: 50, background: '#00275e' }} />
        )}

        <Box sx={{ 
          background: '#00275e',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 36,
          height: 36,
          borderRadius: '50%',
          color: 'white',
          opacity: i < activeStep ? 1 : 0.5
        }}>
          {i < activeStep - 1 ? (
            <Check />
          ) : (
            <Typography>{i + 1}</Typography>
          )}
       
        </Box>
      </Box>
    ))}
  </Box>
}