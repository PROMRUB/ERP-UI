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
      if (this.profileStore.token == '' || this.profileStore.token == undefined || this.profileStore.token == null) {
        this.isSignIn = false;
        this.$router.push('/signin')
      }
      else {
        this.isSignIn = true;
      }
    }
  }
};
</script>