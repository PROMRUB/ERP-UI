import { defineStore } from 'pinia'
import axios from 'axios'

export const useSystemConfigStore = defineStore('systemConfigStore', () => {
  let provinceList = []
  let distrcitList = []
  let subDistrictList = []

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

  async function fetchProvince(org) {
    return axiosExport
      .get(`${baseUrl}/v1/api/SystemConfig/org/${org}/action/GetProvinceList`)
      .then((response) => {
        if (response.data.status.code == 1000) {
          this.provinceList = response.data.data
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

  async function fetchDistrict(org) {
    return axiosExport
      .get(`${baseUrl}/v1/api/SystemConfig/org/${org}/action/GetDistrictList`)
      .then((response) => {
        if (response.data.status.code == 1000) {
          this.distrcitList = response.data.data
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

  async function fetchSubDistrict(org) {
    return axiosExport
      .get(`${baseUrl}/v1/api/SystemConfig/org/${org}/action/GetSubDistrictList`)
      .then((response) => {
        if (response.data.status.code == 1000) {
          this.subDistrictList = response.data.data
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
    provinceList,
    distrcitList,
    subDistrictList,
    fetchProvince,
    fetchDistrict,
    fetchSubDistrict
  }
})
