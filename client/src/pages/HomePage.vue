<script setup>
import { AppState } from '@/AppState.js';
import AlbumCard from '@/components/AlbumCard.vue';
import PhotoCard from '@/components/PhotoCard.vue';
import { albumService } from '@/services/AlbumService.js';
import { photosService } from '@/services/PhotosService.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

onMounted(() => {
  getAllPhotos();
  getAllAlbums()
})

const photos = computed(() => AppState.photos)
const albums = computed(()=> AppState.albums)


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

async function getAllAlbums(){
  try {
    await albumService.getAllAlbums()
  }
  catch (error){
    Pop.error(error);
  }
}


</script>

<template>
  <main class="bg-primary text-light">
      <section>
        <div class="container-fluid flex-grow-1">
          <div class="row ">
            <div class="">
              <p class="my-1 main-font text-secondary ">Recent Photos</p>
            </div>
            <div class="col-12 overflow-set d-flex">
              <div v-for="photo in photos" :key="photo.id">
                <PhotoCard :photo="photo" />
              </div>
        </div>
      </div>
    </div>
    
    <!-- <button @click="createPhoto()">TEST ME</button> -->
    
    
    <!--For Testing Blur Effect on Footer Nav Bar-->
    <!-- <div class="row bg-primary text-center justify-content-center">
      <div class="col-7">
        <img src="https://plus.unsplash.com/premium_photo-1752367289570-090e5807428d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" class="img-fluid">
      </div>
      <h1 class="text-light bg-primary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quibusdam vel incidunt atque cum dicta temporibus illo pariatur, illum quisquam!</h1>
      <div class="col-7">
        <img src="https://plus.unsplash.com/premium_photo-1752625323773-3e4de726adcd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D" alt="" class="img-fluid">
      </div>
      <h1 class="text-light bg-primary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quibusdam vel incidunt atque cum dicta temporibus illo pariatur, illum quisquam!</h1>
    </div> -->
  </section>
  <br>
  <section class="">
    <div class="container-fluid">
      <div  class="row">
        <div v-for="album in albums" :key="album.id">
          <AlbumCard :album="album"/>
        </div>
      </div>
    </div>
  </section>
</main>
</template>

<style scoped lang="scss">
.overflow-set {
  overflow-x: auto;
  scrollbar-width: none;
}
</style>
