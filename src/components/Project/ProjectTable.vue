<script setup>
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net'

DataTable.use(DataTablesCore)

const columns = [
  {
    title: '',
    className: 'header-center',
    data: 'projectId',
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
    title: 'รหัสโครงการ',
    className: 'header-center',
    data: 'projectCustomId',
    orderable: false,
    width: 200,
    render: function (data, type, row) {
      return `<a onClick="handleProjectClick(\`` + data + `\`)">` + data + `</a>`
    },
    createdCell: function (td, cellData, rowData, row, col) {
      td.classList.add('content-string')
    }
  },
  {
    title: 'ชื่อโครงการ',
    className: 'header-center',
    data: 'projectName',
    orderable: false,
    type: 'string',
    createdCell: function (td, cellData, rowData, row, col) {
      td.classList.add('content-string')
    }
  },
  {
    title: 'สถานะ',
    className: 'header-center',
    data: 'projectStatus',
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
  <button class="add-project-button" @click="add">Add</button>
  <button class="remove-project-button" @click="remove">Delete</button>
  <div class="project-card">
    <DataTable
      :columns="columns"
      :data="projectStore.projectList"
      class="display"
      :options="{ select: true, order: [[0, 'asc']] }"
    >
    </DataTable>
  </div>
</template>

<script>
import { useProfileStore } from '@/stores/ProfileStore'
import { useCustomerStore } from '@/stores/CustomerStore'
import { useProjectStore } from '@/stores/ProjectStore'

export default {
  components: {},
  data() {
    return {
      profileStore: useProfileStore(),
      customerStore: useCustomerStore(),
      projectStore: useProjectStore()
    }
  },
  emits: ['pageControl'],
  mounted() {
    window.handleProjectClick = (data) => {
      this.projectStore.selectedProject = data
      this.$emit(`pageControl`, `projectInquiry`)
    }
    this.updateComponent()
  },
  updated() {
    this.updateComponent()
  },
  methods: {
    async updateComponent() {},
    add() {
      this.$emit(`pageControl`, `projectEntry`)
    },
    remove() {
      let request = []
      let selectedItems = JSON.parse(sessionStorage.getItem('selectedItems')) || []
      if (selectedItems.length > 0) {
        selectedItems.forEach((selectedItem) => {
          let foundItem = this.projectStore.projectList.find((item) => item.cusId == selectedItem)
          request.push(foundItem)
        })
        this.projectStore.deleteProject(this.profileStore.profile.orgCustomId, request)
      }
      selectedItems.forEach((selectedItem) => {
        let index = this.projectStore.projectList.findIndex((item) => item.cusId == selectedItem)
        if (index !== -1) {
          let foundItem = this.projectStore.projectList.splice(index, 1)[0] // Remove item and get the removed item
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

.add-project-button {
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

.add-project-button:hover {
  background-color: #00275f;
  color: #fff;
  border-color: #00275f;
}

.remove-project-button {
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

.remove-project-button:hover {
  background-color: #ff0000;
  color: #fff;
  border-color: #ff0000;
}
</style>
