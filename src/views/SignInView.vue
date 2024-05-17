<template>
  <div class="about card">
    <div class="container">
      <div class="row">
        <div class="form-group">
          <div class="form-line">
            <label class="input-box-label form-text" for="taxId">ชื่อผู้เข้าใช้</label>
            <input class="input-box form-input" type="text" id="taxId" name="customerId">
          </div>
          <div class="form-line">
            <label class="input-box-label form-text" for="taxId">รหัสผ่าน</label>
            <input class="input-box form-input" type="password" id="taxId" name="taxId">
          </div>
        </div>
      </div>
      <hr style="margin:5% 60px 0px 60px;opacity: 50%" />
      <div class="row">
        <div class="save-btn" @click="signIn">
          <span class="">เข้าสู่ระบบ</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { useProfileStore } from '@/stores/ProfileStore'

export default {
  components: {
  },
  data() {
    return {
      isSignIn: false,
      profileStore: useProfileStore()
    };
  },
  mounted() {
    this.updateComponent()
  },
  updated() {
    this.updateComponent()
  },
  methods: {
    updateComponent() {
      if (this.profileStore.token == '' || this.profileStore.token == undefined || this.profileStore.token == null) {
        this.profileStore.isSignIn = false;
        this.$router.push('/signin')
      }
      else {
        this.profileStore.isSignIn = true;
      }
    },
    signIn() {
      this.profileStore.token = 'AAA'
      this.profileStore.isSignIn = true
      this.$emit('reactive');
      this.$router.push('/home')
    }
  }
};
</script>

<style>
.card {
  position: absolute;
  width: 600px;
  height: 448px;
  left: 35%;
  top: 25%;
  background: #FFFFFF;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 2em;
}

.input-box-label {
  display: inline-block;
  width: 200px;
  text-align: right;
  margin-right: 10px;
  height: 21px;
  font-family: 'Kanit';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: #231F20;
  order: 0;
  flex-grow: 0;
  z-index: 0;
}

.input-box {
  padding: 20px;
  gap: 0px 58px;
  width: 100px;
  height: 30px;
  left: 60px;
  top: 0px;
  flex: none;
  order: 2;
  flex-grow: 0;
  z-index: 2;
  font-size: 24px;
}

.card-header {
  width: 100%;
  height: 48px;
  left: 288px;
  top: 183px;
  background: #00275E;
  border-radius: 4px 4px 0px 0px;
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
  font-family: 'Kanit';
  font-style: normal;
  font-weight: 700;
  font-size: 18x;
  line-height: 21px;
  text-align: left;
  color: #231F20;
}

.form-input {
  margin: 3% 0px 0px 5%;
  border: none;
  border-bottom: 1px solid #00275E;
  width: 450px;
}

.row {
  display: flex;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

.save-btn {
  position: absolute;
  width: 500px;
  height: 48px;
  left: 8%;
  top: 76%;
  background: #00275E;
  border-radius: 4px;
  color: white;
  padding: 12px 0px 10px 220px;
}
</style>
