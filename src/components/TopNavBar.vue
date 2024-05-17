<script setup>
</script>

<template>
  <main>
    <div class="topnav">
      <a href="#">
        <img class="logo-image" src="../assets/logo.png" alt="logo" />
      </a>
      <a href=" #" class="split" style="margin-top: 3px;">
        <img class="avatar-image" src="../assets/avatar.png" alt="avatar" />
      </a>
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
}

.topnav a:hover {
  background-color: #00275e;
}

.topnav a.split {
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
</style>
