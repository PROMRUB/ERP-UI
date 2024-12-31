import { Box, Button, Typography } from "@mui/material";

type Props = {
  setTab: (tab: number) => void;
}

export default function Step1({ setTab }: Props) {

  const onClickPayment = () => {

  }

  const onClickDiscount = () => {

  }

  const onClickTax = () => {
    setTab(2);
  }

  return <Box sx={{ width: '100%', mb: 9 }}>
    <Box sx={{ mt: { xs: 5, sm: 0 }, display: 'flex', width: '100%', justifyContent: 'center' }}>
      <img alt="shop-logo" src="/images/shop-logo.jpg" style={{ width: '100%', maxWidth: 100, height: 'auto' }} />
    </Box>

    <Box sx={{ mt: 5 }}>
      <Button fullWidth variant="outlined" size="large" onClick={() => onClickPayment()}>
        ชำระค่าจอดรถ
      </Button>
    </Box>

    <Box sx={{ mt: 3 }}>
      <Button fullWidth variant="outlined" size="large" onClick={() => onClickDiscount()}>
        ทำส่วนลดค่าจอดรถ
      </Button>
    </Box>

    <Box sx={{ mt: 3 }}>
      <Button fullWidth variant="outlined" size="large" onClick={() => onClickTax()}>
        ขอใบกำกับภาษีเต็มรูปแบบ
      </Button>
    </Box>
  
    <Box sx={{ mt: 10, px: 5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <img alt="logo" src="/logo.png" style={{ width: '100%', maxWidth: 50, height: 'auto' }} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 1 }}>
        <Typography>{`เพิ่มพลังโดย "พร้อมรับ"`}</Typography>
      </Box>
    </Box>
  </Box>
}