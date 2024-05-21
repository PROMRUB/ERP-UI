<script setup>
const businessStore = useBusinessStore()
</script>

<template>
  <div class="card-content-header">
    <span> ธุรกิจของฉัน </span>
  </div>
  <div class="card-content">
    <div class="container">
      <div class="row">
        <div class="content-column">
          <div class="form-group">
            <div class="form-line">
              <label class="content-input-box-label form-text" for="taxId"
                >เลขประจำตัวผู้เสียภาษี:</label
              >
              <span class="content-text">{{ businessStore.business.taxId }}</span>
            </div>
            <div class="form-line">
              <label class="content-input-box-label form-text" for="brnId">สาขาที่:</label>
              <span class="content-text">{{ businessStore.business.brnId }}</span>
            </div>
            <div class="form-line">
              <label class="content-input-box-label form-text" for="orgName"
                >ชื่อผู้ประกอบการ:</label
              >
              <span class="content-text">{{ businessStore.business.orgName }}</span>
            </div>
            <div class="form-line">
              <label class="content-input-box-label form-text" for="address">ที่อยู่:</label>
              <span class="content-text">{{ businessStore.business.orgAddress }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useProfileStore } from '@/stores/ProfileStore'
import { useBusinessStore } from '@/stores/BusinessStore'

export default {
  components: {},
  data() {
    return {
      isSignIn: false,
      profileStore: useProfileStore(),
      businessStore: useBusinessStore()
    }
  },
  mounted() {
    this.updateComponent()
  },
  updated() {
    this.updateComponent()
  },
  methods: {
    updateComponent() {
      let token = sessionStorage.getItem('token')
      if (token == '' || token == undefined || token == null) {
        this.profileStore.isSignIn = false
        this.$router.push('/signin')
      } else {
        this.profileStore.isSignIn = true
      }
    }
  }
}
</script>

<style>
.card-content-header {
  position: absolute !important;
  width: 1400px !important;
  height: 80px !important;
  left: 325px !important;
  top: 100px !important;
  background: #00275e;
  color: #fff;
  font-size: 24px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 0px;
  padding: 1em;
  text-align: center;
  z-index: 4;
  border-top-left-radius: 50px !important;
  border-top-right-radius: 50px !important;
}

.card-content {
  position: absolute !important;
  width: 1400px !important;
  height: 648px !important;
  left: 325px !important;
  top: 175px !important;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 0px;
  padding: 2em;
  border-bottom-left-radius: 50px !important;
  border-bottom-right-radius: 50px !important;
}

.content-input-box-label {
  display: inline-block;
  width: 250px;
  text-align: right !important;
  margin-right: 10px;
  height: 21px;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 21px;
  color: #00275e;
  order: 0;
  flex-grow: 0;
  z-index: 0;
}

.content-text {
  display: inline-block;
  text-align: right !important;
  margin-right: 10px;
  height: 21px;
  font-style: normal;
  font-size: 20px;
  line-height: 21px;
  color: #00275e;
  order: 0;
  flex-grow: 0;
  z-index: 0;
}

.input-box {
  display: inline-block;
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

.content-form-text {
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

.content-column {
  display: inline-block;
  float: left;
  width: 100%;
}

.row:after {
  content: '';
  display: table;
  clear: both;
}
</style>
