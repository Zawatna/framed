<script setup>
import { ref } from 'vue';



const editableFormData = ref({
    name: '',
    coverImg: '',
    description: '',
    createdAt: new Date().getFullYear,
    updatedAt: new Date().getFullYear,
    isArchived: false,
    privacy: '',
})

const privacyOptions = [
    "Private",
    "Following Only",
    "Public"
]

</script>

<!-- album form -->
<template>
    <form>
        <div class="form-floating mb-2">
            <input v-model="editableFormData.coverImg" type="url" class="form-control" id="album-coverImg"
                maxlength="500" required: true>
            <label for="album-coverImg">Cover Image</label>
        </div>
        <div class="form-floating mb-2">
            <textarea v-model="editableFormData.description" type="text" class="form-control" id="album-description"
                placeholder="Album Description" maxlength="1000"></textarea>
            <label for="album-description">Description</label>
        </div>
        <div class="form-floating mb-2">
            <input v-model="editableFormData.name" type="text" class="form-control" id="album-name"
                placeholder="Name Album" maxlength="200" minlength="3" required: true>
            <label for="album-name">Name Your Album</label>
        </div>
        <div class="form-floating mb-2">
            <select v-model="editableFormData.privacy" id="album-privacy-status" class="form-select"
                aria-label="Privacy Setting">
                <option selected disabled value="">Select Privacy Status</option>
                <option value="Private"></option>
                <option value="Following Only"></option>
                <option value="Public"></option>
            </select>
        </div>
    </form>




</template>


<style lang="scss" scoped></style>