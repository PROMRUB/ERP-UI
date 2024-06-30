<template>
  <ContactTable />
</template>

<script>
import ContactTable from '@/components/Customer/ContactTable.vue'

import { useProfileStore } from '@/stores/ProfileStore'
import { useSystemConfigStore } from '@/stores/SystemConfigStore'
import { useCustomerStore } from '@/stores/CustomerStore'

export default {
  components: {
    ContactTable
  },
  data() {
    return {
      customerListActive: true,
      customerInformationActive: false,
      generalActive: false,
      addressActive: false,
      contactActive: false,

      profileStore: useProfileStore(),
      systemConfigStore: useSystemConfigStore(),
      customerStore: useCustomerStore()
    }
  },
  watch: {
    generalActive(newValue, oldValue) {},
    addressActive(newValue, oldValue) {},
    contactActive(newValue, oldValue) {}
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
        if (
          sessionStorage.getItem('page') == undefined ||
          sessionStorage.getItem('page') == null ||
          sessionStorage.getItem('page') == ''
        )
          sessionStorage.setItem('page', 'customerList')
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
        if (sessionStorage.getItem('page') == 'customerList') {
          if (customers.length > 0) {
            this.customerStore.hvData = true
          } else {
            this.customerStore.hvData = false
          }
        }
        this.$emit('loaded')
      }
    },
    pageControl(pageName) {
      sessionStorage.setItem('page', pageName)
      this.$emit('loading')
      if (pageName == 'customerList') {
        this.customerListActive = true
        this.customerInformationActive = false
        this.generalActive = false
        this.addressActive = false
        this.contactActive = false
      } else if (pageName == 'customerEntry') {
        this.customerListActive = false
        this.customerInformationActive = true
        this.generalActive = true
        this.addressActive = false
        this.contactActive = false
        this.customerStore.hvData = true
        sessionStorage.setItem('mode', 'Entry')
        sessionStorage.setItem('changeBusiness', 'false')
      } else if (pageName == 'customerInquiry') {
        this.customerListActive = false
        this.customerInformationActive = true
        this.generalActive = true
        this.addressActive = false
        this.contactActive = false
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
        sessionStorage.setItem('changeBusiness', 'false')
        sessionStorage.setItem('mode', 'Inquiry')
      } else if (pageName == 'general') {
        this.customerListActive = false
        this.customerInformationActive = true
        this.generalActive = true
        this.addressActive = false
        this.contactActive = false
        sessionStorage.setItem('changeBusiness', 'false')
      } else if (pageName == 'address') {
        this.customerListActive = false
        this.customerInformationActive = true
        this.generalActive = false
        this.addressActive = true
        this.contactActive = false
        sessionStorage.setItem('changeBusiness', 'false')
      } else if (pageName == 'contact') {
        this.customerListActive = false
        this.customerInformationActive = true
        this.generalActive = false
        this.addressActive = false
        this.contactActive = true
        sessionStorage.setItem('changeBusiness', 'false')
      }
      this.$emit('loaded')
    },
    saveCustomer(value) {
      if (
        this.customerStore.customerProfile.cusNameEng == null ||
        this.customerStore.customerProfile.cusNameEng == '' ||
        this.customerStore.customerProfile.cusNameEng == undefined
      ) {
        alert('กรุณากรอกชื่อบริษัทภาษาอังกฤษ')
      } else {
        this.customerStore.customerProfile.businessId = this.profileStore.businesskey
        if (value == 'save') {
          this.customerStore.createCustomer(
            this.profileStore.profile.orgCustomId,
            this.customerStore.customerProfile
          )
        }
        if (value == 'update') {
          console.log(this.customerStore.customerProfile)
          this.customerStore.updateCustomer(
            this.profileStore.profile.orgCustomId,
            this.customerStore.customerProfile.businessId,
            this.customerStore.customerProfile.cusId,
            this.customerStore.customerProfile
          )
        }
        this.pageControl('customerList')
      }
    }
  }
}
</script>

<style>

.row {
  display: flex;
}

.row:after {
  content: '';
  display: table;
  clear: both;
}
</style>
