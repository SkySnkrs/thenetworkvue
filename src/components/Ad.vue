<script setup>
import { Ads } from '@/models/Ads';

defineProps({
    ad: { type: Ads, required: true }
})
</script>


<template>
    <div class="justify-content-center d-block mt-2" style="width: 100%;">
        <div>
            <img :src="ad.tall" alt="">
        </div>
    </div>
</template>

<style lang="scss" scoped>
div {
    width: 100%;
}

img {
    height: 300px;
    width: 100%;
    object-fit: cover;
    object-position: center;
}
</style>