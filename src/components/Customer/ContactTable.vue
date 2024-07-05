<script setup>
import { ref, onMounted } from 'vue'
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net'

DataTable.use(DataTablesCore)

const columns = [
  {
    title: '',
    className: 'header-center',
    data: 'cusConId',
    orderable: false,
    width: 5,
    render: function (data, type, row) {
      return (
        `<input type="checkbox" class="select-checkbox" onClick="{
          let selectedItems = JSON.parse(sessionStorage.getItem('selectedItems')) || [];
          let index = selectedItems.indexOf(\`` +
        data +
        `\`);
          if (index !== -1) {
            selectedItems.splice(index, 1);
          } else {
            selectedItems.push(\`` +
        data +
        `\`);
          }
          sessionStorage.setItem('selectedItems', JSON.stringify(selectedItems))
        }"/>`
      )
    },
    createdCell: function (td, cellData, rowData, row, col) {
      td.classList.add('content-index')
    }
  },
  {
    title: '',
    className: 'header-center',
    data: null,
    orderable: false,
    width: 5,
    render: function (data, type, row, meta) {
      return meta.row + 1
    },
    createdCell: function (td, cellData, rowData, row, col) {
      td.classList.add('content-index')
    }
  },
  {
    title: 'ชื่อ-สกุลลูกค้า',
    className: 'header-center',
    data: 'cusName',
    orderable: false,
    render: function (data, type, row) {
      return `<a onClick="handleCustomerClick(\`` + data + `\`)">` + data + `</a>`
    },
    createdCell: function (td, cellData, rowData, row, col) {
      td.classList.add('content-string')
    }
  },
  {
    title: 'โทรศัพท์',
    className: 'header-center',
    data: 'telNo',
    orderable: false,
    createdCell: function (td, cellData, rowData, row, col) {
      td.classList.add('content-string')
    }
  },
  {
    title: 'มือถือ',
    className: 'header-center',
    data: 'mobileNo',
    orderable: false,
    createdCell: function (td, cellData, rowData, row, col) {
      td.classList.add('content-string')
    }
  },
  {
    title: 'สถานะ',
    className: 'header-center',
    data: 'cusConStatus',
    orderable: false,
    createdCell: function (td, cellData, rowData, row, col) {
      td.classList.add('content-string')
    }
  }
]
</script>

<template>
  <button class="add-customer-contact-button" @click="add">Add</button>
  <button class="remove-customer-contact-button" @click="remove">Delete</button>
  <div class="customer-contact-card">
    <DataTable
      :columns="columns"
      :data="customerStore.cusConList"
      class="display"
      :options="{ select: true, order: [[0, 'asc']] }"
    >
    </DataTable>
  </div>
</template>

<script>
import { useProfileStore } from '@/stores/ProfileStore'
import { useCustomerStore } from '@/stores/CustomerStore'

export default {
  components: {},
  data() {
    return {
      profileStore: useProfileStore(),
      customerStore: useCustomerStore()
    }
  },
  emits: ['pageControl'],
  mounted() {
    window.handleCustomerClick = (data) => {
      this.customerStore.selectedCustomer = data
      this.$emit(`pageControl`, `customerInquiry`)
    }
    this.updateComponent()
  },
  updated() {
    this.updateComponent()
  },
  methods: {
    async updateComponent() {},
    add() {
      this.$emit(`openModal`)
    },
    remove() {
      let request = []
      let selectedItems = JSON.parse(sessionStorage.getItem('selectedItems')) || []
      if (selectedItems.length > 0) {
        selectedItems.forEach((selectedItem) => {
          let foundItem = this.customerStore.customerList.find((item) => item.cusId == selectedItem)
          request.push(foundItem)
        })
        this.customerStore.deleteCustomer(this.profileStore.profile.orgCustomId, request)
      }
      selectedItems.forEach((selectedItem) => {
        let index = this.customerStore.customerList.findIndex((item) => item.cusId == selectedItem)
        if (index !== -1) {
          let foundItem = this.customerStore.customerList.splice(index, 1)[0] // Remove item and get the removed item
          request.push(foundItem)
        } else {
          console.warn(`Item with cusId ${selectedItem} not found in customerList`)
        }
      })
    }
  }
}
</script>

<style>
@import 'datatables.net-dt';

.customer-contact-card {
  position: absolute;
  width: 1300px;
  height: 648px;
  left: 350px;
  top: 175px;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 0px;
  padding: 2em;
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
</style>
