<script setup>
import { AppState } from '@/AppState';
import Navbar from '@/components/Navbar.vue';
import { adsService } from '@/services/AdsService';
import Pop from '@/utils/Pop';
import { computed, onMounted } from 'vue';
import Ad from './Ad.vue';

const account = computed(() => AppState.account)

const accountClass = computed(() => (account.value ? 'col-10' : 'col-12'))



onMounted(() => {
    getAds()
})

async function getAds() {
    try {
        await adsService.getAds()
    }
    catch (error) {
        Pop.error(error);
    }
}

const adsData = computed(() => AppState.Ads)


</script>


<template>
    <section class="row d-flex rounded ">
        <div v-if="account != null" class="col-md-2 col-sm-6 d-flex flex-column shadow-lg p-3 ml-2" id="AccountSection">
            <div class="rounded d-block justify-items-center p-2">

                <div v-if="account?.picture !== ''" class="imageBackground d-flex align-content-center">
                    <router-link :to="{ name: 'Account', query: { id: account?.id } }">
                        <img :src="account?.picture" alt="" class="pfp-Image">
                    </router-link>
                </div>
                <h5 class="fw-bold text-start colorText mt-2">{{ account?.name }}</h5>
                <p class="text-start colorText" v-if="account?.class != null">{{ account?.class }}</p>
                <hr>
            </div>
            <div class="text-start p-2 mt-3 colorText">
                <div class="d-flex justify-content-center align-items-center">
                    <p v-if="account?.github != ''">
                        <a class="mx-3 socialConnection" :href="account?.github" target="_blank">
                            <i class="mdi mdi-github fs-2 socialConnection"></i><span class="mx-3">Github</span>
                        </a>
                    </p>
                </div>

                <div class="d-flex justify-content-center align-items-center">
                    <p v-if="account?.linkedin != ''">
                        <a class="mx-3 socialConnection" :href="account?.linkedin" target="_blank">
                            <i class="mdi mdi-linkedin fs-2 socialConnection"></i><span class="mx-3">LinkedIn</span></a>
                    </p>
                </div>

                <div class="d-flex justify-content-center align-items-center">
                    <p v-if="account?.resume != ''">
                        <a class="mx-3 socialConnection" :href="account?.resume" target="_blank">
                            <i class="mdi mdi-text-box fs-2 socialConnection"></i><span class="mx-3">Resume</span>
                        </a>
                    </p>
                </div>
            </div>

            <div class="row justify-content-around d-flex mt-auto p-2">
                <div class="rounded p-2" id="buttonContainer">
                    <router-link class="col-12 btn  btnColor " :to="{ name: 'Account' }">
                        Manage Account
                    </router-link>
                </div>
            </div>
        </div>
        <div :class="accountClass" id="navBar">
            <div class="row justify-content-center">
                <Navbar />
            </div>
            <div class="row justify-content-around">
                <div class="col-8 p-4 mx-2">
                    <RouterView />
                </div>
                <div class="col-3 p-4 mx-2 mt-1" id="AdsSection">
                    <div v-for="ad in adsData" v-bind:key="ad.title">
                        <Ad :ad="ad" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<style lang="scss" scoped>
h5 {
    color: white;
    text-shadow: 1px 1px black;
}

#buttonStyling {
    text-decoration: none
}

div>p {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 10px;
}


.socialConnection {
    color: #8d58e5;
    text-shadow: 1px 1px black;
}

.colorText {
    color: white;
    text-shadow: 1px 1px black;
}

.imageBackground {
    align-items: center;
    background-color: #8d58e5;
    height: 6em;
    aspect-ratio: 1/1;
    border-radius: 50%;
}

hr {
    border: none;
    height: 3px;
    background-color: rgb(255, 255, 255);
    width: 100%;
    margin: 10px auto;
    opacity: 0.8;
}

.mdi-logout {
    color: black;
}

.btnColor {
    background-color: #8d58e5;
    color: black;
    cursor: pointer;
}

.btnColor:hover {
    background-color: rgb(60, 64, 68);
    color: black;
}

#AccountSection {
    min-height: 100dvh;
    text-align: center;
    justify-content: center;
    align-content: center;
    height: 100%;
    background-color: #36195e;
}

#AdsSection {
    min-height: 100%;
    text-align: center;
    justify-content: center;
    align-content: center;
    height: 100%;
    background-color: #121212;
}


.pfp-Image {
    border-radius: 50%;
    height: 5em;
    aspect-ratio: 1/1;
    margin: 0.75em;
}
</style>