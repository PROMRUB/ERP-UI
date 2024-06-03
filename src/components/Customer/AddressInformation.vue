<template>
  <div class="about card">
    <div class="container">
      <div class="row">
        <div class="column">
          <div class="form-group">
            <div class="form-line">
              <label class="customer-address-input-box-label form-text" for="building"
                >อาคาร:</label
              >
              <input
                class="customer-address-input-box form-input"
                type="text"
                id="building"
                name="building"
                v-model="customerStore.customerProfile.building"
                :disabled="disableBuilding"
              />
            </div>
            <div class="form-line">
              <label class="customer-address-input-box-label form-text" for="floor">ชั้นที่:</label>
              <input
                class="customer-address-input-box form-input"
                type="text"
                id="floor"
                name="floor"
                v-model="customerStore.customerProfile.floor"
                :disabled="disableFloor"
              />
            </div>
            <div class="form-line">
              <label class="customer-address-input-box-label form-text" for="roomNo"
                >ห้องเลขที่:</label
              >
              <input
                class="customer-address-input-box form-input"
                type="text"
                id="roomNo"
                name="roomNo"
                v-model="customerStore.customerProfile.roomNo"
                :disabled="disableRoomNo"
              />
            </div>
            <div class="form-line">
              <label class="customer-address-input-box-label form-text" for="village"
                >หมู่บ้าน:</label
              >
              <input
                class="customer-address-input-box form-input"
                type="text"
                id="village"
                name="village"
                v-model="customerStore.customerProfile.village"
                :disabled="disableVillage"
              />
            </div>
            <div class="form-line">
              <label class="customer-address-input-box-label form-text" for="no">เลขที่:</label>
              <input
                class="customer-address-input-box form-input"
                type="text"
                id="no"
                name="no"
                v-model="customerStore.customerProfile.no"
                :disabled="disableNo"
              />
            </div>
            <div class="form-line">
              <label class="customer-address-input-box-label form-text" for="moo">หมู่ที่:</label>
              <input
                class="customer-address-input-box form-input"
                type="text"
                id="moo"
                name="moo"
                v-model="customerStore.customerProfile.moo"
                :disabled="disableMoo"
              />
            </div>
          </div>
        </div>
        <div class="column">
          <div class="form-group">
            <div class="form-line">
              <label class="customer-address-input-box-label form-text" for="alley"
                >ตรอก/ซอย:</label
              >
              <input
                class="customer-address-input-box form-input"
                type="alley"
                id="alley"
                name="alley"
                v-model="customerStore.customerProfile.alley"
                :disabled="disableAlley"
              />
            </div>
            <div class="form-line">
              <label class="customer-address-input-box-label form-text" for="road">ถนน:</label>
              <input
                class="customer-address-input-box form-input"
                type="text"
                id="road"
                name="road"
                v-model="customerStore.customerProfile.road"
                :disabled="disableRoad"
              />
            </div>
            <div class="form-line">
              <label
                class="customer-address-input-box-label form-text"
                for="taxId"
                style="padding-top: 3px"
                >จังหวัด:</label
              >
              <v-select
                class="customer-address-input-box form-input"
                :options="systemConfigStore.provinceList"
                item-value="provinceCode"
                item-text="provinceName"
                label="provinceName"
                id="province"
                name="province"
                style="
                  display: inline-table;
                  position: absolute;
                  left: 805px;
                  top: 26.15%;
                  z-index: 99999;
                "
                v-model="selectedProvince"
                :value="selectedProvince"
                :disabled="disableProvince"
              ></v-select>
            </div>
            <div class="form-line">
              <label
                class="customer-address-input-box-label form-text"
                for="taxId"
                style="padding-top: 8px"
                >อำเภอ/เขต:</label
              >
              <v-select
                class="customer-address-input-box form-input"
                :options="districtFiltered"
                item-value="districtCode"
                item-text="districtName"
                label="districtName"
                id="district"
                name="district"
                style="
                  display: inline-table;
                  position: absolute;
                  left: 805px;
                  top: 35.25%;
                  z-index: 99998;
                "
                v-model="selectedDistrict"
                :value="selectedDistrict"
                :disabled="disableProvince"
              ></v-select>
            </div>
            <div class="form-line">
              <label
                class="customer-address-input-box-label form-text"
                for="subDistrict"
                style="padding-top: 10px"
                >ตำบล/แขวง:</label
              >
              <v-select
                class="customer-address-input-box form-input"
                :options="subDistrictFiltered"
                item-value="subDistrictCode"
                item-text="subDistrictName"
                label="subDistrictName"
                id="subDistrict"
                name="subDistrict"
                style="
                  display: inline-table;
                  position: absolute;
                  left: 805px;
                  top: 44.75%;
                  z-index: 99997;
                "
                v-model="selectedSubDistrct"
                :value="selectedSubDistrct"
                :disabled="disableSubDistrict"
              ></v-select>
            </div>
            <div class="form-line">
              <label
                class="customer-address-input-box-label form-text"
                for="postCode"
                style="padding-top: 12px"
                >รหัสไปรษณี:</label
              >
              <input
                class="customer-address-input-box form-input"
                type="text"
                id="postCode"
                name="postCode"
                style="padding-top: 12px"
                v-model="customerStore.customerProfile.postCode"
                :disabled="disablePostCode"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="customer-general-column">
        <button
          v-if="!disableSave"
          class="customer-address-button customer-address-save-button"
          @click="save"
        >
          <i class="fa fa-floppy-o fa-lg" aria-hidden="true" />บันทึก
        </button>
      </div>
      <div class="customer-general-column">
        <button class="customer-address-button customer-address-cancel-button" @click="back">
          <i class="fa fa-times fa-lg" aria-hidden="true" />ยกเลิก
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useProfileStore } from '@/stores/ProfileStore'
import { useCustomerStore } from '@/stores/CustomerStore'
import { useSystemConfigStore } from '@/stores/SystemConfigStore'

