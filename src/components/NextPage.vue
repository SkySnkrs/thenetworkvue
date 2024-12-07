<script setup>
import { AppState } from '@/AppState';
import { postService } from '@/services/PostService';
import Pop from '@/utils/Pop';
import { computed } from 'vue';


const pages = computed(() => AppState.totalPages)

async function goToNewPosts(link) {
    try {
        await postService.goToNewPosts(link)
    }
    catch (error) {
        Pop.error(error);
    }
}

</script>


<template>
    <section class="row d-flex justify-content-center align-content-center text-center mt-4 my-2">
        <div class="col-md-6">
            <button @click="goToNewPosts(`${pages?.newer}`)" v-if="pages?.newer != null" class="btn textColor"><i
                    class=" textColor mdi mdi-arrow-left"></i>newer</button>
        </div>
        <div class="col-md-6 ">
            <button @click="goToNewPosts(`${pages?.older}`)" v-if="pages?.older != null" class="btn textColor">older<i
                    class=" textColor mdi mdi-arrow-right"></i></button>
        </div>
    </section>
</template>


<style lang="scss" scoped>
.textColor {
    color: white;
    text-shadow: 1px 1px black;
}
</style>