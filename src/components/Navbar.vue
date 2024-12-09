<script setup>
import { computed, ref } from 'vue';
import Login from './Login.vue';
import { postService } from '../services/PostService';
import Pop from '../utils/Pop';
import { useRouter } from 'vue-router';
import { AuthService } from '@/services/AuthService';
import { AppState } from '../AppState';


const account = computed(() => AppState.account)
const router = useRouter();

const editableSearchData = ref({
  searchQuery: ''
});

async function searchFunction() {
  try {
    await postService.getPostsByQuery(editableSearchData.value.searchQuery);

    router.push({
      name: 'Search',
      query: { search: editableSearchData.value.searchQuery }
    });

    editableSearchData.value.searchQuery = '';
  } catch (error) {
    Pop.error(error);
  }
}

async function logout() {
  AuthService.logout()
}
</script>

<template>
  <nav class="navbar navbar-expand-sm px-3 ">
    <div class="d-flex col-lg-3 col-5 text-center">
      <form @submit.prevent="searchFunction" class="search-bar rounded justify-items-center">
        <input v-model="editableSearchData.searchQuery" type="text" placeholder="Search..." />
        <button type="submit">🔍</button>
      </form>
    </div>
    <div class="col-6 col-lg-7 text-center">
      <router-link class="navbar-brand mx-auto" :to="{ name: 'Home' }">
        <div class="d-flex flex-column align-items-center text-center">
          <h2>The Network</h2>
        </div>
      </router-link>
    </div>
    <div class="col-1 col-lg-2">
      <div v-if="account?.id == null" class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto"></ul>
        <Login />
      </div>
      <div v-else class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto"></ul>
        <button @click="logout" id="buttonStyling" class="btn btn-danger "><i class="mdi mdi-logout"></i></button>
      </div>

    </div>
  </nav>
</template>


<style scoped>
.search-bar input::placeholder {
  color: rgb(67, 75, 84);
  opacity: 1;
}

.navbar .search-bar {
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 5px 10px;
}

.navbar .search-bar input {
  background: none;
  border: none;
  color: white;
  outline: none;
  padding: 5px;
  font-size: 1rem;
}

.navbar .search-bar button {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
}

.navbar .navbar-collapse {
  justify-content: flex-end;
}

nav {
  background: rgb(54, 25, 94);
  background: linear-gradient(90deg, rgba(54, 25, 94, 1) 0%, rgba(137, 91, 209, 1) 19%, rgba(144, 87, 245, 1) 34%, rgba(120, 72, 201, 1) 50%, rgba(81, 5, 196, 1) 73%, rgba(144, 120, 186, 1) 90%);
}

h2 {
  color: #121212;
  text-shadow: 1px 1px black;
}

a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 576px) {
  nav {
    height: 64px;
  }
}
</style>
