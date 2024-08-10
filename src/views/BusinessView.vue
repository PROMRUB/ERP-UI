<script setup></script>

<template>
  <main>
    <div v-if="!hvData">
      <img class="no-data" src="@/assets/no-data.png" alt="No Data" /><br />
      <div class="no-data-label">
        <span>ขณะนี้ยังไม่มีข้อมูลใดๆของคุณอยู่ในระบบ</span>
      </div>
    </div>
    <div v-else>
      <BusinessInformation />
    </div>
  </main>
</template>

<script>
import { useProfileStore } from '@/stores/ProfileStore'
import { useBusinessStore } from '@/stores/BusinessStore'
import BusinessInformation from '@/components/Business/BusinessInformation.vue'

export default {
  components: { BusinessInformation },
  data() {
    return {
      hvData: false,
      profileStore: useProfileStore(),
      businessStore: useBusinessStore()
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
      this.$emit('loading')
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
        const roleData = await this.profileStore.fetchRole()
        if (this.profileStore.businessList.length == 0) {
          const businessData = await this.profileStore.fetchBusiness()
        }
        let business = await this.businessStore.fetchBusiness(
          this.profileStore.profile.orgCustomId,
          this.profileStore.businessId
        )
        if (
          this.businessStore.business == null ||
          this.businessStore.business == undefined ||
          this.businessStore.business == ''
        ) {
          const provinceData = await this.systemConfigStore.fetchProvince(
            this.profileStore.profile.orgCustomId
          )
          const districtData = await this.systemConfigStore.fetchDistrict(
            this.profileStore.profile.orgCustomId
          )
          const subDistrctData = await this.systemConfigStore.fetchSubDistrict(
            this.profileStore.profile.orgCustomId
          )
          this.hvData = false
        } else {
          this.hvData = true
        }
        this.$emit('loaded')
      }
    }
  }
}
</script>
