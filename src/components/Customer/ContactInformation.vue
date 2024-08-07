<template>
  <button v-if="!disableAdd" class="add-customer-contact-button" @click="add">เพิ่ม</button>
  <button v-if="!disableDelete" class="remove-customer-contact-button" @click="remove">
    ลบ
  </button>
  <ContactTable @openModal="openModal" />
  <div v-if="!disableEdit" class="customer-address-column">
    <button
      class="customer-customer-contact-bottom-button customer-customer-contact-save-bottom-button"
      @click="edit"
    >
      <i class="fa fa-pencil fa-lg" aria-hidden="true" />แก้ไข
    </button>
  </div>
  <div v-if="!disableUpdate" class="customer-address-column">
    <button
      class="customer-customer-contact-bottom-button customer-customer-contact-save-bottom-button"
      @click="update"
    >
      <i class="fa fa-floppy-o fa-lg" aria-hidden="true" />บันทึก
    </button>
  </div>
  <div class="customer-address-column">
    <button
      class="customer-customer-contact-bottom-button customer-customer-contact-cancel-bottom-button"
      @click="back"
    >
      <i class="fa fa-times fa-lg" aria-hidden="true" />ยกเลิก
    </button>
  </div>
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
      rendered: false,
      disableAdd: true,
      disableDelete: true,
      disableEdit: false,
      disableUpdate: true,

      profileStore: useProfileStore(),
      systemConfigStore: useSystemConfigStore(),
      customerStore: useCustomerStore()
    }
  },
  watch: {},
  mounted() {
    this.updateComponent()
  },
  updated() {
    this.updateComponent()
  },
  methods: {
    async updateComponent() {
      if (!this.rendered) {
        const contact = await this.customerStore.fetchCustomerContact(
          this.profileStore.profile.orgCustomId,
          this.profileStore.businessKey,
          this.customerStore.customerProfile.cusId
        )
        if (sessionStorage.getItem('mode') == 'Entry') {
        }
        if (sessionStorage.getItem('mode') == 'Inquiry') {
          this.disableEdit = false
          this.disableUpdate = true
        }
        if (sessionStorage.getItem('mode') == 'Update') {
          this.disableAdd = false
          this.disableDelete = false
          this.disableEdit = true
          this.disableUpdate = false
        }
        this.rendered = true
      }
    },
    async openModal(data) {
      if (!(data == null || data == undefined || data == ''))
        var response = await this.customerStore.fetchCustomerContactProfile(
          this.profileStore.profile.orgCustomId,
          this.customerStore.customerProfile.businessId,
          this.customerStore.customerProfile.cusId,
          data
        )
      this.$emit(`openModal`, 'Update')
    },
    add() {
      this.$emit(`openModal`, 'Entry')
    },
    remove() {
      let request = []
      let selectedItems = JSON.parse(sessionStorage.getItem('selectedItems')) || []
      if (selectedItems.length > 0) {
        selectedItems.forEach((selectedItem) => {
          let foundItem = this.customerStore.cusConList.find((item) => item.cusId == selectedItem)
          request.push(foundItem)
        })
        this.customerStore.deleteCustomer(this.profileStore.profile.orgCustomId, request)
      }
      selectedItems.forEach((selectedItem) => {
        let index = this.customerStore.cusConList.findIndex((item) => item.cusId == selectedItem)
        if (index !== -1) {
          let foundItem = this.customerStore.cusConList.splice(index, 1)[0] // Remove item and get the removed item
          request.push(foundItem)
        } else {
          console.warn(`Item with cusId ${selectedItem} not found in customerList`)
        }
      })
    },
    back() {
      this.rendered = false
      this.$emit(`pageControl`, `customerList`)
    },
    edit() {
      this.rendered = false
      sessionStorage.setItem('mode', 'Update')
      this.updateComponent()
    },
    update() {
      this.$emit(`saveCustomer`, `update`)
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

.add-customer-contact-button {
  background-color: #fff;
  position: absolute;
  display: inline-block;
  border: 1px solid #00275f;
  border-radius: 3px;
  width: 80px;
  height: 30px;
  left: 60%;
  top: 24%;
  z-index: 9998;
}

.add-customer-contact-button:hover {
  background-color: #00275f;
  color: #fff;
  border-color: #00275f;
}

.remove-customer-contact-button {
  background-color: #fff;
  position: absolute;
  display: inline-block;
  border: 1px solid #ff0000;
  border-radius: 3px;
  width: 80px;
  height: 30px;
  left: 65%;
  top: 24%;
  z-index: 9998;
}

.remove-customer-contact-button:hover {
  background-color: #ff0000;
  color: #fff;
  border-color: #ff0000;
}

.customer-customer-contact-bottom-button {
  position: absolute;
  width: 125px;
  height: 35px;
  top: 78.6%;
  border-radius: 3px;
}

.customer-customer-contact-save-bottom-button {
  background-color: #ffffff;
  color: #00275e;
  border: 1px solid #00275e;
  left: 68%;
}

.customer-customer-contact-save-bottom-button:hover {
  color: #ffffff;
  background-color: #00275e;
}

.customer-customer-contact-cancel-bottom-button {
  background-color: #ffffff;
  color: #ff0000;
  border: 1px solid #ff0000;
  left: 76%;
}

.customer-customer-contact-cancel-bottom-button:hover {
  color: #ffffff;
  background-color: #ff0000;
}
</style>
