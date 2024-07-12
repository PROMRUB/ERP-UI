<template>
  <div class="product-information-card">
    <div class="container">
      <div class="row">
        <div class="product-information-column">
          <div class="form-group">
            <div class="form-line">
              <label class="product-information-input-box-label form-text" for="cat"
                >กลุ่มสินค้า:</label
              >
              <v-select
                class="product-information-input-box form-input"
                :options="productStore.catList"
                item-value="productCatId"
                item-text="categoryName"
                label="categoryName"
                id="cat"
                name="cat"
                style="
                  display: inline-table;
                  position: absolute;
                  left: 260px;
                  top: 6.1%;
                  z-index: 9998;
                "
                v-model="selectedCat"
                :value="selectedCat"
                :disabled="disableCat"
              ></v-select>
            </div>
            <div class="form-line">
              <label class="product-information-input-box-label form-text" for="subCat"
                >กลุ่มสินค้าย่อย:</label
              >
              <v-select
                class="product-information-input-box form-input"
                :options="subCatFiltered"
                item-value="productCatId"
                item-text="categoryName"
                label="categoryName"
                id="subCat"
                name="subCat"
                style="
                  display: inline-table;
                  position: absolute;
                  left: 260px;
                  top: 14.7%;
                  z-index: 99997;
                "
                v-model="selectedSubCat"
                :value="selectedSubCat"
                :disabled="disableSubCat"
              ></v-select>
            </div>
            <div class="form-line">
              <label class="product-information-input-box-label form-text" for="productCustomId"
                >รหัสสินค้า:</label
              >
              <input
                class="product-information-input-box"
                type="text"
                id="productCustomId"
                name="productCustomId"
                v-model="productStore.productProfile.productCustomId"
                :disabled="disableProductCode"
              />
            </div>
            <div class="form-line">
              <label class="product-information-input-box-label form-text" for="productName"
                >ชื่อสินค้า:</label
              >
              <input
                class="product-information-input-box"
                type="text"
                id="productName"
                name="productName"
                v-model="productStore.productProfile.productName"
                :disabled="disableProductName"
              />
            </div>
            <div class="form-line">
              <label class="product-information-input-box-label form-text" for="msrp"
                >ราคา/หน่วย (บาท):</label
              >
              <input
                class="product-information-input-box"
                type="text"
                id="msrp"
                name="msrp"
                v-model="productStore.productProfile.msrp"
                :disabled="disableMSRP"
              />
            </div>
            <div class="form-line">
              <label class="product-information-input-box-label form-text" for="lwPrice"
                >ราคา/หน่วย ต่ำสุด (บาท):</label
              >
              <input
                class="product-information-input-box"
                type="text"
                id="lwPrice"
                name="lwPrice"
                v-model="productStore.productProfile.lwPrice"
                :disabled="disableLwPrice"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div v-if="!disableSave" class="product-information-column">
          <button class="product-information-button product-information-save-button" @click="save">
            <i class="fa fa-floppy-o fa-lg" aria-hidden="true" />บันทึก
          </button>
        </div>
        <div v-if="!disableUpdate" class="customer-general-column">
          <button
            class="product-information-button product-information-save-button"
            @click="update"
          >
            <i class="fa fa-floppy-o fa-lg" aria-hidden="true" />บันทึก
          </button>
        </div>
        <div class="product-information-column">
          <button
            class="product-information-button product-information-cancel-button"
            @click="back"
          >
            <i class="fa fa-times fa-lg" aria-hidden="true" />ยกเลิก
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductStore } from '@/stores/ProductStore'

