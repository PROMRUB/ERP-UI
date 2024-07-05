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
            <label class="customer-contact-modal-input-box-label form-text" for="customerNo"
              >รหัสลูกค้า:</label
            >
            <input
              class="customer-contact-modal-input-box"
              type="text"
              id="customerNo"
              name="customerId"
            />
          </div>
          <div class="form-line">
            <label class="customer-contact-modal-input-box-label form-text" for="taxId"
              >เลขประจำตัวผู้เสียภาษี:</label
            >
            <input class="customer-contact-modal-input-box" type="text" id="taxId" name="taxId" />
          </div>
          <div class="form-line">
            <label class="customer-contact-modal-input-box-label form-text" for="brnId"
              >สาขา:</label
            >
            <input class="customer-contact-modal-input-box" type="text" id="brnId" name="brnId" />
          </div>
          <div class="form-line">
            <label class="customer-contact-modal-input-box-label form-text" for="cusName"
              >ชื่อผู้ประกอบการ:</label
            >
            <input
              class="customer-contact-modal-input-box"
              type="text"
              id="cusName"
              name="cusName"
            />
          </div>
          <div class="form-line">
            <label class="customer-contact-modal-input-box-label form-text" for="displayName"
              >ชื่อสถานประกอบการ:</label
            >
            <input
              class="customer-contact-modal-input-box"
              type="text"
              id="displayName"
              name="displayName"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div v-if="!disableSave" class="customer-contact-modal-column">
        <button class="customer-contact-modal-button customer-contact-modal-save-button" @click="onClickSave">
          <i class="fa fa-floppy-o fa-lg" aria-hidden="true" />บันทึก
        </button>
      </div>
      <div v-if="!disableEdit" class="customer-contact-modal-column">
        <button class="customer-contact-modal-button customer-contact-modal-save-button" @click="onClickEdit">
          <i class="fa fa-pencil fa-lg" aria-hidden="true" />แก้ไข
        </button>
      </div>
      <div v-if="!disableUpdate" class="customer-contact-modal-column">
        <button class="customer-contact-modal-button customer-contact-modal-save-button" @click="onClickUpdate">
          <i class="fa fa-floppy-o fa-lg" aria-hidden="true" />บันทึก
        </button>
      </div>
      <div class="customer-contact-modal-column">
        <button class="customer-contact-modal-button customer-contact-modal-cancel-button" @click="onClickCloseModal">
          <i class="fa fa-times fa-lg" aria-hidden="true" />ยกเลิก
        </button>
      </div>    
    </div>
  </main>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  methods: {
    onClickCloseModal() {
      this.$emit('closeModal')
    },
    onClickSave() {
      this.$emit('saveModal')
    },
    onClickEdit(){
    },
    onClickUpdate(){
        this.$emit('updateModal')
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
