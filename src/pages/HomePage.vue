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
  <section class="row mb-2" v-for="post in posts" v-bind:key="post.id">
    <PostCard :post="post" />
  </section>
  <NextPage />
</template>

<style scoped lang="scss">
button {
  background-color: white;
  color: black;
}
</style>
