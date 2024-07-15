<script setup>
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net'

DataTable.use(DataTablesCore)

const columns = [
  {
    title: '',
    className: 'header-center',
    data: 'productId',
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
    title: 'รหัสสินค้า',
    className: 'header-center',
    data: 'productCustomId',
    orderable: false,
    width: 200,
    render: function (data, type, row) {
      return `<a onClick="handleProductClick(\`` + data + `\`)">` + data + `</a>`
    },
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
    title: 'ราคา/หน่วย',
    className: 'header-center',
    data: 'msrpFormatted',
    orderable: false,
    searchable: false,
    width: 200,
    createdCell: function (td, cellData, rowData, row, col) {
      td.classList.add('content-string')
    }
  },
  {
    title: 'ราคาต่ำสุด/หน่วย',
    className: 'header-center',
    data: 'lwPriceFormatted',
    orderable: false,
    searchable: false,
    width: 200,
    createdCell: function (td, cellData, rowData, row, col) {
      td.classList.add('content-string')
    }
  },
  {
    title: 'สถานะ',
    className: 'header-center',
    data: 'productStatus',
    orderable: false,
    searchable: false,
    width: 100,
    createdCell: function (td, cellData, rowData, row, col) {
      td.classList.add('content-string')
    }
  }
]
</script>

<template>
  <div class="product-card">
    <DataTable
      :columns="columns"
      :data="productStore.productList"
      class="display"
      :options="{ select: true, order: [[0, 'asc']] }"
    >
    </DataTable>
  </div>
</template>

<script>
import { useProfileStore } from '@/stores/ProfileStore'
import { useCustomerStore } from '@/stores/CustomerStore'
import { useProductStore } from '@/stores/ProductStore'

export default {
  components: {},
  data() {
    return {
      profileStore: useProfileStore(),
      customerStore: useCustomerStore(),
      productStore: useProductStore()
    }
  },
  emits: ['pageControl'],
  mounted() {
    window.handleProductClick = (data) => {
      this.productStore.selectedProduct = data
      this.$emit(`pageControl`, `productInquiry`)
    }
    this.updateComponent()
  },
  updated() {
    this.updateComponent()
  },
  methods: {
    async updateComponent() {},
    add() {
      this.$emit(`pageControl`, `productEntry`)
    },
    remove() {
      let request = []
      let selectedItems = JSON.parse(sessionStorage.getItem('selectedItems')) || []
      if (selectedItems.length > 0) {
        selectedItems.forEach((selectedItem) => {
          let foundItem = this.productStore.productList.find((item) => item.cusId == selectedItem)
          request.push(foundItem)
        })
        this.productStore.deleteProduct(this.profileStore.profile.orgCustomId, request)
      }
      selectedItems.forEach((selectedItem) => {
        let index = this.productStore.productList.findIndex((item) => item.cusId == selectedItem)
        if (index !== -1) {
          let foundItem = this.productStore.productList.splice(index, 1)[0] // Remove item and get the removed item
          request.push(foundItem)
        } else {
          console.warn(`Item with product_id ${selectedItem} not found in productList`)
        }
      })
    }
  }
}
</script>

<style>
@import 'datatables.net-dt';
</style>
