import axios from "axios";
import API from "@/utils/api";

interface businessInformation {
  Id: string;
  TaxId: string;
  Name: string;
  Address: string;
  Tel: string;
  Email: string;
  PostCode: string;
}

interface businessResource {
  TaxId: string;
  Name: string;
  Address: string;
  Tel: string;
  Email: string;
  PostCode: string;
  IsMemo: boolean;
  TransactionId: string;
  CustomerTaxId?: string;
}

export const useBusiness = () => {
  const getBusinessByTaxId = async (
    taxId: string
  ): Promise<businessInformation> => {
    try {
      const url = `${API.URL_TAX_RECEIPT}/${taxId}`;
      const res = await axios.get(url);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const saveBusinessInfomation = async (
    props: businessResource
  ): Promise<void> => {
    try {
      const url = `${API.URL_TAX_RECEIPT}`;
      const res = await axios.post(url, props);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const updateBusinessInfomation = async (
    id: string,
    props: businessResource
  ): Promise<void> => {
    try {
      const url = `${API.URL_TAX_RECEIPT}/${id}`;
      const res = await axios.post(url, props);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  return {
    getBusinessByTaxId,
    saveBusinessInfomation,
    updateBusinessInfomation,
  };
};
