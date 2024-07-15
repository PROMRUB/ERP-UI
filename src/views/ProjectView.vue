<script setup></script>

<template>
  <main>
    <div v-if="!projectStore.hvData">
      <img class="no-data" src="@/assets/no-data.png" alt="No Data" /><br />
      <div class="no-data-label">
        <span
          >ขณะนี้ยังไม่มีข้อมูลใดๆของคุณอยู่ในระบบ
          <a @click="pageControl(`projectEntry`)">คลิกที่นี่</a> เพื่อเริ่มต้นสร้างข้อมูล</span
        >
      </div>
    </div>
    <div v-else>
      <div v-if="projectListActive">
        <ProjectTable @pageControl="pageControl" />
      </div>
      <div v-if="projectInformationActive">
        <div class="row">
          <button
            class="project-btn"
            :class="{ active: projectActive }"
            @click="pageControl(`project`)"
          >
            <span><i class="fa fa-file-text-o fa-lg"></i>โครงการ</span>
          </button>
        </div>
        <div class="row" v-if="projectActive">
          <ProjectInformation @pageControl="pageControl" @saveProject="saveProject" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ProjectInformation from '@/components/Project/ProjectInformation.vue'

import { useProfileStore } from '@/stores/ProfileStore'
import { useProjectStore } from '@/stores/ProjectStore'

import ProjectTable from '@/components/Project/ProjectTable.vue'

export default {
  components: {
    ProjectTable,
    ProjectInformation
  },
  data() {
    return {
      projectListActive: true,
      projectInformationActive: false,
      projectActive: false,
      refresh: false,
      profileStore: useProfileStore(),
      projectStore: useProjectStore()
    }
  },
  watch: {
    refresh() {},
    projectActive(newValue, oldValue) {}
  },
  mounted() {
    this.updateComponent()
  },
  updated() {
    this.updateComponent()
  },
  methods: {
    async updateComponent() {
      this.$emit('loading')
      if (!this.refresh) {
        sessionStorage.setItem('page', 'projectList')
        this.refresh = true
      }
      sessionStorage.setItem('changeBusiness', 'true')
      let token = sessionStorage.getItem('token')
      if (token == '' || token == undefined || token == null) {
        this.profileStore.isSignIn = false
        this.$router.push('/signin')
      } else {
        this.profileStore.isSignIn = true
        const profileData = await this.profileStore.fetchProfile()
        if (
          this.profileStore.businessKey == undefined ||
          this.profileStore.businessKey == '' ||
          this.profileStore.businessKey == null
        ) {
          const businessData = await this.profileStore.fetchBusiness()
        }
        if (this.profileStore.businessList.length == 0) {
          const businessData = await this.profileStore.fetchBusiness()
        }
        const projects = await this.projectStore.fetchProjectList(
          this.profileStore.profile.orgCustomId,
          this.profileStore.businessKey
        )
        if (sessionStorage.getItem('page') == 'projectList') {
          if (projects.length > 0) {
            this.projectStore.hvData = true
          } else {
            this.projectStore.hvData = false
          }
        }
        this.$emit('loaded')
      }
    },
    async pageControl(pageName) {
      sessionStorage.setItem('page', pageName)
      this.$emit('loading')
      if (pageName == 'projectList') {
        this.projectListActive = true
        this.projectInformationActive = false
        this.projectActive = false
      } else if (pageName == 'projectEntry') {
        sessionStorage.setItem('rendered', 'false')
        this.projectListActive = false
        this.projectInformationActive = true
        this.projectActive = true
        this.projectStore.hvData = true
        sessionStorage.setItem('mode', 'Entry')
        sessionStorage.setItem('changeBusiness', 'false')
      } else if (pageName == 'projectInquiry') {
        this.projectListActive = false
        this.projectInformationActive = true
        this.projectActive = true
        let selectedProject = this.projectStore.selectedProject
        this.projectStore.selectedProject = this.projectStore.projectList.find(
          (item) => item.projectCustomId === selectedProject
        )?.projectId
        if (this.projectStore.selectedProject) {
          this.projectStore.fetchProjectbyId(
            this.profileStore.profile.orgCustomId,
            this.profileStore.businessKey,
            this.projectStore.selectedProject
          )
        }
        sessionStorage.setItem('changeBusiness', 'false')
        sessionStorage.setItem('mode', 'Update')
        this.showContact = true
      } else if (pageName == 'project') {
        this.projectListActive = false
        this.projectInformationActive = true
        this.projectActive = true
        sessionStorage.setItem('changeBusiness', 'false')
      }
      this.$emit('loaded')
    },
    saveProject(value) {
      this.projectStore.projectProfile.businessId = this.profileStore.businessKey
      if (value == 'save') {
        this.projectStore.createProject(
          this.profileStore.profile.orgCustomId,
          this.projectStore.projectProfile
        )
      }
      if (value == 'update') {
        this.projectStore.updateProject(
          this.profileStore.profile.orgCustomId,
          this.projectStore.projectProfile.businessId,
          this.projectStore.projectProfile.projectId,
          this.projectStore.projectProfile
        )
      }
      this.pageControl('projectList')
    }
  }
}
</script>

<style>
.project-btn {
  position: absolute;
  width: 200px;
  height: 48px;
  left: 350px;
  top: 15%;
  background: #384577;
  border-radius: 4px;
  color: white;
  padding-top: 2px;
  padding-bottom: 12px;
  cursor: pointer;
  text-align: center;
  border: 1px solid #384577;
}

.active {
  background: #00275e;
  border: 1px solid #00275e;
  color: white;
}
</style>
