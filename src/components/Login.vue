<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { AuthService } from '../services/AuthService.js';

const identity = computed(() => AppState.identity)
async function login() {
  AuthService.loginWithPopup()
}

</script>

<template>
  <span class="navbar-text">
    <button class="btn btn-dark selectable text-light lighten-30 text-uppercase my-2 my-lg-0" @click="login"
      v-if="!identity">
      Login
    </button>
  </span>
</template>

<style lang="scss" scoped></style>
