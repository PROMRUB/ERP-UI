<script setup>
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net'

DataTable.use(DataTablesCore)

const columns = [
  {
    title: '',
    className: 'header-center',
    data: 'conditionId',
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
    title: 'รายละเอียด',
    className: 'header-center',
    data: 'conditionDescription',
    orderable: false,
    type: 'string',
    createdCell: function (td, cellData, rowData, row, col) {
      td.classList.add('content-string')
    }
  },
  {
    title: 'สถานะ',
    className: 'header-center',
    data: 'conditionStatus',
    orderable: false,
    searchable: false,
    width: 100,
    createdCell: function (td, cellData, rowData, row, col) {
      td.classList.add('content-center')
    }
  }
]
</script>

<template>
  <div class="payment-card">
    <DataTable
      :columns="columns"
      :data="conditionStore.conditionList"
      class="display"
      :options="{ select: true, order: [[0, 'asc']] }"
    >
    </DataTable>
  </div>
</template>

<script>
import { useProfileStore } from '@/stores/ProfileStore'
import { useCustomerStore } from '@/stores/CustomerStore'
import { useConditionStore } from '@/stores/ConditionStore'

export default {
  components: {},
  data() {
    return {
      profileStore: useProfileStore(),
      customerStore: useCustomerStore(),
      conditionStore: useConditionStore()
    }
  },
  emits: ['pageControl'],
  mounted() {
    window.handleProjectClick = (data) => {
      this.conditionStore.selectedCondition = data
      this.$emit(`pageControl`, `conditionInquiry`)
    }
    this.updateComponent()
  },
  updated() {
    this.updateComponent()
  },
  methods: {
    async updateComponent() {},
    add() {
      this.$emit(`pageControl`, `conditionEntry`)
    },
    remove() {
      let request = []
      let selectedItems = JSON.parse(sessionStorage.getItem('selectedItems')) || []
      if (selectedItems.length > 0) {
        selectedItems.forEach((selectedItem) => {
          let foundItem = this.conditionStore.conditionList.find((item) => item.cusId == selectedItem)
          request.push(foundItem)
        })
        this.conditionStore.deleteProject(this.profileStore.profile.orgCustomId, request)
      }
      selectedItems.forEach((selectedItem) => {
        let index = this.conditionStore.conditionList.findIndex((item) => item.cusId == selectedItem)
        if (index !== -1) {
          let foundItem = this.conditionStore.conditionList.splice(index, 1)[0] // Remove item and get the removed item
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
