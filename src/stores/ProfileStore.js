import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profileStore', () => {
  let token = ''
  let name = 'Administrator'
  let role = 'Admin'
  let isSignIn = true

  return { token, name, role, isSignIn }
})
