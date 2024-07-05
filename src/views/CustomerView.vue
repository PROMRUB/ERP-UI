<script setup></script>

<template>
  <Teleport to="body">
    <div id="modal" v-show="openContactModal" class="contact-modal">
      <ContactModal @onClickSave="saveContact" @closeModal="closedModal" />
    </div>
  </Teleport>

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
          <button
            class="contact-btn"
            :class="{ active: contactActive }"
            @click="pageControl(`contact`)"
            v-show="showContact"
          >
            <span><i class="fa fa-address-card fa-lg" aria-hidden="true"></i>ผู้ติดต่อ</span>
          </button>
        </div>
        <div class="row" v-if="generalActive">
          <GeneralInformation @pageControl="pageControl" @saveCustomer="saveCustomer" />
        </div>
        <div class="row" v-if="addressActive">
          <AddressInformation @pageControl="pageControl" @saveCustomer="saveCustomer" />
        </div>
        <div class="row" v-if="contactActive">
          <ContactInformation @openModal="addContact" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import CustomerTable from '@/components/Customer/CustomerTable.vue'
import GeneralInformation from '@/components/Customer/GeneralInformation.vue'
import AddressInformation from '@/components/Customer/AddressInformation.vue'
import ContactInformation from '@/components/Customer/ContactInformation.vue'
import ContactModal from '@/components/Customer/ContactModal.vue'

import { useProfileStore } from '@/stores/ProfileStore'
import { useSystemConfigStore } from '@/stores/SystemConfigStore'
import { useCustomerStore } from '@/stores/CustomerStore'

export default {
  components: {
    CustomerTable,
    ContactModal,
    GeneralInformation,
    AddressInformation,
    ContactInformation
  },
  data() {
    return {
      customerListActive: true,
      customerInformationActive: false,
      showContact: false,
      generalActive: false,
      addressActive: false,
      contactActive: false,
      openContactModal: false,

      profileStore: useProfileStore(),
      systemConfigStore: useSystemConfigStore(),
      customerStore: useCustomerStore()
    }
  },
  watch: {
    generalActive(newValue, oldValue) {},
    addressActive(newValue, oldValue) {},
    contactActive(newValue, oldValue) {},
    openContactModal(newValue, oldValue) {}
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
        this.showContact = false
      } else if (pageName == 'customerEntry') {
        this.customerListActive = false
        this.customerInformationActive = true
        this.generalActive = true
        this.addressActive = false
        this.contactActive = false
        this.customerStore.hvData = true
        this.showContact = false
        sessionStorage.setItem('mode', 'Entry')
        sessionStorage.setItem('changeBusiness', 'false')
      } else if (pageName == 'customerInquiry') {
        this.customerListActive = false
        this.customerInformationActive = true
        this.generalActive = true
        this.addressActive = false
        this.contactActive = false
        this.showContact = true
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
        this.showContact = true
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
    },
    addContact() {
      this.openContactModal = true
    },
    saveContact() {},
    closedModal() {
      console.log('test')
      this.openContactModal = false
    }
  }
}
</script>

<style>
.contact-modal {
  position: absolute;
  width: 800px;
  height: 375px;
  top: 40%;
  left: calc(40% - 163.5px);
  background: #ffffff;
  border-radius: 15px;

  font-family: 'Kanit', sans-serif;

  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.3),
    0 4px 6px -2px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.contact-close-modal-icon {
  position: absolute;
  width: 50px;
  height: 50px;
  top: 2%;
  left: 93%;
}

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

.contact-btn {
  position: absolute;
  width: 200px;
  height: 48px;
  left: 750px;
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
