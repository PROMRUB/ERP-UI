<script setup>
import { ref, onMounted } from 'vue'
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net'

DataTable.use(DataTablesCore)

const columns = [
  {
    title: '',
    className: 'header-center',
    data: 'index',
    orderable: false,
    width: 5,
    render: function (data, type, row) {
      return (
        `<input type="checkbox" class="select-checkbox" onClick="{
          let selectedItems = JSON.parse(sessionStorage.getItem('selectedItems')) || [];
          let index = selectedItems.indexOf(` +
        data +
        `);
          if (index !== -1) {
            selectedItems.splice(index, 1);
          } else {
            selectedItems.push(` +
        data +
        `);
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
    title: 'รหัสลูกค้า',
    className: 'header-center',
    data: 'customerCode',
    orderable: false,
    createdCell: function (td, cellData, rowData, row, col) {
      td.classList.add('content-string')
    }
  },
  {
    title: 'ชื่อลูกค้า',
    className: 'header-center',
    data: 'customerName',
    orderable: false,
    createdCell: function (td, cellData, rowData, row, col) {
      td.classList.add('content-string')
    }
  },
  {
    title: 'สถานะ',
    className: 'header-center',
    data: 'recordStatus',
    orderable: false,
    createdCell: function (td, cellData, rowData, row, col) {
      td.classList.add('content-string')
    }
  }
]
</script>

<template>
  <button class="add-customer-button" @click="add">Add</button>
  <button class="remove-customer-button" @click="remove">Delete</button>
  <div class="customer-card">
    <DataTable
      :columns="columns"
      :data="customerStore.customerList"
      class="display"
      :options="{ select: true, order: [[0, 'asc']] }"
    >
    </DataTable>
  </div>
</template>

<script>
import { useCustomerStore } from '@/stores/CustomerStore'

export default {
  components: {},
  data() {
    return {
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
    },
    add(){
      this.$emit(`pageControl`, `customerEntry`)
    },
    remove() {
      let request = []
      let selectedItems = JSON.parse(sessionStorage.getItem('selectedItems')) || []
      selectedItems.forEach((selectedItem) => {
        let foundItem = this.customerStore.customerList.find((item) => item.index == selectedItem)
        request.push(JSON.stringify(foundItem))
      })
    }
  }
}
</script>

<style>
@import 'datatables.net-dt';

.add-customer-button {
  background-color: #fff;
  position: absolute;
  display: inline-block;
  border: 1px solid #00275f;
  border-radius: 3px;
  width: 80px;
  height: 30px;
  left: 80%;
  top: 10%;
}

.add-customer-button:hover {
  background-color: #00275f;
  color: #fff;
  border-color: #00275f;
}

.remove-customer-button {
  background-color: #fff;
  position: absolute;
  display: inline-block;
  border: 1px solid #ff0000;
  border-radius: 3px;
  width: 80px;
  height: 30px;
  left: 85%;
  top: 10%;
}

.remove-customer-button:hover {
  background-color: #ff0000;
  color: #fff;
  border-color: #ff0000;
}
</style>
