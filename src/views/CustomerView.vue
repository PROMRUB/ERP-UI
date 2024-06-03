<script setup></script>

<template>
  <main>
    <div v-if="!customerStore.hvData">
      <img class="no-data" src="@/assets/no-data.png" alt="No Data" /><br />
      <div class="no-data-label">
        <span
          >ขณะนี้ยังไม่มีข้อมูลใดๆของคุณอยู่ในระบบ
          <a @click="pageControl(`customerEntry`)">คลิกที่นี่</a> เพื่อเริ่มต้นสร้างข้อมูล</span
        >
      </div>
    </div>
    <div v-else>
      <div v-if="customerListActive">
        <CustomerTable @pageControl="pageControl" />
      </div>
      <div v-if="customerInformationActive">
        <div class="row">
          <button
            class="general-btn"
            :class="{ active: generalActive }"
            @click="pageControl(`general`)"
          >
            <span><i class="fa fa-file-text-o fa-lg"></i>ข้อมูลทั่วไป</span>
          </button>
          <button
            class="address-btn"
            :class="{ active: addressActive }"
            @click="pageControl(`address`)"
          >
            <span><i class="fa fa-map-o fa-lg"></i>ที่อยู่</span>
          </button>
        </div>
        <div class="row" v-if="generalActive">
          <GeneralInformation @pageControl="pageControl" @saveCustomer="saveCustomer" />
        </div>
        <div class="row" v-if="addressActive">
          <AddressInformation @pageControl="pageControl" @saveCustomer="saveCustomer" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import CustomerTable from '@/components/Customer/CustomerTable.vue'
import GeneralInformation from '@/components/Customer/GeneralInformation.vue'
import AddressInformation from '@/components/Customer/AddressInformation.vue'

import { useProfileStore } from '@/stores/ProfileStore'
import { useSystemConfigStore } from '@/stores/SystemConfigStore'
import { useCustomerStore } from '@/stores/CustomerStore'

export default {
  components: {
    CustomerTable,
    GeneralInformation,
    AddressInformation
  },
  data() {
    return {
      customerListActive: true,
      customerInformationActive: false,
      generalActive: false,
      addressActive: false,

      profileStore: useProfileStore(),
      systemConfigStore: useSystemConfigStore(),
      customerStore: useCustomerStore()
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
      sessionStorage.removeItem(`selectedItems`)
      if (token == '' || token == undefined || token == null) {
        this.profileStore.isSignIn = false
        this.$router.push('/signin')
        this.$emit('loaded')
      } else {
        this.profileStore.isSignIn = true
        const profileData = await this.profileStore.fetchProfile()
        if (this.profileStore.businessList.length == 0) {
          const businessData = await this.profileStore.fetchBusiness()
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
        const customers = await this.customerStore.fetchCustomer(
          this.profileStore.profile.orgCustomId,
          this.profileStore.businesskey
        )
        if (customers.length > 0) {
          this.customerStore.hvData = true
        } else {
          this.customerStore.hvData = false
        }
        this.$emit('loaded')
      }
    },
    pageControl(pageName) {
      this.$emit('loading')
      if (pageName === 'customerList') {
        this.customerListActive = true
        this.customerInformationActive = false
        this.generalActive = false
        this.addressActive = false
      } else if (pageName === 'customerEntry') {
        this.customerListActive = false
        this.customerInformationActive = true
        this.generalActive = true
        this.addressActive = false
        sessionStorage.setItem('mode', 'Entry')
      } else if (pageName === 'customerInquiry') {
        this.customerListActive = false
        this.customerInformationActive = true
        this.generalActive = true
        this.addressActive = false
        let selectedCustomer = this.customerStore.selectedCustomer
        this.customerStore.selectedCustomer = this.customerStore.customerList.find(
          (item) => item.cusCustomId === selectedCustomer
        )?.cusId
        if (this.customerStore.selectedCustomer) {
          this.customerStore.fetchCustomerbyId(
            this.profileStore.profile.orgCustomId,
            this.profileStore.businesskey,
            this.customerStore.selectedCustomer
          )
        }
        sessionStorage.setItem('mode', 'Inquiry')
      } else if (pageName === 'general') {
        this.customerListActive = false
        this.customerInformationActive = true
        this.generalActive = true
        this.addressActive = false
      } else if (pageName === 'address') {
        this.customerListActive = false
        this.customerInformationActive = true
        this.generalActive = false
        this.addressActive = true
      }
      this.$emit('loaded')
    },
    saveCustomer() {
      if (
        this.customerStore.customerProfile.cusNameEng == null ||
        this.customerStore.customerProfile.cusNameEng == '' ||
        this.customerStore.customerProfile.cusNameEng == undefined
      ) {
        alert('กรุณากรอกชื่อบริษัทภาษาอังกฤษ')
      } else {
        this.customerStore.customerProfile.businessId = this.profileStore.businesskey
        this.customerStore.createCustomer(
          this.profileStore.profile.orgCustomId,
          this.customerStore.customerProfile
        )
        this.pageControl('customerList')
      }
    }
  }
}
</script>

<style>
.general-btn {
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

.address-btn {
  position: absolute;
  width: 200px;
  height: 48px;
  left: 550px;
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
</style>
