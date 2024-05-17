<script setup>
const profileStore = useProfileStore()
</script>

<template>
  <main>
    <div class="topnav">
      <a href="#" style="font-size: 38px; margin-top: 10px">PROMPT ERP</a>
      <a href="#" class="split">
        <span style="font-size: 24px; text-align: right">{{ profileStore.name }}</span>
        <br />
        <span style="text-align: right">{{ profileStore.role }}</span>
      </a>
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
        this.isSignIn = false
        this.$router.push('/SignIn')
      } else {
        this.isSignIn = true
      }
    }
  }
}
</script>

<style>
.topnav {
  background-color: #000;
  width: 100%;
  height: 100px;
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  right: 0;
  background-color: #00275e;
  overflow: hidden;
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

.dropdown {
  float: left;
  overflow: hidden;
}

.dropdown .dropbtn {
  font-size: 16px;
  border: none;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
