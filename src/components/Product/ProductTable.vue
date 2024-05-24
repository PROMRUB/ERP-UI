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
    title: 'รหัสสินค้า',
    className: 'header-center',
    data: 'productCode',
    orderable: false,
    createdCell: function (td, cellData, rowData, row, col) {
      td.classList.add('content-string')
    }
  },
  {
    title: 'ชื่อสินค้า',
    className: 'header-center',
    data: 'productName',
    orderable: false,
    createdCell: function (td, cellData, rowData, row, col) {
      td.classList.add('content-string')
    }
  },
  {
    title: 'กลุ่มสินค้า',
    className: 'header-center',
    data: 'productType',
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
    productCode: 'PL701',
    productName: 'L430, LONG LATCH',
    productType: 'InVue - Access Control',
    recordStatus: 'Active'
  }
]
</script>

<template>
  <div class="product-card">
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
