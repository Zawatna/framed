<script setup>
import { AppState } from '@/AppState.js';
import AlbumCard from '@/components/AlbumCard.vue';
import ModalWrapper from '@/components/ModalWrapper.vue';
import PhotoCard from '@/components/PhotoCard.vue';
import PhotoUploadForm from '@/components/PhotoUploadForm.vue';
import { photosService } from '@/services/PhotosService.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

onMounted(() => {
  getAllPhotos();
})

const photos = computed(() => AppState.photos)




async function getAllPhotos() {
  try {
    await photosService.getAllPhotos();
  }
  catch (error) {
    Pop.error(error);
  }
}


</script>

<template>

  <div class="bg-primary text-light container-fluid flex-grow-1">
    <!-- SECTION RECENT PHOTOS - SideScroll -->
    <div class="row ">
      <div class="">
        <p class="my-1">Recent Photos</p>
      </div>
      <div class="col-12 overflow-set d-flex">

        <div v-for="photo in photos" :key="photo.id">
          <PhotoCard :photo="photo" />
        </div>
      </div>
    </div>
    <!-- !SECTION -->

    <!-- SECTION ALBUM CARDS - Doom Scroll  -->
    <div>
      <AlbumCard />
    </div>
    <!-- !SECTION -->
    <button type="button" data-bs-toggle="modal" data-bs-target="#photoUploadForm">Model Test for Photos</button>
  </div>

  <!-- NOTE For Testing/creating preset photos (delete after form is created)-->

  <!-- NOTE MODAL WRAPPER SLOT FOR PHOTO/Album FORM -->
  <ModalWrapper modalId="photoUploadForm" modalHeader="Add A Photo">
    <!-- TODO Inject actual PhotoForm component/modalId & Uncomment -->
    <PhotoUploadForm />
  </ModalWrapper>

  <!-- <ModalWrapper modalId="" modalHeader="Add An Album"> -->
  <!-- TODO Inject actual AlbumForm component/modalId & Uncomment -->
  <!-- <AlbumForm /> 
      </ModalWrapper>
    -->
</template>

<style scoped lang="scss">
.overflow-set {
  overflow-x: auto;
  scrollbar-width: none;
}
</style>