export default {
  components: {},
  data() {
    return {
      disableBuilding: false,
      disableAlley: false,
      disableFloor: false,
      disableRoad: false,
      disableRoomNo: false,
      disableProvince: false,
      disableVillage: false,
      disableDistrict: false,
      disableNo: false,
      disableSubDistrict: false,
      disableMoo: false,
      disablePostCode: false,
      disableSave: false,

      selectedProvince: '',
      selectedDistrict: '',
      selectedSubDistrct: '',

      districtFiltered: [],
      subDistrictFiltered: [],

      profileStore: useProfileStore(),
      systemConfigStore: useSystemConfigStore(),
      customerStore: useCustomerStore()
    }
  },
  watch: {
    selectedProvince(newValue, oldValue) {
      if (this.customerStore.customerProfile.province !== newValue.provinceCode) {
        this.customerStore.customerProfile.province = newValue.provinceCode
        this.onSelectProvince(newValue)
      }
    },
    selectedDistrict(newValue, oldValue) {
      if (this.customerStore.customerProfile.district !== newValue.districtCode) {
        this.customerStore.customerProfile.district = newValue.districtCode
        this.onSelectDistrict(newValue)
      }
    },
    selectedSubDistrict(newValue, oldValue) {
      if (this.customerStore.customerProfile.subDistrict !== newValue.subDistrictCode) {
        this.customerStore.customerProfile.subDistrict = newValue.subDistrictCode
        this.onSelectSubDistrict(newValue)
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
        this.disableBuilding = false
        this.disableAlley = false
        this.disableFloor = false
        this.disableRoad = false
        this.disableRoomNo = false
        this.disableProvince = false
        this.disableVillage = false
        this.disableDistrict = true
        this.disableNo = false
        this.disableSubDistrict = true
        this.disableMoo = false
        this.disablePostCode = false
        this.disableSave = false
        this.customerStore.customerProfile.building = ''
        this.customerStore.customerProfile.alley = ''
        this.customerStore.customerProfile.floor = ''
        this.customerStore.customerProfile.road = ''
        this.customerStore.customerProfile.roomNo = ''
        this.customerStore.customerProfile.village = ''
        this.customerStore.customerProfile.no = ''
        this.customerStore.customerProfile.moo = ''
        this.customerStore.customerProfile.postCode = ''
      }
      if (sessionStorage.getItem('mode') == 'Inquiry') {
        if (
          this.selectedProvince == null ||
          this.selectedProvince == '' ||
          this.selectedProvince == undefined
        ) {
          this.selectedProvince = JSON.parse(
            JSON.stringify(this.systemConfigStore.provinceList)
          ).find((province) => province.provinceCode == this.customerStore.customerProfile.province)
          this.selectedDistrict = JSON.parse(
            JSON.stringify(this.systemConfigStore.distrcitList)
          ).find((district) => district.districtCode == this.customerStore.customerProfile.district)
          this.selectedSubDistrct = JSON.parse(
            JSON.stringify(this.systemConfigStore.subDistrictList)
          ).find(
            (subDistrict) =>
              subDistrict.subDistrictCode == this.customerStore.customerProfile.subDistrict
          )
        }
        this.disableBuilding = true
        this.disableAlley = true
        this.disableFloor = true
        this.disableRoad = true
        this.disableRoomNo = true
        this.disableProvince = true
        this.disableVillage = true
        this.disableDistrict = true
        this.disableNo = true
        this.disableSubDistrict = true
        this.disableMoo = true
        this.disablePostCode = true
        this.disableSave = true
      }
      if (sessionStorage.getItem('mode') == 'Update') {
        this.disableBuilding = false
        this.disableAlley = false
        this.disableFloor = false
        this.disableRoad = false
        this.disableRoomNo = false
        this.disableProvince = false
        this.disableVillage = false
        this.disableDistrict = false
        this.disableNo = false
        this.disableSubDistrict = false
        this.disableMoo = false
        this.disablePostCode = false
        this.disableSave = false
      }
    },
    back() {
      this.$emit(`pageControl`, `customerList`)
    },
    save() {
      this.$emit(`saveCustomer`, `save`)
    },
    onSelectProvince(value) {
      this.disableDistrict = false
      this.districtFiltered = JSON.parse(
        JSON.stringify(this.systemConfigStore.distrcitList)
      ).filter((district) => district.provinceCode == value.provinceCode)
    },
    onSelectDistrict(value) {
      this.disableSubDistrict = false
      this.subDistrictFiltered = JSON.parse(
        JSON.stringify(this.systemConfigStore.subDistrictList)
      ).filter((subDistrict) => subDistrict.districtCode == value.districtCode)
    }
  }
}
</script>

