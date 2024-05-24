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
    title: 'เงื่อนไขการชำระ',
    className: 'header-center',
    data: 'paymentCondition',
    orderable: false,
    createdCell: function (td, cellData, rowData, row, col) {
      td.classList.add('content-string')
    }
  },
  { title: 'วันที่เพิ่ม', className: 'header-center', data: 'createDate', orderable: false },
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
    paymentCondition:
      '50% เมื่อยืนยันการสั่งซื้อ, 40% เมื่อส่งมอบอุปกรณ์ 10% ที่เหลือเมื่อส่งมอบงาน',
    createDate: '5/24/2024',
    recordStatus: 'Active'
  },

  {
    index: '2',
    paymentCondition: '50% เมื่อยืนยันการสั่งซื้อ, 50% ที่เหลือโอนเงินก่อนส่งสินค้า',
    createDate: '5/24/2024',
    recordStatus: 'Active'
  },
  {
    index: '3',
    paymentCondition:
      '50% เมื่อยืนยันการสั่งซื้อ ที่เหลือ 50% ชำระก่อนวันเริ่ม Activate Subscription',
    createDate: '5/24/2024',
    recordStatus: 'Active'
  },
  {
    index: '4',
    paymentCondition: '100% เมื่อสั่งซื้อ',
    createDate: '5/24/2024',
    recordStatus: 'Active'
  }
]
</script>

<template>
  <div class="payment-card">
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
