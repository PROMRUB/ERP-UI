import { defineStore } from 'pinia'
import axios from 'axios'

export const useConditionStore = defineStore('conditionStore', () => {
  let hvData = false
  let conditionList = []
  let selectedCondition = ''
  let baseUrl = import.meta.env.VITE_API_URL
  
  if(window.location.hostname === "sales-dev.prom.co.th"){
    baseUrl = 'https://sales-api-dev.prom.co.th'
  }else if (window.location.hostname === "sales.prom.co.th"){
    baseUrl = 'https://sales-api.prom.co.th'
  } 
  
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

  async function fetchConditionList(orgId, businessId) {
    return axiosExport
      .get(`${baseUrl}/v1/api/Condition/org/${orgId}/action/GetConditonList/${businessId}`)
      .then((response) => {
        if (response.data.status.code == 1000) {
          this.conditionList = response.data.data
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
    conditionList,
    selectedCondition,
    fetchConditionList,
  }
})
