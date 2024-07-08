import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('productStore', () => {
  let productList = []

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

  async function fetchProductList(orgId, businessId) {
    return axiosExport
      .get(`${baseUrl}/v1/api/Product/org/${orgId}/action/GetProductList/${businessId}`)
      .then((response) => {
        if (response.data.status.code == 1000) {
          this.productList = response.data.data
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
    productList,
    fetchProductList
  }
})
