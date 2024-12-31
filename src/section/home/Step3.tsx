import { useEffect, useState } from "react";

import { Close, Edit, Search } from "@mui/icons-material";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import CustomStep from "@/components/CustomStep";
import { DataProps } from "./type";
import { useBusiness } from "@/hooks/store/business";

type Props = {
  setTab: (tab: number) => void;
  oldData: DataProps;
  onSubmitData: (data: DataProps) => void;
  isUpdate: boolean;
}

const init = {
  taxId: '',
  name: '',
  address: '',
  postCode: '',
  email: '',
  tel: '',
  isMemo: false,
  isCreate: false,
  id: '',
  customerTaxId: '',
}

const list = [
  {
    taxId: '0105561098798',
    name: 'บริษัท ไซเบอร์แทรคซ์ จำกัด',
    address: 'เลขที่ 1 สาทร กรุงเทพมหานคร',
    postCode: '10120',
    email: 'kkunayothin@gmail.com',
    tel: '0909714717'
  }
]

function validateEmail(email: string) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export default function Step3({ setTab, oldData, onSubmitData, isUpdate }: Props) {
  const [data, setData] = useState<DataProps>({ ...init });
  const [isNotFound, setIsNotFound] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [errorTax, setErrorTax] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isMemo, setIsMemo] = useState<boolean>(false);

  const business = useBusiness();

  useEffect(() => {
    setData({ ...oldData });
    setIsEdit(isUpdate);
  }, [oldData, isUpdate])

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });

    setErrorTax('');
    setError('');
  }

  const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || '';
    if ((/[0-9]/.test(value[value.length - 1]) || !value)) {
      setData({
        ...data,
        [e.target.name]: e.target.value
      });
    }

    setErrorTax('');
    setError('');
  }

  const onClickSearch = async () => {
    const res:any = await business.getBusinessByTaxId(data.taxId);
    console.log(res);
    setIsMemo(false);
    if (res?.data) {
      setData({ ...res.data, isCreate: false, });
    } else {
      setData({
        ...init,
        taxId: data.taxId,
        isCreate: true
      })
      setIsNotFound(true);
      setIsEdit(true);
    }
  }

  const onClickClear = () => {
    setData({ ...init });
    setIsNotFound(false);
    setIsEdit(false);
  }

  const onClickEdit = () => {
    setIsEdit(true);
  }

  const onClickBack = () => {
    setTab(2);
  }

  const onClickNext = () => {
    if (!data?.taxId) {
      setErrorTax('กรุณากรอกเลขประจำตัวผู้เสียภาษี');
    } else if (!data?.name || !data?.address || !data?.postCode) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วน');
    } else if (!data?.email && !data?.tel) {
      setError('กรุณากรอกเบอร์โทรศัพท์ หรือ อีเมล');
    } else {
      if (data?.email && !validateEmail(data?.email)) {
        setError('กรุณากรอกอีเมลให้ถูกต้อง (ex test@gmail.com)')
      } else {
        onSubmitData({
          ...data,
          isMemo
        });
      }
    }
  }

  return <Box sx={{ width: '100%', mb: 9 }}>
    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
      <img alt="shop-logo" src="/images/shop-logo.jpg" style={{ width: '100%', maxWidth: 70, height: 'auto' }} />
    </Box>

    <Box sx={{ mt: 2 }}>
      <CustomStep step={4} activeStep={3} />
    </Box>

    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
      <Typography variant="h6">กรุณากรอกเลขประจำตัวผู้เสียภาษีของท่าน</Typography>
    </Box>

    <Box sx={{ mt: 2 }}>
      <TextField 
        name="taxId"
        value={data?.taxId || ''}
        onChange={onChangeNumber}
        variant="standard"
        placeholder="เลขประจำตัวผู้เสียภาษี"
        fullWidth
        inputProps={{
          maxLength: 13,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Box sx={{ display: 'flex' }}>
                <Close onClick={() => onClickClear()} sx={{ cursor: 'pointer' }} />
                <Search onClick={() => onClickSearch()} sx={{ cursor: 'pointer', ml: 1.5 }} />
              </Box>
            </InputAdornment>
          )
        }}
      />
    </Box>

    {errorTax && (
      <Typography variant="body2" sx={{ color: 'red' }}>{errorTax}</Typography>
    )}

    {isNotFound && (
      <Box sx={{ mt: 2, textAlign: 'center', color: 'red' }}>
        <Typography>ไม่พบข้อมูลของท่านในระบบ</Typography>
        <Typography>กรุณาค้นหาใหม่อีกครั้ง หรือ กรอกข้อมูลด้านล่าง</Typography>
      </Box>
    )}

    <Box sx={{ mt: isNotFound ? 3 : 5, display: 'flex', justifyContent: 'center' }}>
      <Typography variant="subtitle1">รายละเอียดสำหรับออกใบกำกับภาษีของท่าน</Typography>
    </Box>

    {!isEdit && (
      <Box sx={{ width: '100%', my: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1"><strong>ชื่อ:</strong> {data?.name || ''}</Typography>
              <Edit sx={{ width: 22, cursor: 'pointer' }} onClick={() => onClickEdit()} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1"><strong>ที่อยู่:</strong> {data?.address || ''}</Typography>
              <Edit sx={{ width: 22, cursor: 'pointer' }} onClick={() => onClickEdit()} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1"><strong>รหัสไปรษณีย์:</strong> {data?.postCode || ''}</Typography>
              <Edit sx={{ width: 22, cursor: 'pointer' }} onClick={() => onClickEdit()} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1"><strong>อีเมล:</strong> {data?.email || ''}</Typography>
              <Edit sx={{ width: 22, cursor: 'pointer' }} onClick={() => onClickEdit()} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1"><strong>โทรศัพท์มือถือ:</strong> {data?.tel || ''}</Typography>
              <Edit sx={{ width: 22, cursor: 'pointer' }} onClick={() => onClickEdit()} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    )}

    {isEdit && (
      <Box sx={{ width: '100%', my: 3 }}>
        <Grid container spacing={1.5}>
          <Grid item xs={12}>
            <TextField 
              name="name"
              value={data?.name || ''}
              onChange={onChangeInput}
              variant="standard"
              label={<Typography>ชื่อสำหรับออกใบกำกับภาษี <span style={{ color: 'red' }}>*</span></Typography>}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              name="address"
              value={data?.address || ''}
              onChange={onChangeInput}
              variant="standard"
              label={<Typography>ที่อยู่สำหรับออกใบกำกับภาษี <span style={{ color: 'red' }}>*</span></Typography>}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              name="postCode"
              value={data?.postCode || ''}
              onChange={onChangeNumber}
              variant="standard"
              label={<Typography>รหัสไปรษณีย์ <span style={{ color: 'red' }}>*</span></Typography>}
              fullWidth
              inputProps={{
                maxLength: 5,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              name="email"
              value={data?.email || ''}
              onChange={onChangeInput}
              variant="standard"
              label={<Typography>อีเมลสำหรับออกใบกำกับภาษี</Typography>}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              name="tel"
              value={data?.tel || ''}
              onChange={onChangeNumber}
              variant="standard"
              label={<Typography>โทรศัพท์สำหรับออกใบกำกับภาษี</Typography>}
              fullWidth
              inputProps={{
                maxLength: 10,
              }}
            />
          </Grid>
          <Grid item xs={12}>
          <FormGroup>
            <FormControlLabel control={<Checkbox checked={isMemo} onChange={() => setIsMemo(!isMemo)} />} label="บันทึกไว้ในระบบ" />
          </FormGroup>
          </Grid>
        </Grid>
      </Box>
    )}

    {error && (
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Typography variant="body1" sx={{ color: 'red' }}>{error}</Typography>
      </Box>
    )}

    <Box sx={{ position: 'absolute', bottom: 50, left: 0, width: '100%', px: 5 }}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Button fullWidth variant="outlined" size="large" onClick={() => onClickBack()}>
            ย้อนกลับ
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth variant="contained" size="large" onClick={() => onClickNext()}>
            ต่อไป
          </Button>
        </Grid>
      </Grid>
    </Box>
  </Box>
}