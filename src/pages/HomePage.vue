<script setup>
import { AppState } from '@/AppState';
import Navbar from '@/components/Navbar.vue';
import { AuthService } from '@/services/AuthService';
import { computed } from 'vue';

const account = computed(() => AppState.account)

const accountClass = computed(() => (account.value ? 'col-10' : 'col-12'))

async function logout() {
  AuthService.logout()
}

</script>

<template>

  <body class="container-fluid">
    <section class="row d-flex">
      <div v-if="account != null" class="col-md-2 d-flex flex-column" id="AccountSection">
        <div class="rounded p-2">
          <img :src="account?.picture" alt="" class="pfp-Image">
          <h4 class="fw-bold">{{ account?.name }}</h4>
          <hr>
        </div>
        <div class="row justify-content-around d-flex mt-auto mb-2">
          <router-link class="col-md-9 btn btn-dark text-light mx-1" :to="{ name: 'Account' }">
            Manage Account
          </router-link>
          <button @click="logout" class="col-md-2 btn btn-danger mx-1"><i class="mdi mdi-logout"></i></button>
        </div>
      </div>
      <div :class="accountClass" id="navBar">
        <Navbar />
      </div>
    </section>
  </body>
</template>

<style scoped lang="scss">
#AccountSection {
  min-height: 100dvh;
  text-align: center;
  justify-content: center;
  align-content: center;
  height: 100%;
  background-color: white
}


.pfp-Image {
  border-radius: 50%;
  height: 5em;
  aspect-ratio: 1/1;
  margin: 0.75em;
}

.manageAccount {
  background: rgb(54, 25, 94);
  background: linear-gradient(90deg, rgba(54, 25, 94, 1) 0%, rgba(137, 91, 209, 1) 19%, rgba(144, 87, 245, 1) 34%, rgba(120, 72, 201, 1) 50%, rgba(81, 5, 196, 1) 73%, rgba(144, 120, 186, 1) 90%);
}

#navBar {
  padding: 0;
}
</style>
