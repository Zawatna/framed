<script setup>
import { AppState } from '@/AppState.js';
import AlbumCard from '@/components/AlbumCard.vue';
import PhotoCard from '@/components/PhotoCard.vue';
import { photosService } from '@/services/PhotosService.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

onMounted(() => {
  getAllPhotos();
})

const photos = computed(() => AppState.photos)


async function createPhoto() {
  try {
    //This needs to come out when the form is set up to upload a photo
    const formData = {
      name: "Testing",
      imgUrl: "https://plus.unsplash.com/premium_photo-1752625323773-3e4de726adcd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D"
    }

    // this stays in
    await photosService.createPhoto(formData)
  }
  catch (error) {
    Pop.error(error);
  }
}

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
  </div>

<!-- NOTE For Testing/creating preset photos (delete after form is created)-->
<!-- <button @click="createPhoto()">TEST ME</button> -->

  <!-- NOTE MODAL WRAPPER SLOT FOR PHOTO/Album FORM -->
  <!-- <ModalWrapper modalId="" modalHeader="Add A Photo"> -->
    <!-- TODO Inject actual PhotoForm component/modalId & Uncomment -->
    <!-- <PhotoForm /> 
      </ModalWrapper> -->
    <!-- 
      <ModalWrapper modalId="" modalHeader="Add A Photo"> -->
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
