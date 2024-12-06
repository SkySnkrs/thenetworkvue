<script setup>
import { postService } from '@/services/PostService';
import Pop from '@/utils/Pop';
import { onMounted } from 'vue';


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

</script>

<template>

  <p>hello</p>

</template>

<style scoped lang="scss"></style>
