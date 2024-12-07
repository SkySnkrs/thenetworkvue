<script setup>
import { computed, ref } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '@/utils/Pop.js';
import { accountService } from '@/services/AccountService.js';

const account = computed(() => AppState.account);
const isModalOpen = ref(false);

const formData = ref({
  name: '',
  picture: '',
  linkedin: '',
  graduated: '',
  resume: '',
  class: '',
  coverImg: '',
  github: '',
});


function openModal() {
  formData.value = { ...AppState.account };
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}

async function saveChanges() {
  try {
    await accountService.saveChanges(formData.value)
    closeModal();
  }
  catch (error) {
    Pop.error(error);
    closeModal();
  }
}
</script>

<template>
  <div class="about background inputBox">
    <div v-if="account">
      <div class="text-center mt-1 p-3"
        :style="account?.coverImg ? { backgroundImage: `url(${account.coverImg})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '8px' } : {}">

        <img class="rounded" :src="account.picture" alt="User Picture" />
        <div class="d-block text-center">
          <p class="mt-2 inputBox">User's Email:</p>
          <p class="inputBox">{{ account.email }}</p>
        </div>
      </div>
      <div class="row p-3 mt-1 d-flex">
        <div class="col-md-6">
          <h4>Socials Connected:</h4>
          <div class="p-2">
            <p v-if="account.linkedin != ''">Linked In: <a :href="account.linkedin" target="_blank">Click Here</a></p>
            <p v-else>Please Update Your Linked In</p>
            <p v-if="account.github != ''">Git Hub: <a :href="account.github" target="_blank">Click Here</a></p>
            <p v-else>Please Update Your Git Hub</p>
          </div>
        </div>
        <div class="col-md-6">
          <h4>Graduation:</h4>
          <div class="p-2">
            <p v-if="account?.graduated != false">Graduated?: {{ account?.graduated }}</p>
            <p v-else>User Has Not Graduated, If You Have Please Update!</p>
            <p v-if="account?.class != ''">Class: {{ account?.class }}</p>
            <p v-else>Please Update Your Class</p>
            <p v-if="account?.resume != ''">Resume: <a :href="account.resume" target="_blank">Click Here</a>
            </p>
            <p v-else>Please Provide A Resume!</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div>
          <button @click="openModal" class="btn btn-primary text-start">Edit Profile</button>
        </div>
      </div>
    </div>
    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>

    <div v-if="isModalOpen" class="modal show" tabindex="-1" role="dialog"
      style="display: block; background-color: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Profile</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveChanges">
              <div class="row">
                <div class="col-6 mb-3">
                  <label for="name" class="form-label">Name</label>
                  <input v-model="formData.name" type="text" class="form-control" id="name" />
                </div>
                <div class="col-6 mb-3">
                  <label for="picture" class="form-label">Picture URL</label>
                  <input v-model="formData.picture" type="url" class="form-control" id="picture" />
                </div>
                <div class="col-6 mb-3">
                  <label for="linkedin" class="form-label">LinkedIn</label>
                  <input v-model="formData.linkedin" type="url" class="form-control" id="linkedin" />
                </div>
                <div class="col-6 mb-3">
                  <label for="graduated" class="form-label">Graduated?</label>
                  <select v-model="formData.graduated" class="form-control" id="graduated">
                    <option :value="true">Yes</option>
                    <option :value="false">No</option>
                  </select>
                </div>
                <div class="col-6 mb-3">
                  <label for="resume" class="form-label">Resume URL</label>
                  <input v-model="formData.resume" type="url" class="form-control" id="resume" />
                </div>
                <div class="col-6 mb-3">
                  <label for="class" class="form-label">Class</label>
                  <input v-model="formData.class" type="text" class="form-control" id="class" />
                </div>
                <div class="col-6 mb-3">
                  <label for="coverImg" class="form-label">Cover Image URL</label>
                  <input v-model="formData.coverImg" type="url" class="form-control" id="coverImg" />
                </div>
                <div class="col-6 mb-3">
                  <label for="github" class="form-label">GitHub</label>
                  <input v-model="formData.github" type="url" class="form-control" id="github" />
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
            <button type="button" class="btn btn-primary" @click="saveChanges">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
img {
  max-width: 100px;
}

.background {
  background: rgb(54, 25, 94);
  background: linear-gradient(90deg, rgba(54, 25, 94, 1) 0%, rgba(137, 91, 209, 1) 19%, rgba(144, 87, 245, 1) 34%, rgba(120, 72, 201, 1) 50%, rgba(81, 5, 196, 1) 73%, rgba(144, 120, 186, 1) 90%);
  border-radius: 8px;
  padding: 1em;
}

a {
  color: white;
  text-decoration: underline;
  text-shadow: 1px 1px black;
}

.inputBox {
  color: white;
  text-shadow: 1px 1px black;
}
</style>
