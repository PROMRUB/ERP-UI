<script setup></script>

<template>
  <main>
    <div v-if="!hvData">
      <img
        class="no-data"
        style="width: 1600px; height: 900px"
        src="@/assets/dashboard.png"
        alt="No Data"
      /><br />
    </div>
  </main>
</template>

<script>
import { useProfileStore } from '@/stores/ProfileStore'
import { useSystemConfigStore } from '@/stores/SystemConfigStore'

export default {
  components: {},
  data() {
    return {
      hvData: false,
      profileStore: useProfileStore(),
      systemConfigStore: useSystemConfigStore()
    }
  },
  mounted() {
    this.updateComponent()
  },
  updated() {
    this.updateComponent()
  },
  methods: {
    async updateComponent() {
      sessionStorage.setItem('changeBusiness', 'true')
      let token = sessionStorage.getItem('token')
      if (token == '' || token == undefined || token == null) {
        this.profileStore.isSignIn = false
        this.$router.push('/signin')
        this.$emit('loaded')
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
        if (
          this.profileStore.businessKey == undefined ||
          this.profileStore.businessKey == '' ||
          this.profileStore.businessKey == null
        ) {
          const roleData = await this.profileStore.fetchRole()
        }
        const provinceData = await this.systemConfigStore.fetchProvince(
          this.profileStore.profile.orgCustomId
        )
        const districtData = await this.systemConfigStore.fetchDistrict(
          this.profileStore.profile.orgCustomId
        )
        const subDistrctData = await this.systemConfigStore.fetchSubDistrict(
          this.profileStore.profile.orgCustomId
        )
        this.$emit('loaded')
      }
    }
  }
}
</script>
