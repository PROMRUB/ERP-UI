import { Box, Button, Grid, Typography } from "@mui/material";
import CustomStep from "@/components/CustomStep";
import React, { useEffect, useState } from 'react';
import { useTransaction } from "@/hooks/store/transaction";

type Props = {
  setTab: (tab: number) => void;
  orgId: string;
  transactionId: string;
}

export default function Step2({ setTab, orgId, transactionId }: Props) {
  const transaction = useTransaction();
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    async function getData() {
      try {
        const res = await transaction.getReceipt(orgId, transactionId);
        const base64 = `data:image/jpeg;base64,${res}`;
        setImageUrl(base64);
      } catch (err) {
        console.error(err);
      }
    }
    
    if (orgId && transactionId) {
      getData();
    }
  }, [orgId, transactionId])

  const onClickBack = () => {
    setTab(1);
  }

  const onClickNext = () => {
    setTab(3);
  }

  return <Box sx={{ width: '100%', mb: 9 }}>
    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
      <img alt="shop-logo" src="/images/shop-logo.jpg" style={{ width: '100%', maxWidth: 70, height: 'auto' }} />
    </Box>

    <Box sx={{ mt: 2 }}>
      <CustomStep step={4} activeStep={2} />
    </Box>

    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
      <Typography variant="subtitle1">กรุณาตรวจสอบรายละเอียด ใบกำกับภาษีอย่างย่อ</Typography>
    </Box>

    {imageUrl && (
      <Box sx={{ mt: 2 }}>
        <img alt="transaction" src={imageUrl} style={{ width: '100%', height: 'auto', border: '1px solid black' }} />
      </Box>
    )}

    <Box sx={{ position: 'absolute', bottom: 50, left: 0, width: '100%', px: 5 }}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Button fullWidth variant="outlined" size="large" onClick={() => onClickBack()}>
            ไม่ถูกต้อง
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth variant="contained" size="large" onClick={() => onClickNext()}>
            ถูกต้อง
          </Button>
        </Grid>
      </Grid>
    </Box>
  </Box>
}