<style>
.card {
  position: absolute;
  width: 1300px;
  height: 648px;
  left: 350px;
  top: 175px;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 0px;
  padding: 2em;
}

.customer-address-input-box-label {
  display: inline-block;
  width: 125px;
  text-align: right;
  margin-right: 10px;
  height: 21px;
  font-family: 'Kanit';
  font-style: normal;
  font-weight: 700;
  line-height: 21px;
  color: #231f20;
  order: 0;
  flex-grow: 0;
  z-index: 0;
  height: 30px;
}

.customer-address-input-box {
  gap: 0px 58px;
  width: 159px;
  height: 30px;
  left: 60px;
  top: 0px;
  flex: none;
  order: 2;
  flex-grow: 0;
  z-index: 2;
  font-size: 20px;
}

.input-box:focus {
  outline: none;
}

.customer-address-input-box:disabled {
  background-color: #ffffff;
  border-bottom: none;
}

.vs__dropdown-toggle,
.vs--disabled .vs__dropdown-toggle,
.vs--disabled .vs__clear,
.vs--disabled .vs__search,
.vs--disabled .vs__selected,
.vs--disabled .vs__open-indicator {
  border: none;
  background-color: none;
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
}

.form-line {
  margin-top: 26px;
}

.form-text {
  left: 0%;
  right: 81.74%;
  top: 0%;
  bottom: 19.23%;
  font-family: 'Kanit';
  font-style: normal;
  font-weight: 700;
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

.column {
  float: left;
  width: 50%;
}

.row:after {
  content: '';
  display: table;
  clear: both;
}

.customer-address-button {
  position: absolute;
  width: 125px;
  height: 35px;
  top: 90%;
  border-radius: 3px;
}

.customer-address-save-button {
  background-color: #ffffff;
  color: #00275e;
  border: 1px solid #00275e;
  left: 73%;
}

.customer-address-save-button:hover {
  color: #ffffff;
  background-color: #00275e;
}

.customer-address-cancel-button {
  background-color: #ffffff;
  color: #ff0000;
  border: 1px solid #ff0000;
  left: 85%;
}

.customer-address-cancel-button:hover {
  color: #ffffff;
  background-color: #ff0000;
}
</style>
