import { defineStore } from 'pinia'
import axios from 'axios'

export const useProfileStore = defineStore('profileStore', () => {
  let token = ''
  let isSignIn = true

  let profile = {
    orgUserId: '',
    orgCustomId: '',
    username: '',
    email: '',
    telNo: ''
  }

  let business = ''
  let businessKey = ''
  let businessId = ''

  let businessList = []

  let address = {
    building: 'Test',
    floorLv: 'Test',
    no: '00',
    alley: '00'
  }
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

  async function signIn(payload) {
    return axiosExport
      .post(baseUrl + `/v1/api/Authorization/org/default/action/SignIn`, payload)
      .then((response) => {
        if (response.data.status.code == 1000) {
          return response.data.data.token
        } else {
          throw new Error(`${response.data.status.message}`)
        }
      })
      .catch((error) => {
        console.log('Promise Rejected: ' + error)
        throw new Error('some error')
      })
  }

  async function fetchProfile() {
    return axiosExport
      .get(`${baseUrl}/v1/api/Authorization/org/default/action/GetUserProfile`)
      .then((response) => {
        if (response.data.status.code == 1000) {
          this.profile = response.data.data
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

  async function fetchRole() {
    return axiosExport
      .get(`${baseUrl}/v1/api/Authorization/org/${this.profile.orgCustomId}/action/GetUserRole/${this.businessKey}`)
      .then((response) => {
        if (response.data.status.code == 1000) {
          this.profile = response.data.data
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

  async function fetchBusiness() {
    return axiosExport
      .get(`${baseUrl}/v1/api/Organization/org/${this.profile.orgCustomId}/action/GetBusiness`)
      .then((response) => {
        if (response.data.status.code == 1000) {
          this.business = response.data.data[0].orgName
          if (this.businessKey == null || this.businessKey == undefined || this.businessKey == '') {
            this.businessKey = response.data.data[0].orgId
            this.businessId = response.data.data[0].orgCustomId
          }
          this.businessList = response.data.data
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
    token,
    business,
    businessKey,
    businessId,
    isSignIn,
    profile,
    businessList,
    signIn,
    fetchProfile,
    fetchRole,
    fetchBusiness
  }
})
