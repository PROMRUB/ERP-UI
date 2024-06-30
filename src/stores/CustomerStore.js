import { defineStore } from 'pinia'
import axios from 'axios'

export const useCustomerStore = defineStore('customerStore', () => {
  let mode = ''
  let hvData = null
  let customerList = []
  let cusConList = []
  let customerProfile = {}

  let selectedCustomer = {}

  // let baseUrl = 'https://localhost:44345'
  let baseUrl = 'https://sales-api-dev.prom.co.th'

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

  async function fetchCustomer(orgId, businessId) {
    return axiosExport
      .get(`${baseUrl}/v1/api/Customer/org/${orgId}/action/GetCustomerList/${businessId}`)
      .then((response) => {
        if (response.data.status.code == 1000) {
          this.customerList = response.data.data
          return response.data.data
        } else {
          throw new Error(`${response.data.status.message}`)
        }
      })
      .catch((error) => {
        console.log('Promise Rejected: ' + error)
        throw new Error('some error')
      })
  }

  async function fetchCustomerbyId(orgId, businessId, customerId) {
    return axiosExport
      .get(
        `${baseUrl}/v1/api/Customer/org/${orgId}/action/GetCustomerInformation/${businessId}/${customerId}`
      )
      .then((response) => {
        if (response.data.status.code == 1000) {
          this.customerProfile = response.data.data
          return response.data.data
        } else {
          throw new Error(`${response.data.status.message}`)
        }
      })
      .catch((error) => {
        console.log('Promise Rejected: ' + error)
        throw new Error('some error')
      })
  }

  async function createCustomer(orgId, payload) {
    return axiosExport
      .post(`${baseUrl}/v1/api/Customer/org/${orgId}/action/CreateCustomer`, payload)
      .then((response) => {
        if (response.data.status.code == 1000) {
          this.customerList = response.data.data
          return response.data.data
        } else {
          throw new Error(`${response.data.status.message}`)
        }
      })
      .catch((error) => {
        console.log('Promise Rejected: ' + error)
        throw new Error('some error')
      })
  }

  async function updateCustomer(orgId, businessId, customerId, payload) {
    return axiosExport
      .post(
        `${baseUrl}/v1/api/Customer/org/${orgId}/action/UpdateCustomer/${businessId}/${customerId}`,
        payload
      )
      .then((response) => {
        if (response.data.status.code == 1000) {
          this.customerList = response.data.data
          return response.data.data
        } else {
          throw new Error(`${response.data.status.message}`)
        }
      })
      .catch((error) => {
        console.log('Promise Rejected: ' + error)
        throw new Error('some error')
      })
  }

  async function deleteCustomer(orgId, payload) {
    return axiosExport
      .post(`${baseUrl}/v1/api/Customer/org/${orgId}/action/DeleteCustomer`, payload)
      .then((response) => {
        if (response.data.status.code == 1000) {
          return response.data.data
        } else {
          throw new Error(`${response.data.status.message}`)
        }
      })
      .catch((error) => {
        console.log('Promise Rejected: ' + error)
        throw new Error('some error')
      })
  }

  return {
    mode,
    hvData,
    customerList,
    cusConList,
    customerProfile,
    selectedCustomer,
    fetchCustomer,
    fetchCustomerbyId,
    createCustomer,
    updateCustomer,
    deleteCustomer
  }
})
