<script setup>
import { RouterView } from 'vue-router'
import pkg from '../package.json'

import TopNavBar from '@/components/Common/TopNavBar.vue'
import SideNavBar from '@/components/Common/SideNavBar.vue'

const profileStore = useProfileStore();

console.log(pkg.version)
</script>

<template>
  <header>
    <TopNavBar v-if="profileStore.isSignIn" @loading="loadingModal" @loaded="loadCancel" />
    <SideNavBar v-if="profileStore.isSignIn" @loading="loadingModal" @loaded="loadCancel" />
  </header>
  <loading v-model:active="isLoading" :can-cancel="true" :on-cancel="loadCancel" :is-full-page="fullPage" />
  <RouterView @reactive="onReactive" @loading="loadingModal" @loaded="loadCancel" />
</template>

<script>

import Loading from 'vue-loading-overlay';
import { useProfileStore } from '@/stores/ProfileStore'
import 'vue-loading-overlay/dist/css/index.css';

export default {
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
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
    },
    loadingModal() {
      this.isLoading = true;
    },
    loadCancel() {
      this.isLoading = false
    }
  }
};
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