export default {
  components: {},
  data() {
    return {
      rendered: false,
      disableCat: false,
      disableSubCat: false,
      disableProductCode: false,
      disableProductName: false,
      disableMSRP: false,
      disableLwPrice: false,
      disableSave: false,
      disableEdit: false,
      disableUpdate: false,

      selectedCat: '',
      selectedSubCat: '',

      subCatFiltered: [],

      productStore: useProductStore()
    }
  },
  emits: ['pageControl'],
  watch: {
    rendered(newValue, oldValue) {},
    selectedCat(newValue, oldValue) {
      if (!(newValue == '' || newValue == undefined || newValue == null)) {
        if (this.productStore.productProfile.productCatId !== newValue.productCatId) {
          this.productStore.productProfile.productCatId = newValue.productCatId
        }
        this.onSelectCat(newValue)
      }
    },
    selectedSubCat(newValue, oldValue) {
      if (!(newValue == '' || newValue == undefined || newValue == null)) {
        if (this.productStore.productProfile.productSubCatId !== newValue.productSubCatId) {
          this.productStore.productProfile.productSubCatId = newValue.productSubCatId
        }
      }
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
      if (sessionStorage.getItem('mode') == 'Entry') {
        this.disableCat = false
        this.disableSubCat = false
        this.disableProductCode = false
        this.disableProductName = false
        this.disableMSRP = false
        this.disableLwPrice = false
        this.disableSave = false
        this.disableEdit = true
        this.disableUpdate = true
        if (sessionStorage.getItem('rendered') == 'false') {
          this.productStore.productProfile.cusType = 'Corporate'
          this.productStore.productProfile.cusNameEng = ''
          this.productStore.productProfile.cusCustomId = ''
          this.productStore.productProfile.taxId = ''
          this.productStore.productProfile.brnId = ''
          this.productStore.productProfile.cusName = ''
          this.productStore.productProfile.displayName = ''
          this.productStore.productProfile.website = ''
          this.productStore.productProfile.building = ''
          this.productStore.productProfile.alley = ''
          this.productStore.productProfile.floor = ''
          this.productStore.productProfile.road = ''
          this.productStore.productProfile.roomNo = ''
          this.productStore.productProfile.village = ''
          this.productStore.productProfile.no = ''
          this.productStore.productProfile.moo = ''
          this.productStore.productProfile.postCode = ''
          this.productStore.productProfile.province = ''
          this.productStore.productProfile.district = ''
          this.productStore.productProfile.subDistrict = ''
          sessionStorage.setItem('rendered', 'true')
        }
      } else if (sessionStorage.getItem('mode') == 'Inquiry') {
        if (
          this.selectedCat == null ||
          this.selectedCat == '' ||
          this.selectedCat == undefined
        ) {
          this.selectedCat = JSON.parse(
            JSON.stringify(this.productStore.catList)
          ).find((catList) => catList.productCatId == this.productStore.productProfile.productCatId)
        }
        if (
          this.selectedSubCat == null ||
          this.selectedSubCat == '' ||
          this.selectedSubCat == undefined
        ) {
          this.selectedSubCat = JSON.parse(
            JSON.stringify(this.productStore.catList)
          ).find((catList) => catList.productCatId == this.productStore.productProfile.productSubCatId)
        }
        this.disableCat = true
        this.disableSubCat = true
        this.disableProductCode = true
        this.disableProductName = true
        this.disableMSRP = true
        this.disableLwPrice = true
        this.disableEdit = false
        this.disableSave = true
        this.disableUpdate = true
      } else if (sessionStorage.getItem('mode') == 'Update') {
        this.disableCat = false
        this.disableSubCat = false
        this.disableProductCode = false
        this.disableProductName = false
        this.disableMSRP = false
        this.disableLwPrice = false
        this.disableSave = true
        this.disableEdit = true
        this.disableUpdate = false
      }
    },
    back() {
      sessionStorage.setItem('rendered', 'false')
      this.$emit(`pageControl`, `productList`)
    },
    save() {
      sessionStorage.setItem('rendered', 'false')
      this.$emit(`saveCustomer`, `save`)
    },
    edit() {
      sessionStorage.setItem('rendered', 'false')
      sessionStorage.setItem('mode', 'Update')
      this.updateComponent()
    },
    update() {
      this.$emit(`saveCustomer`, `update`)
    },
    onSelectCat(value) {
      this.subCatFiltered = JSON.parse(JSON.stringify(this.productStore.catList)).filter(
        (catList) => catList.productCatId == value.productCatId
      )
    }
  }
}
</script>

<style>
.product-information-card {
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

.product-information-input-box-label {
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

.product-information-input-box {
  gap: 0px 58px;
  width: 350px;
  height: 30px;
  font-size: 20px;
  border: none;
  border-bottom: solid 1.5px gray;
}

.product-information-input-box:disabled {
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

.product-information-column {
  float: left;
  width: 50%;
}

.row:after {
  content: '';
  display: table;
  clear: both;
}

.product-information-button {
  position: absolute;
  width: 125px;
  height: 35px;
  top: 90%;
  border-radius: 3px;
}

.product-information-save-button {
  background-color: #ffffff;
  color: #00275e;
  border: 1px solid #00275e;
  left: 73%;
}

.product-information-save-button:hover {
  color: #ffffff;
  background-color: #00275e;
}

.product-information-cancel-button {
  background-color: #ffffff;
  color: #ff0000;
  border: 1px solid #ff0000;
  left: 85%;
}

.product-information-cancel-button:hover {
  color: #ffffff;
  background-color: #ff0000;
}
</style>
