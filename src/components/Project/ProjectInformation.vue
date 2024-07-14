<template>
  <div class="project-information-card">
    <div class="container">
      <div class="row">
        <div class="project-information-column">
          <div class="form-group">
            <div class="form-line">
              <div class="form-line">
                <div class="form-line">
                  <label class="project-information-input-box-label form-text" for="projectCustomId"
                    >รหัสโครงการ:</label
                  >
                  <input
                    class="project-information-input-box"
                    type="text"
                    id="projectCustomId"
                    name="projectCustomId"
                    v-model="projectStore.projectProfile.projectCustomId"
                    :disabled="disableProjectCode"
                  />
                </div>
                <div class="form-line">
                  <label class="project-information-input-box-label form-text" for="projectName"
                    >ชื่อโครงการ:</label
                  >
                  <input
                    class="project-information-input-box"
                    type="text"
                    id="projectName"
                    name="projectName"
                    v-model="projectStore.projectProfile.projectName"
                    :disabled="disableProjectName"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div v-if="!disableSave" class="project-information-column">
              <button
                class="project-information-button project-information-save-button"
                @click="save"
              >
                <i class="fa fa-floppy-o fa-lg" aria-hidden="true" />บันทึก
              </button>
            </div>
            <div v-if="!disableUpdate" class="customer-general-column">
              <button
                class="project-information-button project-information-save-button"
                @click="update"
              >
                <i class="fa fa-floppy-o fa-lg" aria-hidden="true" />บันทึก
              </button>
            </div>
            <div class="project-information-column">
              <button
                class="project-information-button project-information-cancel-button"
                @click="back"
              >
                <i class="fa fa-times fa-lg" aria-hidden="true" />ยกเลิก
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useProjectStore } from '@/stores/ProjectStore'

export default {
  components: {},
  data() {
    return {
      rendered: false,
      disableCat: false,
      disableSubCat: false,
      disableProjectCode: false,
      disableProjectName: false,
      disableMSRP: false,
      disableLwPrice: false,
      disableSave: false,
      disableEdit: false,
      disableUpdate: false,

      selectedCat: '',
      selectedSubCat: '',

      subCatFiltered: [],

      projectStore: useProjectStore()
    }
  },
  emits: ['pageControl'],
  watch: {
    rendered(newValue, oldValue) {}
  },
  mounted() {
    this.updateComponent()
  },
  updated() {
    this.updateComponent()
  },
  methods: {
    async updateComponent() {
      if (sessionStorage.getItem('mode') == 'Entry') {
        this.disableProjectCode = true
        this.disableProjectName = false
        this.disableEdit = true
        this.disableUpdate = true
        if (sessionStorage.getItem('rendered') == 'false') {
          this.projectStore.projectProfile.projectName = ''
          this.projectStore.projectProfile.projectCustomId = ''
          sessionStorage.setItem('rendered', 'true')
        }
      } else if (sessionStorage.getItem('mode') == 'Inquiry') {
        this.disableProjectCode = true
        this.disableProjectName = true
        this.disableEdit = false
        this.disableSave = true
        this.disableUpdate = true
      } else if (sessionStorage.getItem('mode') == 'Update') {
        this.disableProjectCode = true
        this.disableProjectName = false
        this.disableSave = true
        this.disableEdit = true
        this.disableUpdate = false
      }
    },
    back() {
      sessionStorage.setItem('rendered', 'false')
      this.$emit(`pageControl`, `projectList`)
    },
    save() {
      sessionStorage.setItem('rendered', 'false')
      this.$emit(`saveProject`, `save`)
    },
    edit() {
      sessionStorage.setItem('rendered', 'false')
      sessionStorage.setItem('mode', 'Update')
      this.updateComponent()
    },
    update() {
      this.$emit(`saveProject`, `update`)
    }
  }
}
</script>

<style>
.project-information-card {
  position: absolute;
  width: 1300px;
  height: 648px;
  left: 350px;
  top: 175px;
  background: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 0px;
  padding: 2em;
}

.radio-group {
  margin-top: 0px !important;
}

.project-information-input-box-label {
  display: inline-block;
  width: 200px;
  text-align: right;
  margin-right: 10px;
  height: 21px;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  color: #231f20;
  order: 0;
  flex-grow: 0;
  z-index: 0;
}

.right-column {
  width: 150px;
}

.project-information-input-box {
  gap: 0px 58px;
  width: 350px;
  height: 30px;
  font-size: 20px;
  border: none;
  border-bottom: solid 1.5px gray;
}

.project-information-input-box:disabled {
  background-color: #ffffff;
  border-bottom: none;
}

.input-box:focus {
  outline: none;
}

.input-box:disabled {
  background-color: #fff;
}

.card-header {
  width: 100%;
  height: 48px;
  left: 288px;
  top: 183px;
  background: #00275e;
  border-radius: 4px 4px 0px 0px;
}

.radio-group {
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin: 20px;
}

.form-group {
  gap: 10px;
  margin: 20px;
}

.form-line {
  margin-top: 26px;
}

.form-text {
  left: 0%;
  right: 81.74%;
  top: 0%;
  bottom: 19.23%;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  text-align: right;
  color: #231f20;
}

.form-input {
  border: none;
  border-bottom: 1px solid #00275e;
  width: 350px;
}

.row {
  display: flex;
}

.project-information-column {
  float: left;
  width: 50%;
}

.row:after {
  content: '';
  display: table;
  clear: both;
}

.project-information-button {
  position: absolute;
  width: 125px;
  height: 35px;
  top: 90%;
  border-radius: 3px;
}

.project-information-save-button {
  background-color: #ffffff;
  color: #00275e;
  border: 1px solid #00275e;
  left: 73%;
}

.project-information-save-button:hover {
  color: #ffffff;
  background-color: #00275e;
}

.project-information-cancel-button {
  background-color: #ffffff;
  color: #ff0000;
  border: 1px solid #ff0000;
  left: 85%;
}

.project-information-cancel-button:hover {
  color: #ffffff;
  background-color: #ff0000;
}
</style>
