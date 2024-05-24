<script setup>
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net'

DataTable.use(DataTablesCore)

const columns = [
  {
    title: '',
    className: 'header-center',
    data: 'index',
    orderable: false,
    createdCell: function (td, cellData, rowData, row, col) {
      td.classList.add('content-index')
    }
  },
  {
    title: 'ชื่อบัญชี',
    className: 'header-center',
    data: 'accountName',
    orderable: false,
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
    data: 'bank',
    orderable: false,
    createdCell: function (td, cellData, rowData, row, col) {
      td.classList.add('content-string')
    }
  },
  {
    title: 'สาขา',
    className: 'header-center',
    data: 'branch',
    orderable: false,
    createdCell: function (td, cellData, rowData, row, col) {
      td.classList.add('content-string')
    }
  },
  {
    title: 'เลขที่บัญชี',
    className: 'header-center',
    data: 'accountNo',
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

const data = [
  {
    index: '1',
    accountName: 'บริษัท ซีเคียว โซลูชั่น เอเซีย จำกัด',
    accountType: 'กระแสรายวัน',
    bank: 'ธนาคารกสิกรไทย',
    branch: 'สาขาพัฒนาการ 20',
    accountNo: '727-1-02814-2',
    recordStatus: 'Active'
  }
]
</script>

<template>
  <div class="paymentaccount-card">
    <DataTable
      :columns="columns"
      :data="data"
      class="display"
      :options="{ select: true, order: [[0, 'asc']] }"
    >
    </DataTable>
  </div>
</template>

<style>
@import 'datatables.net-dt';
</style>
