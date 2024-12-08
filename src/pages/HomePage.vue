<script setup>
import { AppState } from '@/AppState';
import NextPage from '@/components/NextPage.vue';
import PostCard from '@/components/PostCard.vue';
import PostForm from '@/components/PostForm.vue';
import { postService } from '@/services/PostService';
import Pop from '@/utils/Pop';
import { computed, onMounted } from 'vue';


onMounted(() => {
  getPosts()
})

const posts = computed(() => AppState.Posts)



async function getPosts() {
  try {
    await postService.getPosts()
  }
  catch (error) {
    Pop.error(error);
  }
}

const account = computed(() => AppState.account)

</script>

<template>
  <div class="row" v-if="account != null">
    <PostForm />
  </div>
  <div v-if="posts.length">
    <section class="row mb-2" v-for="post in posts" :key="post.id">
      <PostCard :post="post" />
    </section>
  </div>
  <div v-else class="mt-4 text-light">
    <h1>Loading Posts... <i class="mdi mdi-loading mdi-spin"></i></h1>
  </div>
  <NextPage />
</template>

<style scoped lang="scss">
button {
  background-color: white;
  color: black;
}
</style>
