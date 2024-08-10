<script setup>
const businessStore = useBusinessStore()
</script>

<template>
  <div class="business-card-content-header">
    <span> ธุรกิจของฉัน </span>
  </div>
  <div class="business-card-content">
    <div class="container">
      <div class="row">
        <div class="content-column">
          <div class="form-group">
            <div class="business-form-line">
              <label class="business-content-input-box-label business-content-form-text" for="taxId"
                >เลขประจำตัวผู้เสียภาษี:</label
              >
              <span class="business-content-text">{{ businessStore.business.taxId }}</span>
            </div>
            <div class="business-form-line">
              <label class="business-content-input-box-label business-content-form-text" for="brnId"
                >สาขาที่:</label
              >
              <span class="business-content-text">{{ businessStore.business.brnId }}</span>
            </div>
            <div class="business-form-line">
              <label
                class="business-content-input-box-label business-content-form-text"
                for="orgName"
                >ชื่อผู้ประกอบการ:</label
              >
              <span class="business-content-text">{{ businessStore.business.orgName }}</span>
            </div>
            <div class="business-form-line">
              <label
                class="business-content-input-box-label business-content-form-text"
                for="address"
                >ที่อยู่:</label
              >
              <span class="business-content-text">{{ businessStore.business.orgAddress }}</span>
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
.business-card-content-header {
  position: absolute;
  width: 1400px;
  height: 80px;
  left: 325px;
  top: 100px;
  background: #00275e;
  color: #fff;
  font-size: 24px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 0px;
  padding: 1em;
  text-align: center;
  z-index: 4;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
}

.business-card-content {
  position: absolute;
  width: 1400px;
  height: 648px;
  left: 325px;
  top: 175px;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 0px;
  padding: 2em;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
}

.business-content-input-box-label {
  display: inline-block;
  width: 250px;
  text-align: right;
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

.business-content-text {
  display: inline-block;
  text-align: right;
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

.business-form-line {
  margin-top: 26px;
}

.business-content-form-text {
  left: 0%;
  right: 81.74%;
  top: 0%;
  bottom: 19.23%;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  text-align: right;
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
