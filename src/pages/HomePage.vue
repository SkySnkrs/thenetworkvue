<script setup>
import { AppState } from '@/AppState';
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

</script>

<template>

  <section class="row" v-for="post in posts" v-bind:key="post.id">
    <div class="p-3 shadow-lg mt-2">
      <div class="row justify-content-between">
        <div class="col-6">
          <div class="d-flex justify-content-start p-2">
            <img :src="post?.creator.picture" alt="" id="CreatorImage">
            <div class="d-block align-self-center text-start mx-3">
              <h6>{{ post?.creator.name }}</h6>
              <p>{{ post?.createdTime }}</p>
            </div>
          </div>
        </div>
        <div class="col-6 text-end">
          <div>
            <i selectable type="button" class="mdi mdi-menu mx-3"></i>
          </div>
        </div>
      </div>
      <div>
        <p>{{ post.body }}</p>
      </div>
      <div>

      </div>
    </div>
  </section>

</template>

<style scoped lang="scss">
#CreatorImage {
  height: 50px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-position: center;
  object-fit: cover;
}
</style>
