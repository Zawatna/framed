<script setup>
import { photosService } from '@/services/PhotosService.js';
import { tagsService } from '@/services/TagsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { Modal } from 'bootstrap';
import { ref } from 'vue';



async function createPhoto() {
  try {

    await photosService.createPhoto(formData.value)


    //clear the form
    formData.value = {
      description: '',
      location: '',
      originalDate: '',
      imgUrl: '',
      name: ''
    }
    Modal.getOrCreateInstance('#photoUploadForm').hide()
  }
  catch (error) {
    Pop.error(error);
    logger.error(error)
  }
}

function submitFormData() {
  createPhoto()
  submitTags()
}

const tagSplitOn = /,|, | |\.|-/ig

async function submitTags() {
  try {
    const tags = tagsData.value
      .split(tagSplitOn) // seperates by the const above ^^
      .map(tag => tag.trim().toLocaleLowerCase()) // format tags
      .filter(tag => tag) // erase accidental junk 'empties'
    // .slice(0, 5) // limit tag count
    logger.log('🏷️', tags)
    const tagReturn = await tagsService.checkForNewTags(tags)
    logger.log("response", tagReturn)

    tagsData.value = ''

  }
  catch (error) {
    Pop.error(error);
  }
}

const formData = ref(
  {
    description: '',
    location: '',
    originalDate: '',
    imgUrl: '',
    name: ''
  }
)

const tagsData = ref('')

</script>


<template>

  <form @submit.prevent="submitFormData()" class="container-fluid">
    <div class="row">
      <div class="col-12 mt-3 d-flex flex-wrap justify-content-around">

        <div v-if="formData.imgUrl" class="mb-3 d-flex flex-wrap justify-content-center">
          <small class="m-3 col-12 text-center">Image preview</small>
          <img :src="formData.imgUrl" alt="Your photo image" class="img-fluid photo-preview col-6">
        </div>

        <div class=" form-floating mb-3">
          <input v-model="formData.imgUrl" type="url" required class="form-control" id="photo-imgUrl"
            placeholder="Upload Photo" maxlength="500">
          <label for="photo-imgUrl">Upload Photo</label>
        </div>

        <div class=" form-floating mb-3">
          <input v-model="formData.location" maxlength="500" type="text" class="form-control" id="photo-location"
            placeholder="1234 W 120th, caldwell ID, 83605">
          <label for="photo-location">Address or Long / Lat</label>
        </div>
        <div class=" form-floating mb-3">
          <input v-model="formData.name" type="text" minlength="3" maxlength="50" class="form-control" id="photo-name"
            placeholder="Title of Photo">
          <label for="photo-name">Title of Photos </label>
        </div>

        <!-- NOTE Tag section here, its a work in progress -->
        <div class="col-12 d-flex flex-wrap justify-content-center">
          <p class="col-12 text-center text-info">TAGS</p>
          <!-- 
          <div v-for="(tagInput, index) in 5" :key="`tag-ingput${tagInput}`" class="col-md-4 form-floating mb-3 p-1">
            <input v-model="tagsData[index]" type="text" class="form-control" id="photo-tag10" @keydown.space.prevent
              placeholder="">
            <label for="photo-tag1">Example: coolcat</label>
          </div> -->
          <div>
            <span class="bg-teal text-white rounded-pill me-1 px-2 d-inline-block"
              v-for="tag in tagsData.split(tagSplitOn).map(tag => tag.trim()).filter(tag => tag)" :key="tag">{{ tag
              }}</span>
          </div>
          <div class="col-12 form-floating mb-3 p-1">
            <input v-model.trim="tagsData" type="text" class="form-control" id="photo-tag10" placeholder="">
            <label for="photo-tag1">Example: coolcat, cooldog</label>
          </div>

        </div>
        <hr class="bg-info">
        <!-- END OF TAG SECTION -->

        <div class="col-12 form-floating mb-3">
          <input v-model="formData.description" type="text" maxlength="50" class="form-control" id="photo-description"
            placeholder="Describe the photo">
          <label for="photo-description">Describe the Photo</label>
        </div>
        <div class="col-12 form-floating mb-3">
          <input v-model="formData.originalDate" type="date" class="form-control" id="photo-date"
            placeholder="#cats #dog #hotdogeater">
          <label for="photo-date">Original Photo Date</label>
        </div>


        <div class="col-12 text-center">
          <button class="btn bg-white text-green my-3">Submit <i class="mdi mdi-plus"></i></button>
        </div>


      </div>
    </div>
  </form>

</template>


<style lang="scss" scoped>
.photo-preview {
  max-height: 150px;
  aspect-ratio: 1/1 !important;
}
</style>