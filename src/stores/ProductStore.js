import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('productStore', () => {
  let hvData = false
  let productList = []
  let selectedProduct = ''
  let productProfile ={}

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

  async function fetchCatList(orgId, businessId) {
    return axiosExport
      .get(`${baseUrl}/v1/api/Product/org/${orgId}/action/GetProductCategoryList/${businessId}`)
      .then((response) => {
        if (response.data.status.code == 1000) {
          this.catList = response.data.data
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

  async function fetchProductbyId(orgId, businessId, productId) {
    return axiosExport
      .get(
        `${baseUrl}/v1/api/Product/org/${orgId}/action/GetProductInformation/${businessId}/${productId}`
      )
      .then((response) => {
        if (response.data.status.code == 1000) {
          this.productProfile = response.data.data
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
    hvData,
    productList,
    selectedProduct,
    productProfile,
    fetchCatList,
    fetchProductList,
    fetchProductbyId
  }
})
