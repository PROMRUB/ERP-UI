<script setup>
const profileStore = useProfileStore()
</script>

<template>
  <main>
    <div class="topnav">
      <a @click="home">
        <img class="logo-image" src="@/assets/logo.png" alt="logo" />
      </a>
      <div id="profile-avatar" class="dropdown split">
        <a>
          <img class="avatar-image" src="@/assets/avatar.png" alt="avatar" />
        </a>
        <div class="dropdown-content">
          <a>Profile</a>
          <a @click="signout">Logout</a>
        </div>
      </div>
      <v-select
        item-value="orgCustomId"
        item-text="orgName"
        label="orgName"
        :options="profileStore.businessList"
        v-model="profileStore.business"
        :value="profileStore.business"
        >businessList</v-select
      >
    </div>
  </main>
</template>

<script>
import { useProfileStore } from '@/stores/ProfileStore'
import { useBusinessStore } from '@/stores/BusinessStore'
import { useCustomerStore } from '@/stores/CustomerStore'

export default {
  components: {},
  data() {
    return {
      isSignIn: false,
      profileStore: useProfileStore(),
      businessStore: useBusinessStore(),
      customerStore: useCustomerStore(),

      disableBusiness: false
    }
  },
  watch: {
    'profileStore.business'(newValue, oldValue) {
      this.onBusinessChange(newValue)
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
      let token = sessionStorage.getItem('token')
      if (token == '' || token == undefined || token == null) {
        this.profileStore.isSignIn = false
        this.$router.push('/signin')
      } else {
        this.profileStore.isSignIn = true
      }
    },
    async onBusinessChange(selectedBusiness) {
      this.profileStore.businessKey = selectedBusiness.orgId
      this.profileStore.businessId = selectedBusiness.orgCustomId
      this.$emit('loading')
      this.$router.push('/home')
      let business = await this.businessStore.fetchBusiness(
        this.profileStore.profile.orgCustomId,
        this.profileStore.businessId
      )
      this.$emit('loaded')
    },
    home() {
      this.$router.push('/home')
    },
    signout() {
      sessionStorage.removeItem('token')
      this.profileStore.isSignIn = false
      this.$emit('loading')
      this.$emit('reactive')
      this.$router.push('/signin')
      this.$emit('loaded')
    }
  }
}
</script>

<style>
.topnav {
  width: 100%;
  height: 68px;
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  background-color: #00275e;
}

.topnav .logo-image {
  margin-top: 4px;
  width: 156px;
  height: 30px;
}

.topnav .avatar-image {
  border-radius: 50%;
  width: 32px;
  height: 32px;
}

.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  cursor: pointer;
}

.topnav #profile-avatar:hover {
  background-color: #fff;
  height: 68px;
}

.topnav div.split {
  margin-right: 100px;
  float: right;
  color: white;
}

.topnav .v-select {
  float: right;
  padding: 6px;
  border: none;
  margin-top: 10px;
  margin-right: 16px;
  width: 500px;
}

.topnav .vs__dropdown-toggle {
  font-size: 17px;
  background-color: white;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  margin-top: 68px;
  display: none;
  position: absolute;
  background-color: #fff;
  width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  width: 160px;
  color: #384577;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #384577;
  height: 50px;
  color: #fff;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
