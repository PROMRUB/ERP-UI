import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import CustomStep from "@/components/CustomStep";
import { DataProps } from "./type";

type Props = {
  data: DataProps;
  onBackEdit: () => void;
  onFinish: () => void;
}

export default function Step4({ data, onBackEdit, onFinish }: Props) {
  return <Box sx={{ width: '100%', mb: 9 }}>
    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
      <img alt="shop-logo" src="/images/shop-logo.jpg" style={{ width: '100%', maxWidth: 70, height: 'auto' }} />
    </Box>

    <Box sx={{ mt: 2 }}>
      <CustomStep step={4} activeStep={4} />
    </Box>

    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
      <Typography variant="h6">กรุณากรอกเลขประจำตัวผู้เสียภาษีของท่าน</Typography>
    </Box>

    <Box sx={{ mt: 2 }}>
      <TextField 
        name="taxId"
        value={data?.taxId || ''}
        variant="standard"
        placeholder="เลขประจำตัวผู้เสียภาษี"
        fullWidth
      />
    </Box>

    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
      <Typography variant="body1">กรุณาตรวจสอบและยืนยัน</Typography>
    </Box>

    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
      <Typography variant="subtitle1">รายละเอียดสำหรับออกใบกำกับภาษีของท่าน</Typography>
    </Box>

    <Box sx={{ width: '100%', my: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body1"><strong>ชื่อ:</strong> {data?.name || ''}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body1"><strong>ที่อยู่:</strong> {data?.address || ''}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body1"><strong>รหัสไปรษณีย์:</strong> {data?.postCode || ''}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body1"><strong>อีเมล:</strong> {data?.email || ''}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body1"><strong>โทรศัพท์มือถือ:</strong> {data?.tel || ''}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>

    <Box sx={{ position: 'absolute', bottom: 50, left: 0, width: '100%', px: 5 }}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Button fullWidth variant="outlined" size="large" onClick={() => onBackEdit()}>
            แก้ไข
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth variant="contained" size="large" onClick={() => onFinish()}>
            ยืนยัน
          </Button>
        </Grid>
      </Grid>
    </Box>
  </Box>
}