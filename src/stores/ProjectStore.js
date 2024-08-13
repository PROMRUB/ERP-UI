import { defineStore } from 'pinia'
import axios from 'axios'

export const useProjectStore = defineStore('projectStore', () => {
  let hvData = false
  let projectList = []
  let selectedProject = ''
  let projectProfile ={}
  
  // let baseUrl = 'https://localhost:44345'
  let baseUrl = 'https://sales-api.prom.co.th'
  
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

  async function fetchProjectList(orgId, businessId) {
    return axiosExport
      .get(`${baseUrl}/v1/api/Project/org/${orgId}/action/GetProjectList/${businessId}`)
      .then((response) => {
        if (response.data.status.code == 1000) {
          this.projectList = response.data.data
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

  async function fetchProjectbyId(orgId, businessId, projectId) {
    return axiosExport
      .get(
        `${baseUrl}/v1/api/Project/org/${orgId}/action/GetProjectInformation/${businessId}/${projectId}`
      )
      .then((response) => {
        if (response.data.status.code == 1000) {
          this.projectProfile = response.data.data
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

  async function createProject(orgId, payload) {
    return axiosExport
      .post(
        `${baseUrl}/v1/api/Project/org/${orgId}/action/CreateProject`,payload
      )
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

  async function updateProject(orgId, businessId, projectId, payload) {
    return axiosExport
      .post(
        `${baseUrl}/v1/api/Project/org/${orgId}/action/UpdateProject/${businessId}/${projectId}`,payload
      )
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

  async function deleteProject(orgId, businessId, projectId, payload) {
    return axiosExport
      .post(
        `${baseUrl}/v1/api/Project/org/${orgId}/action/DeleteProject/${businessId}/${projectId}`,payload
      )
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
    hvData,
    projectList,
    selectedProject,
    projectProfile,
    fetchProjectList,
    fetchProjectbyId,
    createProject,
    updateProject,
    deleteProject
  }
})
