<script setup>
import { Ads } from '@/models/Ads';

defineProps({
    ad: { type: Ads, required: true }
})
</script>


<template>
    <div class="justify-content-center d-block">
        <p>{{ ad.title }}</p>
        <img :src="ad.tall" alt="">
    </div>
</template>


<style lang="scss" scoped>
img {
    height: 20px;
    width: 20px;
    object-fit: cover;
    object-position: center;
}
</style>