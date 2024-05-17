import { defineStore } from 'pinia'

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

  return { token, name, role, isSignIn, address }
})
