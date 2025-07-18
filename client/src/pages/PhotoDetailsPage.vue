<script setup>
import { AppState } from '@/AppState.js';
import { photosService } from '@/services/PhotosService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

onMounted(() => {
getPhotoById();
});

const route = useRoute();
const photo = computed(() => AppState.photo);
// TODO Add Tags once populated in appstate 
// TODO Add Comments once populated in appstate 
// TODO Add Profile once BE Getter is created

async function getPhotoById() {
  try {
    const photoId = route.params.photoId;
    await photosService.getPhotoById(photoId);
  }
  catch (error){
    Pop.error(error);
    logger.log('could not get photo by id', error)
  }
}

</script>


<template>
<div v-if="photo && photo.creator" class="container-fluid mb-5">
  <div class="row justify-content-center mb-5">
    <div class="frame justify-content-center mt-3 pb-1 px-1">
      <div class="text-center">
        <img :src="photo.imgUrl" :alt="`${photo.creator.name}'s posted photo`" class="img-fluid">
      </div>
      <h5 class="img-username">@{{ photo.creator.name }}</h5>
      <h4 class="img-desc main-font">{{ photo.description }}</h4>
      <div class="row align-items-center">
        <div class="col-6 d-flex ps-4">
          <i class="mdi mdi-comment display-3 text-light"></i>
          <p class="mt-2 ms-1 fs-4">33</p>
        </div>
        <div class="col-6 text-end justify-content-end d-flex pe-4">
          <p class="like-num me-1 fs-4">1.3K</p>
          <i class=" mdi mdi-heart text-warning display-3" role="button" ></i>
        </div>
      </div>
    </div>
  </div>
  <div class="row text-center bg-primary">
    <h1 class="col-12 text-light mt-3 mb-3">More Photos from <span class="username">@{{ photo.creator.name }}</span></h1>
  </div>
  <!-- TODO CREATE V-FOR ONCE PROFILE/PROFILE IMAGES ROUTE CREATED -->
  <RouterLink :to="{ name: 'Photo Details', params: { photoId: photo.id }}">
    <div class="row justify-content-center mb-5">
      <div class="frame justify-content-center mt-3 pb-1 px-1">
        <div class="text-center">
          <img :src="photo.imgUrl" :alt="`@${photo.creator.name}'s posted photo`" class="img-fluid">
        </div>
        <h5 class="img-username">@{{ photo.creator.name }}</h5>
        <h4 class="img-desc main-font">{{ photo.description }}</h4>
        <div class="row align-items-center">
          <div class="col-6 d-flex ps-4">
            <i class="mdi mdi-comment display-3 text-light"></i>
            <p class="mt-2 ms-1 fs-4">33</p>
          </div>
          <div class="col-6 text-end justify-content-end d-flex pe-4">
            <p class="like-num me-1 fs-4">1.3K</p>
            <i class=" mdi mdi-heart text-warning display-3" role="button" ></i>
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</div>
<div v-else class="mt-5 container text-warning">
  <div class="row text-center">
    <div class="col-12 display-1">
      Loading
      <i class="mdi mdi-fan mdi-spin display-1"></i>
      ...
    </div>
  </div>
</div>
</template>


<style lang="scss" scoped>

a {
  text-decoration: none;
  color: black;
}

img {
  aspect-ratio: 1/1;
  width: 95%;
  margin-top: 20px;

}

.frame {
  background: #AEA399;
  background: linear-gradient(356deg, rgba(174, 163, 153, 1) 0%, rgba(185, 174, 162, 1) 10%, rgba(189, 177, 165, 1) 27%, rgba(199, 186, 172, 1) 37%, rgba(191, 178, 166, 1) 41%, rgba(182, 170, 159, 1) 45%, rgba(152, 144, 136, 1) 48%, rgba(163, 152, 142, 1) 53%, rgba(124, 119, 113, 1) 58%, rgba(140, 132, 123, 1) 67%, rgba(122, 117, 112, 1) 80%, rgba(140, 132, 123, 1) 88%, rgba(132, 126, 118, 1) 97%);
  width: 800px;
}

.img-desc {
margin-left: 20px;
margin-top: 0px;
}

.username {
  color: rgb(163, 162, 162) !important;
  
}

.img-username {
  margin-left: 11px;
  margin-top: 5px;
  margin-bottom: 0px;
}

p {
  margin-top: 10px;
  margin-bottom: 0px;
}

</style>