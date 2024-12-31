import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import CustomStep from "@/components/CustomStep";
import { DataProps } from "./type";

type Props = {
  setTab: (tab: number) => void;
}

export default function StepSuccess({ setTab }: Props) {

  return <Box sx={{ width: '100%', mb: 9 }}>
    <Box sx={{ mt: { xs: 5, sm: 0 }, display: 'flex', width: '100%', justifyContent: 'center' }}>
      <img alt="shop-logo" src="/images/shop-logo.jpg" style={{ width: '100%', maxWidth: 100, height: 'auto' }} />
    </Box>

    <Box sx={{ mt: 3, textAlign: 'center', display: { xs: 'flex', sm: 'none' } }}>
      <Typography>ระบบได้รับคำขอออกใบกำกับภาษีเต็มรูปแบบเรียบร้อยแล้ว เอกสารจะถูกจัดส่งไปยัง อีเมล ของท่าน</Typography>
    </Box>

    <Box sx={{ mt: 3, display: { xs: 'none', sm: 'flex' } }}>
      <Box sx={{ textAlign: 'center', width: '100%' }}>
        <Typography>ระบบได้รับคำขอออกใบกำกับภาษีเต็มรูปแบบเรียบร้อยแล้ว</Typography>
        <Typography>เอกสารจะถูกจัดส่งไปยัง อีเมล ของท่าน</Typography>
      </Box>
    </Box>

    <Box sx={{ mt: 3, display: 'flex', width: '100%', justifyContent: 'center' }}>
      <img alt="email" src="/images/email.jpg" style={{ width: '100%', maxWidth: 70, height: 'auto' }} />
    </Box>

    <Box sx={{ mt: 7, textAlign: 'center' }}>
      <Typography>หากท่านไม่มี อีเมล</Typography>
      <Typography>กรุณาตรวจสอบ SMS ตามหมายเลขโทรศัพท์มือถือที่ท่านได้ให้ข้อมูลไว้</Typography>
    </Box>

    <Box sx={{ my: 3, display: 'flex', width: '100%', justifyContent: 'center' }}>
      <img alt="sms" src="/images/sms.jpg" style={{ width: '100%', maxWidth: 100, height: 'auto' }} />
    </Box>

    <Box sx={{ position: 'absolute', bottom: 50, left: 0, width: '100%', px: 5 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button fullWidth variant="outlined" size="large" onClick={() => setTab(1)}>
            กลับสู่หน้าแรก
          </Button>
        </Grid>
      </Grid>
    </Box>
  </Box>
}