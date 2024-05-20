<template>
  <div class="about card">
    <div class="container">
      <div class="row">
        <div class="form-group">
          <div class="form-line">
            <label class="input-box-label form-text" for="taxId">ชื่อผู้เข้าใช้</label>
            <input
              class="input-box form-input"
              type="text"
              id="taxId"
              name="customerId"
              v-model="username"
              require
            />
          </div>
          <div class="form-line">
            <label class="input-box-label form-text" for="taxId">รหัสผ่าน</label>
            <input
              class="input-box form-input"
              type="password"
              id="taxId"
              name="taxId"
              v-model="password"
              require
            />
          </div>
        </div>
      </div>
      <hr style="margin: 5% 60px 0px 60px; opacity: 50%" />
      <div class="row">
        <a class="save-btn" @click="signIn">
          <span class="">เข้าสู่ระบบ</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { useProfileStore } from '@/stores/ProfileStore'

export default {
  components: {},
  data() {
    return {
      errors: '',
      username: '',
      password: '',
      isSignIn: false,
      profileStore: useProfileStore()
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
        this.$emit('loaded')
      } else {
        this.profileStore.isSignIn = true
        let profileData = this.profileStore.fetchProfile()
      }
    },
    async signIn() {
      this.errors = []
      if (!this.username) this.errors.push('Username required.')
      if (!this.password) this.errors.push('Password required.')

      if (this.errors.length > 0) {
        this.errors.forEach((element) => {
          alert(element)
        })
      } else {
        this.$emit('loading')
        const payload = {
          username: this.username,
          password: this.password
        }
        const response = await this.profileStore.signIn(payload)
        if (!response) {
          alert('เข้าสู่ระบบไม่สำเร็จ')
        } else {
          sessionStorage.setItem('token', response)
          this.profileStore.isSignIn = true
          this.$emit('reactive')
          this.$router.push('/home')
        }
      }
    }
  }
}
</script>

<style>
.card {
  position: absolute;
  width: 600px;
  height: 448px;
  left: 35%;
  top: 25%;
  background: #ffffff;
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
  color: #231f20;
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
  background: #00275e;
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
  color: #231f20;
}

.form-input {
  margin: 3% 0px 0px 5%;
  border: none;
  border-bottom: 1px solid #00275e;
  width: 450px;
}

.row {
  display: flex;
}

.row:after {
  content: '';
  display: table;
  clear: both;
}

.save-btn {
  position: absolute;
  width: 500px;
  height: 48px;
  left: 8%;
  top: 76%;
  background: #00275e;
  border-radius: 4px;
  color: white;
  padding: 12px 0px 10px 220px;
}

.save-btn:hover {
  background: #00275e;
  color: white;
  cursor: pointer;
}
</style>
