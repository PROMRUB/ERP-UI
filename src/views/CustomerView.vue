<script setup>
</script>

<template>
  <main>
    <div v-if="!hvData">
      <img class="no-data" src="@/assets/no-data.png" alt="No Data" /><br>
      <div class="no-data-label">
        <span>ขณะนี้ยังไม่มีข้อมูลใดๆของคุณอยู่ในระบบ</span>
      </div>
    </div>
    <div v-if="hvData">
      <div class="row">
        <button class="general-btn" :class="{ active: generalIsActive }" @click="general">
          <span><i class="fa fa-file-text-o fa-lg"></i>ข้อมูลทั่วไป</span>
        </button>
        <button class="address-btn" :class="{ active: addressIsActive }" @click="address">
          <span><i class="fa fa-map-o fa-lg"></i>ที่อยู่</span>
        </button>
      </div>
      <div class="row" v-if="generalIsActive">
        <GeneralInformation />
      </div>
      <div class="row" v-if="addressIsActive">
        <AddressInformation />
      </div>
    </div>
  </main>
</template>

<script>

import GeneralInformation from '@/components/Customer/GeneralInformation.vue'
import AddressInformation from '@/components/Customer/AddressInformation.vue'
import { useProfileStore } from '@/stores/ProfileStore'

export default {
  components: {
    GeneralInformation,
    AddressInformation
  },
  data() {
    return {
      hvData: false,
      generalIsActive: true,
      addressIsActive: false,
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
      let token = sessionStorage.getItem('token');
      if (token == '' || token == undefined || token == null) {
        this.profileStore.isSignIn = false
        this.$router.push('/signin')
      }
      else {
        this.profileStore.isSignIn = true
      }
    },
    general() {
      this.generalIsActive = true
      this.addressIsActive = false
    },
    address() {
      this.generalIsActive = false
      this.addressIsActive = true
    }
  }
};
</script>

<style>
.general-btn {
  position: absolute;
  width: 200px;
  height: 48px;
  left: 350px;
  top: 15%;
  background: #384577;
  border-radius: 4px;
  color: white;
  padding-top: 2px;
  padding-bottom: 12px;
  cursor: pointer;
  text-align: center;
  border: 1px solid #384577;
}

.active {
  background: #00275E;
  border: 1px solid #00275E;
  color: white;
}

.address-btn {
  position: absolute;
  width: 200px;
  height: 48px;
  left: 550px;
  top: 15%;
  background: #384577;
  border-radius: 4px;
  color: white;
  padding-top: 2px;
  padding-bottom: 12px;
  cursor: pointer;
  text-align: center;
  border: 1px solid #384577;
}
</style>
