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
        <ProductTable @pageControl="pageControl" />
      </div>
      <div v-if="projectInformationActive">
        <div class="row">
          <button
            class="project-btn"
            :class="{ active: productActive }"
            @click="pageControl(`project`)"
          >
            <span><i class="fa fa-file-text-o fa-lg"></i>โครงการ</span>
          </button>
        </div>
        <div class="row" v-if="productActive">
          <ProductInformation @pageControl="pageControl" @saveproduct="saveproduct" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ProductInformation from '@/components/Product/ProductInformation.vue'

import { useProfileStore } from '@/stores/ProfileStore'
import { useProductStore } from '@/stores/ProductStore'

import ProductTable from '@/components/Product/ProductTable.vue'

export default {
  components: {
    ProductTable,
    ProductInformation
  },
  data() {
    return {
      productListActive: true,
      productInformationActive: false,
      productActive: false,
      refresh: true,
      profileStore: useProfileStore(),
      productStore: useProductStore()
    }
  },
  watch: {
    refresh() {},
    productActive(newValue, oldValue) {}
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
      if (this.refresh) {
        sessionStorage.setItem('page', 'productList')
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
        if (this.profileStore.businessList.length == 0) {
          const businessData = await this.profileStore.fetchBusiness()
        }
        const products = await this.productStore.fetchProductList(
          this.profileStore.profile.orgCustomId,
          this.profileStore.businesskey
        )
        if (sessionStorage.getItem('page') == 'productList') {
          if (products.length > 0) {
            this.productStore.hvData = true
          } else {
            this.productStore.hvData = false
          }
        }
        this.$emit('loaded')
      }
    },
    async pageControl(pageName) {
      sessionStorage.setItem('page', pageName)
      this.$emit('loading')
      if (pageName == 'productList') {
        this.productListActive = true
        this.productInformationActive = false
        this.productActive = false
      } else if (pageName == 'projectEntry') {
        sessionStorage.setItem('rendered', 'false')
        this.productListActive = false
        this.productInformationActive = true
        this.productActive = true
        sessionStorage.setItem('mode', 'Entry')
        sessionStorage.setItem('changeBusiness', 'false')
      } else if (pageName == 'productInquiry') {
        const catData = await this.productStore.fetchCatList(
          this.profileStore.profile.orgCustomId,
          this.profileStore.businesskey
        )
        this.productListActive = false
        this.productInformationActive = true
        this.productActive = true
        let selectedProduct = this.productStore.selectedProduct
        this.productStore.selectedProduct = this.productStore.productList.find(
          (item) => item.productCustomId === selectedProduct
        )?.productId
        if (this.productStore.selectedProduct) {
          this.productStore.fetchProductbyId(
            this.profileStore.profile.orgCustomId,
            this.profileStore.businesskey,
            this.productStore.selectedProduct
          )
        }
        sessionStorage.setItem('changeBusiness', 'false')
        sessionStorage.setItem('mode', 'Inquiry')
        this.showContact = true
      } else if (pageName == 'product') {
        this.productListActive = false
        this.productInformationActive = true
        this.productActive = true
        sessionStorage.setItem('changeBusiness', 'false')
      }
      this.$emit('loaded')
    }
  }
}
</script>

<style>
.product-btn {
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
