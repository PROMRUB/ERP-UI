<script setup>
const businessStore = useBusinessStore()
</script>

<template>
  <div class="card-content">
    <div class="container">
      <div class="row">
        <div class="quotation-content-column">
          <div class="form-group">
            <div class="form-line">
              <label class="content-input-box-label form-text customer-content" for="taxId"
                >ข้อมูลลูกค้า:</label
              >
              <p class="content-text"></p>
              <br />
              <p class="content-text"></p>
              <br />
              <p class="content-text"></p>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <div class="form-line">
                <label class="content-input-box-label form-text" for="address">ผู้ติดต่อ:</label>
                <span class="content-text"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="business-column">
          <div class="form-group">
            <div class="form-line">
              <label class="content-input-box-label form-text customer-content" for="taxId"
                >เลขที่ใบ:</label
              >
              <p class="content-text" style="margin-top: 1em"></p>
            </div>
            <div class="form-line">
              <label class="content-input-box-label form-text customer-content" for="taxId"
                >วันที่:</label
              >
              <p class="content-text" style="margin-top: 1em"></p>
            </div>
            <div class="form-line">
              <label class="content-input-box-label form-text customer-content" for="taxId"
                >แก้ครั้งที่:</label
              >
              <p class="content-text" style="margin-top: 1em"></p>
            </div>
            <div class="form-line">
              <label class="content-input-box-label form-text customer-content" for="taxId"
                >พนักงานขาย:</label
              >
              <p class="content-text" style="margin-top: 1em"></p>
            </div>
            <div class="form-line">
              <label class="content-input-box-label form-text customer-content" for="taxId"
                >จัดทำโดย:</label
              >
              <p class="content-text" style="margin-top: 1em"></p>
            </div>
            <div class="form-line">
              <label class="content-input-box-label form-text customer-content" for="taxId"
                >สถานะ:</label
              >
              <p class="content-text" style="margin-top: 1em"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="card-content-header">
    <div class="container">
      <div class="row">
        <div class="content-column">
          <div class="form-group">
            <div class="form-line">
              <p class="content-text-header">ชื่อโครงการ</p>
            </div>
          </div>
        </div>
        <div class="content-column">
          <div class="form-group">
            <div class="form-line">
              <p class="content-text-header">สั่งสินค้านาน (วัน)</p>
            </div>
          </div>
        </div>
        <div class="content-column">
          <div class="form-group">
            <div class="form-line">
              <p class="content-text-header">การรับประกัน (เดือน)</p>
            </div>
          </div>
        </div>
        <div class="content-column">
          <div class="form-group">
            <div class="form-line">
              <p class="content-text-header">เงื่อนไขการชำระเงิน</p>
            </div>
          </div>
        </div>
        <div class="content-column">
          <div class="form-group">
            <div class="form-line">
              <p class="content-text-header">เลขที่ใบสั่งสินค้า</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="card-content projet-detail">
    <div class="container">
      <div class="row">
        <div class="content-column">
          <div class="form-group">
            <div class="form-line">
              <p class="content-text"></p>
            </div>
          </div>
        </div>
        <div class="content-column">
          <div class="form-group">
            <div class="form-line">
              <p class="content-text"></p>
            </div>
          </div>
        </div>
        <div class="content-column">
          <div class="form-group">
            <div class="form-line">
              <p class="content-text"></p>
            </div>
          </div>
        </div>
        <div class="content-column">
          <div class="form-group">
            <div class="form-line">
              <p class="content-text"></p>
            </div>
          </div>
        </div>
        <div class="content-column">
          <div class="form-group">
            <div class="form-line">
              <p class="content-text"></p>
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
    async updateComponent() {
      this.$emit('loading')
      let token = sessionStorage.getItem('token')
      if (token == '' || token == undefined || token == null) {
        this.profileStore.isSignIn = false
        this.$router.push('/signin')
      } else {
        this.profileStore.isSignIn = true
        const profileData = await this.profileStore.fetchProfile()
        const businessData = await this.profileStore.fetchBusiness()
        this.$emit('loaded')
      }
    }
  }
}
</script>

<style>
.card-content-header {
  position: absolute !important;
  width: 1400px !important;
  height: 75px !important;
  left: 325px !important;
  top: 475px !important;
  background: #00275e;
  color: #fff;
  font-size: 18px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 0px;
  padding: 1em;
  text-align: center;
  z-index: 4;
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;
}

.card-content {
  position: absolute !important;
  width: 1400px !important;
  height: 280px !important;
  left: 325px !important;
  top: 175px !important;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 10px !important;
}

.projet-detail {
  top: 540px !important;
  height: 90px !important;
}

.customer-content {
  height: 500px;
}

.content-input-box-label {
  display: inline-block;
  width: 100px;
  text-align: right !important;
  margin-right: 10px;
  height: 21px;
  font-style: normal;
  font-size: 16px;
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
  font-style: normal;
  font-size: 20px;
  line-height: 21px;
  color: #00275e;
  order: 0;
  flex-grow: 0;
  z-index: 0;
}

.content-text-header {
  display: inline-block;
  text-align: right !important;
  margin-right: 10px;
  font-style: normal;
  font-size: 20px;
  line-height: 21px;
  color: #fff;
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
  margin-top: 13px;
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
  width: 20%;
}

.quotation-content-column {
  display: inline-block;
  float: left;
  width: 75%;
}

.business-column {
  display: inline-block;
  float: left;
  width: 25%;
}

.row:after {
  content: '';
  display: table;
  clear: both;
}
</style>
