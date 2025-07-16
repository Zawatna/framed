<script setup>
import { Photo } from '@/models/Photo.js';




defineProps(
  {
    photo: { type: Photo, required: true }
  }
)
</script>

<template>
  <main class="container-fluid">
    <div v-if="photo" class=" align-items-center row justify-content-center">

      <div class="col d-flex overflow-set my-3">


        <img :src="photo?.imgUrl" alt="" class=" border border-light mx-2 p-1 photo-style">


      </div>
    </div>

  </main>
</template>

<style lang="scss" scoped>
.photo-style {
  max-height: 105px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-size: cover;



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
