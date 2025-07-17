<script setup>
import { albumService } from '@/services/AlbumService.js';
import { logger } from '@/utils/Logger.js';
import { ref } from 'vue';
import ModalWrapper from './ModalWrapper.vue';
import { Pop } from '@/utils/Pop.js';
import { Modal } from 'bootstrap';



const editableAlbumData = ref({
    name: '',
    coverImg: '',
    description: '',
    createdAt: new Date().getFullYear,
    updatedAt: new Date().getFullYear,
    isArchived: false,
    privacy: '',
    tags: ''
})

const privacyOptions = [
    "Private",
    "Following Only",
    "Public"
]

async function createAlbum() {
    logger.log('creating album🖼️🫙', editableAlbumData.value)

    try {
        // const albumId = await albumService.createAlbum(editableAlbumData.value)
        // clear form after submit
        editableAlbumData.value = {
            name: '',
            coverImg: '',
            description: '',
            createdAt: new Date().getFullYear,
            updatedAt: new Date().getFullYear,
            isArchived: false,
            privacy: '',
            tags: ''
        }
        // close the modal
        Modal.getOrCreateInstance('#albumForm').hide()

        // push to the albumdetailspage?

    } catch (error) {
        Pop.error(error)
        logger.error('Could not create 🚫✏️🖼️🫙', error)
    }
}

// function submitAlbumFormData() {
//     createAlbum()
//     submitTags()
// }

const tagSplitOn = /,|, | |\.|-/ig

</script>

<!-- album form -->

<!-- integrate a for each tag loop, separated by comma in a string? -->
<template>
    <form @submit.prevent="createAlbum()">
        <div class="form-floating mb-2">
            <input v-model="editableAlbumData.coverImg" type="url" class="form-control" id="album-coverImg"
                placeholder="Cover Image" maxlength="500" required: true>
            <label for="album-coverImg">Cover Image</label>
        </div>
        <div class="form-floating mb-2">
            <textarea v-model="editableAlbumData.description" type="text" class="form-control" id="album-description"
                placeholder="Album Description" maxlength="1000"></textarea>
            <label for="album-description">Description</label>
        </div>
        <div class="form-floating mb-2">
            <input v-model="editableAlbumData.name" type="text" class="form-control" id="album-name"
                placeholder="Name Album" maxlength="200" minlength="3" required: true>
            <label for="album-name">Name Your Album</label>
        </div>
        <div class="form-floating mb-2">
            <input v-model="editableAlbumData.tags" name="tags[]" type="text" class="form-control" id="album-tags"
                placeholder="Tag">
            <label for="album-tags">Tag your album</label>
        </div>
        <button type="submit" class="btn btn-success rounded-pill">Submit</button>
        <!-- <div class="form-floating mb-2">
            <select v-model="editableAlbumData.privacy" id="album-privacy-status" class="form-select"
                aria-label="Privacy Setting">
                <option selected disabled value="">Select Privacy Status</option>
                <option value="Private">Private</option>
                <option value="Following Only">Following Only</option>
                <option value="Public">Public</option>
            </select>
        </div> -->
    </form>




</template>


<style lang="scss" scoped></style>