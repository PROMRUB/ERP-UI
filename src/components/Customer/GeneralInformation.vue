<template>
  <div class="customer-general-card">
    <div class="container">
      <div class="radio-group">
        <input
          type="radio"
          id="Corporate"
          value="Corporate"
          v-model="customerStore.customerProfile.cusType"
          :disabled="disableCusType"
        />
        <label class="form-text" for="Corporate">นิติบุคคล</label>

        <input
          type="radio"
          id="Personal"
          value="Individual"
          v-model="customerStore.customerProfile.cusType"
          :disabled="disableCusType"
        />
        <label class="form-text" for="Individual">บุคคลธรรมดา</label>

        <label
          class="customer-general-input-box-label form-text customer-general-eng-label"
          for="taxId"
          >ชื่อผู้ประกอบการ (ภาษาอังกฤษ)<span class="customer-red">*</span>:</label
        >
        <input
          class="customer-general-input-box customer-general-eng-input-box"
          type="text"
          id="cusNameEng"
          v-model="customerStore.customerProfile.cusNameEng"
          :disabled="disableCusNameEng"
        />
      </div>
      <hr />
      <div class="row">
        <div class="customer-general-column">
          <div class="form-group">
            <div class="form-line">
              <label class="customer-general-input-box-label form-text" for="customerNo"
                >รหัสลูกค้า:</label
              >
              <input
                class="customer-general-input-box"
                type="text"
                id="customerNo"
                name="customerId"
                v-model="customerStore.customerProfile.cusCustomId"
                disabled
              />
            </div>
            <div class="form-line">
              <label class="customer-general-input-box-label form-text" for="taxId"
                >เลขประจำตัวผู้เสียภาษี:</label
              >
              <input
                class="customer-general-input-box"
                type="text"
                id="taxId"
                name="taxId"
                v-model="customerStore.customerProfile.taxId"
                :disabled="disableTaxId"
              />
            </div>
            <div class="form-line">
              <label class="customer-general-input-box-label form-text" for="brnId">สาขา:</label>
              <input
                class="customer-general-input-box"
                type="text"
                id="brnId"
                name="brnId"
                v-model="customerStore.customerProfile.brnId"
                :disabled="disableBrnId"
              />
            </div>
            <div class="form-line">
              <label class="customer-general-input-box-label form-text" for="cusName"
                >ชื่อผู้ประกอบการ:</label
              >
              <input
                class="customer-general-input-box"
                type="text"
                id="cusName"
                name="cusName"
                v-model="customerStore.customerProfile.cusName"
                :disabled="disableCusName"
              />
            </div>
            <div class="form-line">
              <label class="customer-general-input-box-label form-text" for="displayName"
                >ชื่อสถานประกอบการ:</label
              >
              <input
                class="customer-general-input-box"
                type="text"
                id="displayName"
                name="displayName"
                v-model="customerStore.customerProfile.displayName"
                :disabled="disableDisplayName"
              />
            </div>
          </div>
        </div>
        <div class="customer-general-column">
          <div class="form-group">
            <div class="form-line">
              <label class="customer-general-input-box-label form-text right-column"></label>
            </div>
            <div class="form-line">
              <label class="customer-general-input-box-label form-text right-column" for="website"
                >URL:</label
              >
              <input
                class="customer-general-input-box right-column"
                type="text"
                id="website"
                name="website"
                v-model="customerStore.customerProfile.website"
                :disabled="disableWebsite"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div v-if="!disableSave" class="customer-general-column">
          <button class="customer-general-button customer-general-save-button" @click="save">
            <i class="fa fa-floppy-o fa-lg" aria-hidden="true" />บันทึก
          </button>
        </div>
        <div class="customer-general-column">
          <button class="customer-general-button customer-general-cancel-button" @click="back">
            <i class="fa fa-times fa-lg" aria-hidden="true" />ยกเลิก
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCustomerStore } from '@/stores/CustomerStore'

export default {
  components: {},
  data() {
    return {
      disableCusType: false,
      disableCusNameEng: false,
      disableTaxId: false,
      disableBrnId: false,
      disableCusName: false,
      disableDisplayName: false,
      disableWebsite: false,
      disableSave: false,
      customerStore: useCustomerStore()
    }
  },
  mounted() {
    this.updateComponent()
  },
  updated() {
    this.updateComponent()
  },
  methods: {
    async updateComponent() {
      if (this.customerStore.mode == 'Entry') {
        this.disableCusType = false
        this.disableCusNameEng = false
        this.disableTaxId = false
        this.disableBrnId = false
        this.disableCusName = false
        this.disableDisplayName = false
        this.disableWebsite = false
        this.disableSave = false
      }
      if (this.customerStore.mode == 'Inquiry') {
        this.disableCusType = true
        this.disableCusNameEng = true
        this.disableTaxId = true
        this.disableBrnId = true
        this.disableCusName = true
        this.disableDisplayName = true
        this.disableWebsite = true
        this.disableSave = true
      }
      if (this.customerStore.mode == 'Update') {
        this.disableCusType = false
        this.disableCusNameEng = false
      }
    },
    back() {
      this.$emit(`pageControl`, `customerList`)
    },
    save() {
      this.$emit(`saveCustomer`, `save`)
    }
  }
}
</script>

<style>
.customer-general-card {
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

.customer-general-input-box-label {
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

.customer-red {
  color: #ff0000;
}

.right-column {
  width: 150px;
}

.customer-general-eng-label {
  width: 300px;
}

.customer-general-input-box {
  gap: 0px 58px;
  width: 300px;
  height: 30px;
  font-size: 20px;
  border: none;
  border-bottom: solid 1.5px gray;
}

.customer-general-input-box:disabled {
  background-color: #ffffff;
  border-bottom: none;
}

.customer-general-eng-input-box {
  width: 500px;
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

.customer-general-column {
  float: left;
  width: 50%;
}

.row:after {
  content: '';
  display: table;
  clear: both;
}

.customer-general-button {
  position: absolute;
  width: 125px;
  height: 35px;
  top: 90%;
  border-radius: 3px;
}

.customer-general-save-button {
  background-color: #ffffff;
  color: #00275e;
  border: 1px solid #00275e;
  left: 73%;
}

.customer-general-save-button:hover {
  color: #ffffff;
  background-color: #00275e;
}

.customer-general-cancel-button {
  background-color: #ffffff;
  color: #ff0000;
  border: 1px solid #ff0000;
  left: 85%;
}

.customer-general-cancel-button:hover {
  color: #ffffff;
  background-color: #ff0000;
}
</style>
