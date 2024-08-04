<script setup>
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net'

DataTable.use(DataTablesCore)

const columns = [
  {
    title: '',
    className: 'header-center',
    data: 'paymentAccountId',
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
    searchable: false,
    width: 5,
    render: function (data, type, row, meta) {
      return meta.row + 1
    },
    createdCell: function (td, cellData, rowData, row, col) {
      td.classList.add('content-index')
    }
  },
  {
    title: 'ชื่อบัญชี',
    className: 'header-center',
    data: 'paymentAccountName',
    orderable: false,
    width: 400,
    createdCell: function (td, cellData, rowData, row, col) {
      td.classList.add('content-string')
    }
  },
  {
    title: 'ประเภทบัญชี',
    className: 'header-center',
    data: 'accountType',
    orderable: false,
    createdCell: function (td, cellData, rowData, row, col) {
      td.classList.add('content-string')
    }
  },
  {
    title: 'ธนาคาร',
    className: 'header-center',
    data: 'accountBankName',
    orderable: false,
    createdCell: function (td, cellData, rowData, row, col) {
      td.classList.add('content-string')
    }
  },
  {
    title: 'สาขา',
    className: 'header-center',
    data: 'accountBankBrn',
    orderable: false,
    createdCell: function (td, cellData, rowData, row, col) {
      td.classList.add('content-string')
    }
  },
  {
    title: 'เลขที่บัญชี',
    className: 'header-center',
    data: 'paymentAccountNo',
    orderable: false,
    createdCell: function (td, cellData, rowData, row, col) {
      td.classList.add('content-string')
    }
  },
  {
    title: 'สถานะ',
    className: 'header-center',
    data: 'accountStatus',
    orderable: false,
    createdCell: function (td, cellData, rowData, row, col) {
      td.classList.add('content-string')
    }
  }
]
</script>

<template>
  <div class="paymentaccount-card">
    <DataTable
      :columns="columns"
      :data="paymentAccountStore.paymentAccountList"
      class="display"
      :options="{ select: true, order: [[0, 'asc']] }"
    >
    </DataTable>
  </div>
</template>

<script>
import { useProfileStore } from '@/stores/ProfileStore'
import { useCustomerStore } from '@/stores/CustomerStore'
import { usePaymentAccountStore } from '@/stores/PaymentAccountStore';

export default {
  components: {},
  data() {
    return {
      profileStore: useProfileStore(),
      customerStore: useCustomerStore(),
      paymentAccountStore: usePaymentAccountStore()
    }
  },
  emits: ['pageControl'],
  mounted() {
    window.handlePaymentAccountClick = (data) => {
      this.paymentAccountStore.selectedPaymentAccount = data
      this.$emit(`pageControl`, `paymentAccountInquiry`)
    }
    this.updateComponent()
  },
  updated() {
    this.updateComponent()
  },
  methods: {
    async updateComponent() {},
    add() {
      this.$emit(`pageControl`, `paymentAccountEntry`)
    },
    remove() {
      let request = []
      let selectedItems = JSON.parse(sessionStorage.getItem('selectedItems')) || []
      if (selectedItems.length > 0) {
        selectedItems.forEach((selectedItem) => {
          let foundItem = this.paymentAccountStore.paymentAccountList.find((item) => item.cusId == selectedItem)
          request.push(foundItem)
        })
        this.conditionStore.deleteProject(this.profileStore.profile.orgCustomId, request)
      }
      selectedItems.forEach((selectedItem) => {
        let index = this.paymentAccountStore.paymentAccountList.findIndex((item) => item.cusId == selectedItem)
        if (index !== -1) {
          let foundItem = this.paymentAccountStore.paymentAccountList.splice(index, 1)[0] // Remove item and get the removed item
          request.push(foundItem)
        } else {
          console.warn(`Item with project_id ${selectedItem} not found in projectList`)
        }
      })
    }
  }
}
</script>

<style>
@import 'datatables.net-dt';
</style>
