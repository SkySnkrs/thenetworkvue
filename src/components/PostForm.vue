<script setup>
import { postService } from '../services/PostService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { ref } from 'vue';


const editableFormData = ref({
    body: '',
    imgUrl: ''
})

logger.log(editableFormData)
async function createPost() {
    try {
        await postService.createPost(editableFormData.value)
        editableFormData.value = {
            body: '',
            imgUrl: ''
        }
        Pop.success('Successfully Posted, Have A Good Day!')
    }
    catch (error) {
        Pop.error(error);
    }
}

const useImage = ref(false)


</script>


<template>
    <div class="shadow-lg mt-3 p-4 rounded" id="postForm">
        <h3 class=" mb-3">Post Your Thoughts</h3>
        <form @submit.prevent="createPost" class="row g-3">
            <div class="col-md-12">
                <label for="inputBody" class="form-label inputBox p-1 rounded">Body</label>
                <textarea v-model="editableFormData.body" class="form-control" id="inputBody" required maxlength="500"
                    placeholder="Write something...">
                </textarea>
            </div>
            <div class="col-md-6">


                <div v-if="useImage" class="mt-2">
                    <label for="inputImgUrl" class="form-label inputBox p-1 rounded">Image URL</label>
                    <input v-model="editableFormData.imgUrl" type="url" class="form-control" id="inputImgUrl"
                        placeholder="Enter image URL">
                </div>
            </div>
            <div class="col-12 d-flex justify-content-between">
                <div class="form-check">
                    <input v-model="useImage" type="checkbox" class="form-check-input" id="useImageCheckbox">
                    <label class="form-check-label inputBox" for="useImageCheckbox">
                        Use An Image
                    </label>
                </div>
                <div>
                    <button type="submit" class="btn">Post!</button>
                </div>
            </div>
        </form>
    </div>
</template>


<style lang="scss" scoped>
#postForm {
    background: rgb(54, 25, 94);
    background: linear-gradient(90deg, rgba(54, 25, 94, 1) 0%, rgba(137, 91, 209, 1) 19%, rgba(144, 87, 245, 1) 34%, rgba(120, 72, 201, 1) 50%, rgba(81, 5, 196, 1) 73%, rgba(144, 120, 186, 1) 90%);
}

.inputBox {
    color: white;
    text-shadow: 1px 1px black;
}

.btn {
    background-color: #8d58e5;
}

input,
textarea {
    background-color: #b599e0;
    border: 1px solid #121212;
}

label {
    color: #b599e0;
}

h3 {
    color: #121212;
    text-shadow: 1px 1px black;
}
</style>