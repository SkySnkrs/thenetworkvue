<script setup>
import { AppState } from '@/AppState';
import Navbar from '@/components/Navbar.vue';
import { AuthService } from '@/services/AuthService';
import { computed } from 'vue';

const account = computed(() => AppState.account)

const accountClass = computed(() => (account.value ? 'col-10' : 'col-12'))

async function logout() {
    AuthService.logout()
}


</script>


<template>
    <section class="row d-flex rounded ">
        <div v-if="account != null" class="col-md-2 d-flex flex-column shadow-lg p-3 ml-2" id="AccountSection">
            <div class="rounded p-2">
                <router-link :to="{ name: 'Account' }">
                    <img :src="account?.picture" alt="" class="pfp-Image">
                </router-link>
                <h4 class="fw-bold">{{ account?.name }}</h4>
                <hr>
            </div>
            <div class="row justify-content-around d-flex mt-auto p-2">
                <div class="rounded p-2 manageAccount" id="buttonContainer">
                    <router-link class="col-md-9 btn  btnColor " :to="{ name: 'Account' }">
                        Account
                    </router-link>
                    <button @click="logout" class="col-md-3 btn btn-danger "><i class="mdi mdi-logout"></i></button>
                </div>
            </div>
        </div>
        <div :class="accountClass" id="navBar">
            <div class="row">
                <Navbar />
            </div>
            <div class="row justify-content-around">
                <div class="col-9 p-4 mx-2">
                    <RouterView />
                </div>
                <div class="col-2" id="AdsSection">
                    Ads
                </div>
            </div>
        </div>
    </section>
</template>


<style lang="scss" scoped>
#buttonContainer {
    background-color: white;
}

.mdi-logout {
    color: black;
}

.btnColor {
    background-color: white;
    color: black;
    cursor: pointer;
    border: 1px solid black;
}

.btnColor:hover {
    background-color: lightgrey;
    color: black;
}

#AccountSection {
    min-height: 100dvh;
    text-align: center;
    justify-content: center;
    align-content: center;
    height: 100%;
    background-color: white;
}

#AdsSection {
    min-height: 100%;
    text-align: center;
    justify-content: center;
    align-content: center;
    height: 100%;
    background-color: white
}


.pfp-Image {
    border-radius: 50%;
    height: 5em;
    aspect-ratio: 1/1;
    margin: 0.75em;
}

.manageAccount {
    background: rgb(54, 25, 94);
    background: linear-gradient(90deg, rgba(54, 25, 94, 1) 0%, rgba(137, 91, 209, 1) 19%, rgba(144, 87, 245, 1) 34%, rgba(120, 72, 201, 1) 50%, rgba(81, 5, 196, 1) 73%, rgba(144, 120, 186, 1) 90%);
}
</style>