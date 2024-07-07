<script setup></script>

<template>
  <main>
    <img
      @click="onClickCloseModal"
      class="contact-close-modal-icon"
      src="../../assets/close-modal-icon.svg"
      alt="Close Modal Icon"
    />
    <div class="row">
      <div class="customer-contact-modal-column" style="margin-top: 20px">
        <div class="form-group">
          <div class="form-line">
            <label class="customer-contact-modal-input-box-label form-text" for="cusConFirstname"
              >ชื่อ:</label
            >
            <input
              class="customer-contact-modal-input-box"
              type="text"
              id="cusConFirstname"
              name="cusConFirstname"
              v-model="customerStore.contactProfile.cusConFirstname"
              :disabled="disableCusconFirstname"
            />
          </div>
          <div class="form-line">
            <label class="customer-contact-modal-input-box-label form-text" for="cusConLastname"
              >นามสกุล:</label
            >
            <input
              class="customer-contact-modal-input-box"
              type="text"
              id="cusConLastname"
              name="cusConLastname"
              v-model="customerStore.contactProfile.cusConLastname"
              :disabled="disableCusConLastname"
            />
          </div>
          <div class="form-line">
            <label class="customer-contact-modal-input-box-label form-text" for="telNo"
              >เบอร์โทรศัพท์:</label
            >
            <input
              class="customer-contact-modal-input-box"
              type="text"
              id="telNo"
              name="telNo"
              v-model="customerStore.contactProfile.telNo"
              :disabled="disableTelNo"
            />
          </div>
          <div class="form-line">
            <label class="customer-contact-modal-input-box-label form-text" for="mobileNo"
              >มือถือ:</label
            >
            <input
              class="customer-contact-modal-input-box"
              type="text"
              id="mobileNo"
              name="mobileNo"
              v-model="customerStore.contactProfile.mobileNo"
              :disabled="disableMobileNo"
            />
          </div>
          <div class="form-line">
            <label class="customer-contact-modal-input-box-label form-text" for="email"
              >E-Mail:</label
            >
            <input
              class="customer-contact-modal-input-box"
              type="text"
              id="email"
              name="email"
              v-model="customerStore.contactProfile.email"
              :disabled="disableEmail"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div v-if="!disableSave" class="customer-contact-modal-column">
        <button
          class="customer-contact-modal-button customer-contact-modal-save-button"
          @click="onClickSave"
        >
          <i class="fa fa-floppy-o fa-lg" aria-hidden="true" />บันทึก
        </button>
      </div>
      <div v-if="!disableEdit" class="customer-contact-modal-column">
        <button
          class="customer-contact-modal-button customer-contact-modal-save-button"
          @click="onClickEdit"
        >
          <i class="fa fa-pencil fa-lg" aria-hidden="true" />แก้ไข
        </button>
      </div>
      <div v-if="!disableUpdate" class="customer-contact-modal-column">
        <button
          class="customer-contact-modal-button customer-contact-modal-save-button"
          @click="onClickUpdate"
        >
          <i class="fa fa-floppy-o fa-lg" aria-hidden="true" />บันทึก
        </button>
      </div>
      <div class="customer-contact-modal-column">
        <button
          class="customer-contact-modal-button customer-contact-modal-cancel-button"
          @click="onClickCloseModal"
        >
          <i class="fa fa-times fa-lg" aria-hidden="true" />ปิด
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import { useCustomerStore } from '@/stores/CustomerStore'

export default {
  components: {},
  data() {
    return {
      rendered: false,
      disableCusconFirstname: false,
      disableCusConLastname: false,
      disableTelNo: false,
      disableMobileNo: false,
      disableEmail: false,
      disableSave: false,
      disableEdit: false,
      disableUpdate: false,
      customerStore: useCustomerStore()
    }
  },
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
      if (sessionStorage.getItem('mode') == 'Inquiry') {
        this.disableCusconFirstname = true
        this.disableCusConLastname = true
        this.disableTelNo = true
        this.disableMobileNo = true
        this.disableEmail = true
        this.disableSave = true
        this.disableEdit = true
        this.disableUpdate = true
      }
      if (sessionStorage.getItem('mode') == 'Update') {
        this.disableCusconFirstname = false
        this.disableCusConLastname = false
        this.disableTelNo = false
        this.disableMobileNo = false
        this.disableEmail = false
        if (sessionStorage.getItem('modalMode') == `Entry`) {
          this.disableSave = false
          this.disableEdit = true
          this.disableUpdate = true
        } else if (sessionStorage.getItem('modalMode') == `Inquiry`) {
          this.disableSave = true
          this.disableEdit = false
          this.disableUpdate = true
        } else if (sessionStorage.getItem('modalMode') == `Update`) {
          this.disableSave = true
          this.disableEdit = true
          this.disableUpdate = false
        }
      }
    },
    onClickCloseModal() {
      this.rendered = !this.rendered
      this.customerStore.contactProfile = {}
      this.$emit('closeModal')
    },
    onClickSave() {
      this.$emit('saveModal', 'Save')
    },
    onClickEdit() {},
    onClickUpdate() {
      this.$emit('saveModal', 'Update')
    }
  }
}
</script>
<style>
.customer-contact-modal-input-box-label {
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

.customer-contact-modal-input-box {
  gap: 0px 58px;
  width: 350px;
  height: 30px;
  font-size: 20px;
  border: none;
  border-bottom: solid 1.5px gray;
}

.customer-contact-modal-input-box:disabled {
  background-color: #ffffff;
  border-bottom: none;
}

.input-box:focus {
  outline: none;
}

.input-box:disabled {
  background-color: #fff;
}

.customer-contact-modal-card-header {
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

.customer-contact-modal-column {
  float: left;
  width: 100%;
}

.row:after {
  content: '';
  display: table;
  clear: both;
}

.customer-contact-modal-button {
  position: absolute;
  width: 125px;
  height: 35px;
  top: 87%;
  border-radius: 3px;
}

.customer-contact-modal-save-button {
  background-color: #ffffff;
  color: #00275e;
  border: 1px solid #00275e;
  left: 65%;
}

.customer-contact-modal-save-button:hover {
  color: #ffffff;
  background-color: #00275e;
}

.customer-contact-modal-cancel-button {
  background-color: #ffffff;
  color: #ff0000;
  border: 1px solid #ff0000;
  left: 82%;
}

.customer-contact-modal-cancel-button:hover {
  color: #ffffff;
  background-color: #ff0000;
}
</style>
