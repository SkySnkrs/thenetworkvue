<script setup>
import { AppState } from '@/AppState';
import { postService } from '@/services/PostService';
import Pop from '@/utils/Pop';
import { computed, onMounted } from 'vue';


onMounted(() => {
  getPosts()
})

const posts = computed(() => AppState.Posts)
const account = computed(() => AppState.account)

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

  <section class="row mb-2" v-for="post in posts" v-bind:key="post.id">
    <div class="p-3 shadow-lg mt-3">
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
          <div v-if="account.id == post.creator">
            <i selectable type="button" class="mdi mdi-menu mx-3 fs-3"></i>
          </div>
        </div>
      </div>
      <div class="p-2">
        <p>{{ post.body }}</p>
      </div>
      <div>
        <img v-if="post?.imgUrl" :src="post.imgUrl" :alt="post.body" id="postBodyImage">
      </div>
      <div class="text-end p-2 mx-3 mt-2 d-flex justify-content-end align-items-center">
        <i class="mdi mdi-heart-outline fs-3 mx-2 align-self-center"></i>
        <p class="align-self-center mb-0 fs-5">{{ post.likeCount }}</p>
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

#postBodyImage {
  height: 500px;
  width: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
