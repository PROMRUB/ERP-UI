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
      <ProductTable />
    </div>
  </main>
</template>

<script>
import { useProfileStore } from '@/stores/ProfileStore'
import { useProductStore } from '@/stores/ProductStore'

import ProductTable from '@/components/Product/ProductTable.vue'

export default {
  components: {
    ProductTable
  },
  data() {
    return {
      hvData: true,
      profileStore: useProfileStore(),
      productStore: useProductStore()
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
        if (this.profileStore.businessList.length == 0) {
          const businessData = await this.profileStore.fetchBusiness()
        }
        const customers = await this.productStore.fetchProductList(
          this.profileStore.profile.orgCustomId,
          this.profileStore.businesskey
        )
        if (sessionStorage.getItem('page') == 'productList') {
          if (customers.length > 0) {
            this.customerStore.hvData = true
          } else {
            this.customerStore.hvData = false
          }
        }
        this.$emit('loaded')
      }
    }
  }
}
</script>
