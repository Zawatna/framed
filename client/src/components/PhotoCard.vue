<script setup>
import { Photo } from '@/models/Photo.js';
import { RouterLink } from 'vue-router';




defineProps(
  {
    photo: { type: Photo, required: true }
  }
)
</script>

<template>
  <RouterLink :to="{ name: 'Photo Details', params: { photoId: photo.id }}">
    <div class="">
      <img :src="photo.imgUrl" alt="" class=" border border-light mx-1 photo-style">
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
.photo-style {
  max-height: 105px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-size: cover;
  border-width: 3px !important;



  @media screen and (min-width: 768px) {
    max-height: 155px;
  }

  @media screen and (min-width:2560px) {
    max-height: 255px;
  }


}

.overflow-set {
  overflow-x: auto;
  scrollbar-width: none;
}
</style>
