<script setup></script>

<template>
  <main>
    <div v-if="!hvData">
      <img class="no-data" src="@/assets/no-data.png" alt="No Data" /><br />
      <div class="no-data-label">
        <span>ขณะนี้ยังไม่มีข้อมูลใดๆของคุณอยู่ในระบบ</span>
      </div>
    </div>
  </main>
</template>

<script>
import { useProfileStore } from '@/stores/ProfileStore'

export default {
  components: {},
  data() {
    return {
      hvData: false,
      profileStore: useProfileStore()
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
      let token = sessionStorage.getItem('token')
      if (token == '' || token == undefined || token == null) {
        this.profileStore.isSignIn = false
        this.$router.push('/signin')
        this.$emit('loaded')
      } else {
        this.profileStore.isSignIn = true
        const profileData = await this.profileStore.fetchProfile()
        const businessData = await this.profileStore.fetchBusiness()
        this.$emit('loaded')
      }
    }
  }
}
</script>
