<script setup>
import { AppState } from '@/AppState';
import PostCard from '@/components/PostCard.vue';
import PostForm from '@/components/PostForm.vue';
import { postService } from '@/services/PostService';
import Pop from '@/utils/Pop';
import { computed, onMounted } from 'vue';


onMounted(() => {
  getPosts()
})

async function getPosts() {
  try {
    await postService.getPosts()
  }
  catch (error) {
    Pop.error(error);
  }
}


const account = computed(() => AppState.account)
const posts = computed(() => AppState.Posts)

</script>

<template>
  <div class="row" v-if="account != null">
    <PostForm />
  </div>
  <section class="row mb-2" v-for="post in posts" v-bind:key="post.id">
    <PostCard :post="post" />
  </section>

</template>

<style scoped lang="scss"></style>
