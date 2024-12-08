<script setup>
import { watch, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import PostCard from '../components/PostCard.vue';
import { postService } from '../services/PostService';
import { logger } from '../utils/Logger';
import NextPage from '../components/NextPage.vue';
import ProfileCard from '../components/ProfileCard.vue';

const route = useRoute();
const posts = computed(() => AppState.Posts)
const profiles = computed(() => AppState.Profile)

async function fetchPosts(searchQuery) {
    if (!searchQuery) return;
    try {
        await postService.getPostsByQuery(searchQuery);
        posts.value = AppState.Posts;
    } catch (error) {
        logger.error('Failed to fetch posts:', error);
    }
}

onMounted(() => {
    const initialQuery = route.query.search || '';
    fetchPosts(initialQuery);
});

watch(
    () => route.query.search,
    (newQuery) => {
        fetchPosts(newQuery);
    }
);
</script>

<template>
    <h3 class="PostData">Profiles:</h3>
    <div v-if="profiles?.length">
        <div v-for="profile in profiles" v-bind:key="profile.id">
            <ProfileCard :profile="profile" />
        </div>
    </div>
    <div v-else class="PostData">
        <h1>Loading Profiles... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
    <h3 class="PostData mt-4">Posts:</h3>
    <div v-if="posts?.length">
        <section class="row mb-2" v-for="post in posts" :key="post.id">
            <PostCard :post="post" />
        </section>
    </div>
    <div v-else class="PostData">
        <h1>Loading Posts... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
    <NextPage />
</template>


<style scoped lang="scss">
.PostData {
    color: white;
}
</style>