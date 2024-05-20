import { defineStore } from 'pinia'
import axios from 'axios'

export const useProfileStore = defineStore('profileStore', () => {
  let token = ''
  let name = 'Administrator'
  let role = 'Admin'
  let isSignIn = true

  let address = {
    building: 'Test',
    floorLv: 'Test',
    no: '00',
    alley: '00'
  }

  let baseUrl = 'https://localhost:44345'

  async function signIn(payload) {
    return axios
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

  function fetchProfile() {
    return axios
      .get(baseUrl + `/v1/api/Authorization/org/default/action/SignIn`)
      .then((response) => {
        if (response.status.code == 1000) {
        } else {
          throw new Error(`${response.data.status.message}`)
        }
      })
      .catch((error) => {
        console.log('Promise Rejected: ' + error)
        throw new Error('some error')
      })
  }

  return { token, name, role, isSignIn, address, signIn, fetchProfile }
})
