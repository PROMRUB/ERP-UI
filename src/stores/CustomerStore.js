import { defineStore } from 'pinia'
import axios from 'axios'

export const useCustomerStore = defineStore('customerStore', () => {
  let customerList = [
    {
      index: '1',
      customerCode: 'CBT-00001',
      customerName: 'บริษัท ไซเบอร์แทรกซ์ จำกัด',
      recordStatus: 'ปกติ'
    },
    {
      index: '2',
      customerCode: 'CBT-00002',
      customerName: 'บริษัท ไซเบอร์แทรกซ์ จำกัด',
      recordStatus: 'ปกติ'
    }
  ]

  let customerProfile = {
    businessId: ``,
    cusNameEng: ``,
    cusType: '',
    customerNo: ``,
    taxId: ``,
    brnId: ``,
    cusName: ``,
    displayName: ``,
    website: ``,
    building: ``,
    alley: ``,
    roomNo: ``,
    road: ``,
    floor: ``,
    village: ``,
    no: ``,
    moo: ``,
    province: ``,
    district: ``,
    subDistrict: ``,
    postCode: ``,
  }

  let baseUrl = 'https://localhost:44345'
  // let baseUrl = 'https://sales-api-dev.prom.co.th'

  let axiosExport = axios.create({
    baseUrl
  })

  axiosExport.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })
  axiosExport.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      console.error(error)
      return Promise.reject(error)
    }
  )
  return { customerList }
})
