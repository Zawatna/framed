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

  <main class="bg-primary text-light container-fluid">
    <div>

      <div v-for="photo in photos" :key="photo.id" class="overflow-hidden row">
        <PhotoCard :photo="photo" />
      </div>
    </div>
    <div>
      <AlbumCard />
    </div>
  </main>





  <button @click="createPhoto()">TEST ME</button>

</template>

<style scoped lang="scss"></style>
