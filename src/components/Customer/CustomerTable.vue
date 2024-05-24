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

const data = [
  {
    index: '1',
    customerCode: 'CBT-00001',
    customerName: 'บริษัท ไซเบอร์แทรกซ์ จำกัด',
    recordStatus: 'ปกติ'
  }
]
</script>

<template>
  <div class="customer-card">
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
