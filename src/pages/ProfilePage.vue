<script setup>
import { AppState } from '@/AppState';
import { logger } from '@/utils/Logger';
import { computed } from 'vue';


const account = computed(() => AppState.activeProfile)

const message = 'User Has Not Graduated'

logger.log(account)
</script>


<template>
    <div class="about background inputBox">
        <div v-if="account">
            <div class="text-center mt-1 p-3"
                :style="account?.coverImg ? { backgroundImage: `url(${account.coverImg})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '8px', maxHeight: '220px', maxWidth: '630px' } : {}">

                <img class="rounded profileImage" :src="account.picture" alt="User Picture" />
                <div class="d-block text-center">
                    <p class="mt-2 inputBox">User's Email:</p>
                    <p class="inputBox">{{ account.email }}</p>
                </div>
            </div>
            <div v-if="account?.bio != ''" class="row mt-3 p-2 inputBox">
                <h4>Bio:</h4>
                <p>{{ account?.bio }}</p>
            </div>
            <div class="row p-3 mt-1 d-flex">
                <div class="col-md-6">
                    <h4>Socials Connected:</h4>
                    <p v-if="account.linkedin != ''">Linked In: <a :href="account.linkedin" target="_blank">Click
                            Here</a></p>
                    <p v-else>Please Update Your Linked In</p>
                    <p v-if="account.github != ''">Git Hub: <a :href="account.github" target="_blank">Click Here</a>
                    </p>
                    <p v-else>Please Update Your Git Hub</p>
                </div>
                <div class="col-md-6">
                    <h4>Graduation:</h4>
                    <div class="p-2">
                        <p v-if="account?.graduated !== undefined">Graduated?: {{ account?.graduated ? 'Yes' : message
                            }}</p>
                        <p v-if="account?.class != ''">Class: {{ account?.class }}</p>
                        <p v-else>Please Update Your Class</p>
                        <p v-if="account?.resume != ''">Resume: <a :href="account.resume" target="_blank">Click
                                Here</a>
                        </p>
                        <p v-else>Please Provide A Resume!</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.background {
    background: rgb(54, 25, 94);
    background: linear-gradient(90deg, rgba(54, 25, 94, 1) 0%, rgba(137, 91, 209, 1) 19%, rgba(144, 87, 245, 1) 34%, rgba(120, 72, 201, 1) 50%, rgba(81, 5, 196, 1) 73%, rgba(144, 120, 186, 1) 90%);
    border-radius: 8px;
    padding: 1em;
}

.inputBox {
    color: white;
    text-shadow: 1px 1px black;
}

a {
    color: white;
    text-decoration: underline;
    text-shadow: 1px 1px black;
}

.profileImage {
    height: 100px;
    width: 100px;
    object-position: center;
    object-fit: center;
}
</style>