<script setup>
</script>

<template>
  <main>
  </main>
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
      let token = sessionStorage.getItem('token');
      if (token == '' || token == undefined || token == null) {
        this.profileStore.isSignIn = false
        this.$router.push('/signin')
      }
      else {
        this.profileStore.isSignIn = true
      }
    }
  }
};
</script>