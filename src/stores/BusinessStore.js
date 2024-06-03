import { defineStore } from 'pinia'
import axios from 'axios'

export const useBusinessStore = defineStore('businessStore', () => {
  let business = ''

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

  async function fetchBusiness(org, id) {
    return axiosExport
      .get(`${baseUrl}/v1/api/Organization/org/${org}/action/GetBusiness/${id}`)
      .then((response) => {
        if (response.data.status.code == 1000) {
          this.business = response.data.data
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
  return { business, fetchBusiness }
})
