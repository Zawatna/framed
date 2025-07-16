<script setup >
import Example from '@/components/Example.vue';
import { photosService } from '@/services/PhotosService.js';
import { Pop } from '@/utils/Pop.js';
import { onMounted } from 'vue';

onMounted(() => {
  
})



async function createPhoto(){
  try {
    const formData = {
    name: "Testing",
    imgUrl: "https://plus.unsplash.com/premium_photo-1752625323773-3e4de726adcd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D"
  }
    await photosService.createPhoto(formData)
  }
  catch (error){
    Pop.error(error);
  }
}

async function getAllPhotos() {
  try {
    await photosService.getAllPhotos();
  }
  catch (error){
    Pop.error(error);
  }
}


</script>

<template>
  <Example />


  <button @click="createPhoto()">TEST ME</button>

</template>

<style scoped lang="scss">

</style>
