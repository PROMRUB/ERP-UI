<script setup>
</script>

<template>
  <main>
    <div class="topnav">
      <a>
        <img class="logo-image" src="../assets/logo.png" alt="logo" />
      </a>
      <div id="profile-avatar" class="dropdown split">
        <a>
          <img class="avatar-image" src="../assets/avatar.png" alt="avatar" />
        </a>
        <div class="dropdown-content">
          <a href="#profile">Profile</a>
          <a @click="signout">Logout</a>
        </div>
      </div>
      <v-select class="increasedzindexclass" :options="options">Test</v-select>
    </div>
  </main>
</template>

<script>
import { useProfileStore } from '@/stores/ProfileStore'

export default {
  components: {},
  data() {
    return {
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
      if (
        this.profileStore.token == '' ||
        this.profileStore.token == undefined ||
        this.profileStore.token == null
      ) {
        this.$router.push('/signin')
      } else {
      }
    },
    signout() {
      this.profileStore.token = ''
      this.profileStore.isSignIn = false
      this.$emit('reactive')
      this.$router.push('/signin')
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
  width: 300px;
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
