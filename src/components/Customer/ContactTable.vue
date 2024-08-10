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
    title: 'ชื่อผู้ติดต่อ',
    className: 'header-center',
    data: 'cusConName',
    orderable: false,
    render: function (data, type, row) {
      return `<a onClick="handleContactClick(\`` + data.split(".")[0] + `\`)">` + data.split(".")[1] + `</a>`
    },
    createdCell: function (td, cellData, rowData, row, col) {
      td.classList.add('content-string')
    }
  },
  {
    title: 'โทรศัพท์มือถือ',
    className: 'header-center',
    data: 'mobileNo',
    orderable: false,
    createdCell: function (td, cellData, rowData, row, col) {
      td.classList.add('content-string')
    }
  },
  {
    title: 'E-Mail',
    className: 'header-center',
    data: 'email',
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
      td.classList.add('content-center')
    }
  }
]
</script>

<template>
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
  mounted() {
    window.handleContactClick = (data) => {
      this.$emit(`openModal`, data)
    }
    this.updateComponent()
  },
  updated() {
    this.updateComponent()
  },
  methods: {
    async updateComponent() {
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
</style>
