<script setup>
import { Profile } from '../models/Profile';
import { postService } from '../services/PostService';
import Pop from '../utils/Pop';


defineProps({
    profile: { type: Profile, required: true }
})

async function setActiveProfile(profileID) {
    try {
        await postService.setActiveProfile(profileID)
    }
    catch (error) {
        Pop.error(error);
    }
}

</script>


<template>
    <div class=" rounded background text p-3 shadow-lg mt-3">
        <div class="row justify-content-between">
            <div class="col-6">
                <div class="d-flex justify-content-start p-2">
                    <router-link @click="setActiveProfile(profile?.id)" :to="{ name: 'Profile' }">
                        <img :src="profile?.picture" alt="" id="CreatorImage">
                    </router-link>
                    <div class="d-block align-self-center text-start mx-3">
                        <h6>{{ profile?.name }}</h6>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-2">
            <p>{{ profile?.bio }}</p>
        </div>

    </div>
</template>


<style lang="scss" scoped>
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

.background {
    background: rgb(54, 25, 94);
    background: linear-gradient(90deg, rgba(54, 25, 94, 1) 0%, rgba(137, 91, 209, 1) 19%, rgba(144, 87, 245, 1) 34%, rgba(120, 72, 201, 1) 50%, rgba(81, 5, 196, 1) 73%, rgba(144, 120, 186, 1) 90%);
}

.text {
    color: white;
    text-shadow: 1px 1px black;
}
</style>