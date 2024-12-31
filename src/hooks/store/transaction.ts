import axios from "axios";
import API from "@/utils/api";

export const useTransaction = () => {
  const getReceipt = async (orgId: string, transactionId: string) => {
    try {
      const url = `${API.URL_RECEIPT}/org/${orgId}/action/GetReceiptImage/${transactionId}`;
      const res = await axios.get(url);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const getFullReceipt = async (orgId: string, transactionId: string) => {
    try {
      const url = `${API.URL_RECEIPT}/org/${orgId}/action/GetReceipt/${transactionId}`;
      const res = await axios.get(url);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  return {
    getReceipt,
    getFullReceipt,
  };
};
