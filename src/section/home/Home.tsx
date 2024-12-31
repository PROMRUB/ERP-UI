import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import Step1 from "./Step1";
import Step3 from "./Step3";
import Step2 from "./Step2";
import Step4 from "./Step4";
import { DataProps } from "./type";
import StepSuccess from "./StepSuccess";
import { useBusiness } from "@/hooks/store/business";
import { HighlightOff } from "@mui/icons-material";

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

export default function Home() {
  const [tab, setTab] = useState<number>(1);
  const [data, setData] = useState<DataProps>({ ...init });
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const orgId = searchParams.get('orgId') || '';
  const transactionId = searchParams.get('transactionId') || '';
  const [error, setError] = useState<boolean>(false);

  const business = useBusiness();

  const onChangeTab = (_tab: number) => {
    setTab(_tab);
    setIsUpdate(false);
  }

  const onSubmitData = (_data: DataProps) => {
    setData({ ..._data });
    setTab(4);
  }

  const onBackEdit = () => {
    setIsUpdate(true);
    setTab(3);
  }

  const onFinish = async () => {
    try {
      if (data.isCreate) {
        const res:any = await business.saveBusinessInfomation({
          TaxId: data.taxId,
          Name: data.name,
          Address: data.address,
          Tel: data.tel,
          Email: data.email,
          PostCode: data.postCode,
          IsMemo: data.isMemo,
          TransactionId: transactionId,
        })
        setTab(5);
        setData({ ...init });
        // console.log("create", res)
        // if (res?.status?.message === "Success" || res?.customerTaxId) {
        //   setTab(5);
        //   setData({ ...init });
        // } else {
        //   setError(true);
        // }
      } else {
        const res:any = await business.updateBusinessInfomation(data?.customerTaxId || '', {
          TaxId: data.taxId,
          Name: data.name,
          Address: data.address,
          Tel: data.tel,
          Email: data.email,
          PostCode: data.postCode,
          IsMemo: data.isMemo,
          TransactionId: transactionId,
        })
        setTab(5);
        setData({ ...init });
        // console.log("update", res)
        // if (res?.status?.message === "Success" || res?.customerTaxId) {
        //   setTab(5);
        //   setData({ ...init });
        // } else {
        //   setError(true);
        // }
      }
    } catch (err) {
      setError(true);
    }
  }

  return <Box sx={{ display: 'flex', justifyContent: 'center' }}>

    <Dialog open={error} fullWidth maxWidth="xs">
      <DialogContent sx={{ py: 3, px: 1, textAlign: 'center' }}>
        <HighlightOff sx={{ color: 'red', width: '40px', height: '40px' }} />
        <Typography sx={{ mt: 1 }}>เกิดข้อผิดพลาด ไม่สามารถทำรายการได้</Typography>
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" sx={{ minWidth: 100 }} onClick={() => setError(false)}>
            ปิด
          </Button>
        </Box>
      </DialogContent>
    </Dialog>

    <Box sx={{ 
      background: 'white',
      maxWidth: 500,
      width: '100%',
      minHeight: '100vh',
      height: '100%',
      py: 5,
      px: { xs: 3, sm: 5 },
      position: 'relative',
      display: 'flex',
      alignItems: { xs: 'flex-start', sm: 'center', md: 'flex-start'}
    }}>
      {tab === 1 && (
        <Step1 setTab={onChangeTab} />
      )}
      
      {tab === 2 && (
        <Step2 setTab={onChangeTab} orgId={orgId} transactionId={transactionId} />
      )}

      {tab === 3 && (
        <Step3
          setTab={onChangeTab}
          oldData={data}
          onSubmitData={onSubmitData}
          isUpdate={isUpdate}
        />
      )}

      {tab === 4 && (
        <Step4
          data={data}
          onBackEdit={onBackEdit}
          onFinish={onFinish}
        />
      )}

      {tab === 5 && (
        <StepSuccess
          setTab={onChangeTab}
        />
      )}
    </Box>
  </Box>
}