<template>
  <div class="sidenav">
    <a @click="selectMenu('home')"><i class="fa fa-home fa-lg"></i> หน้าแรก</a>
    <a @click="selectMenu('quotation')"><i class="fa fa-file-text fa-lg"></i> ใบเสนอราคา</a>
    <a @click="selectMenu('project')"><i class="fa fa-briefcase fa-lg"></i>โครงการ</a>
    <a @click="selectMenu('customer')"><i class="fa fa-users fa-lg"></i>ลูกค้า</a>
    <a @click="selectMenu('product')"><i class="fa fa-archive fa-lg"></i>สินค้า</a>
    <a @click="selectMenu('payment')"
      ><i class="fa fa-check-square fa-lg"></i> เงื่อนไขการชำระเงิน</a
    >
    <a @click="selectMenu('paymentaccount')"
      ><i class="fa fa-credit-card-alt"></i>บัญชีรับชำระเงิน</a
    >
    <a @click="selectMenu('business')"><i class="fa fa-tags fa-lg"></i>ธุรกิจของฉัน</a>
    <a @click="selectMenu('overview')"><i class="fa fa-picture-o fa-lg"></i>ภาพรวม</a>
    <a @click="download('manual')"><i class="fa fa-file fa-lg"></i> คู่มือ</a>
  </div>
</template>

<script>
import { useProfileStore } from '@/stores/ProfileStore'

export default {
  components: {},
  data() {
    return {
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
        this.$emit('loading')
        this.profileStore.isSignIn = false
        this.$router.push('/signin')
        this.$emit('loaded')
      } else {
        this.profileStore.isSignIn = true
        this.$emit('loaded')
      }
    },
    selectMenu(key) {
      if(key == 'quotation')
      {
        window.open(import.meta.env.VITE_REACT_URL)
      }
      else{
        this.$router.push('/' + key)
    }
    },
    download() {
      window.open('https://drive.google.com/file/d/1XyNw0J1lyUV_ubEJ6WGcb8NYJgu-pnRs/view')
    }
  }
}
</script>

<style>
.fa {
  padding-right: 10px;
}

.sidenav {
  height: 100%;
  width: 240px;
  position: fixed;
  z-index: 1;
  top: 68px;
  left: 0;
  background-color: #fff;
  overflow-x: hidden;
  padding-top: 50px;
}

.sidenav a {
  padding: 14px 8px 14px 16px;
  text-decoration: none;
  font-size: 16px;
  color: #00275e;
  display: block;
  align-items: center;
}

.sidenav a i {
  margin-right: 8px;
  /* Space between the icon and the text */
}

.sidenav a:hover {
  color: #fff;
  background-color: #00275e;
  cursor: pointer;
}

.main {
  margin-left: 160px;
  /* Same as the width of the sidenav */
  font-size: 28px;
  /* Increased text to enable scrolling */
  padding: 0px 10px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }

  .sidenav a {
    font-size: 18px;
  }
}
</style>
