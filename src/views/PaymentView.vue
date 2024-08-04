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
      <PaymentTable />
    </div>
  </main>
</template>

<script>
import { useProfileStore } from '@/stores/ProfileStore'
import { useSystemConfigStore } from '@/stores/SystemConfigStore'
import { useConditionStore } from '@/stores/ConditionStore'

import PaymentTable from '@/components/Payment/PaymentTable.vue'

export default {
  components: {
    PaymentTable
  },
  data() {
    return {
      hvData: true,
      profileStore: useProfileStore(),
      systemConfigStore: useSystemConfigStore(),
      conditionStore: useConditionStore()
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
      this.$emit('loading')
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
        const roleData = await this.profileStore.fetchRole()
        const conditions = await this.conditionStore.fetchConditionList(
          this.profileStore.profile.orgCustomId,
          this.profileStore.businessKey
        )
        this.$emit('loaded')
      }
    }
  }
}
</script>

<style>
@import 'datatables.net-dt';
</style>
