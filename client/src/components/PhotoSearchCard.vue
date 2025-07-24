<script setup>
import { Photo } from "@/models/Photo.js";
import { RouterLink } from "vue-router";

defineProps({ photo: Photo });
</script>

<template>
  <RouterLink :to="{ name: 'Photo Details', params: { photoId: photo.id } }">
    <div class="position-relative photo">
      <img src="../assets/img/polaroid-frame-PNG-for-photoshop.png" class="polaroid-frame-1" />
      <img class="album-photo photo-1" :src="photo.imgUrl" :alt="photo.name" />
      <p class="photo-title">
        {{ photo.name }} by <b>{{ photo.creator.name }}</b>
      </p>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
.photo {
  width: 300px;
  aspect-ratio: 1/1;
}

.photo-title {
  z-index: 9999;
  position: absolute;
  background-color: var(--bs-primary);
  padding: 0.3rem;
  border-radius: 15px;
  top: 200px;
  left: 15px;
  right: 70px;
  color: var(--bs-light);
  text-shadow: 0px 0px 2px black;
}

.polaroid-frame-1 {
  height: 300px;
  position: absolute;
  top: -10px;
  left: -90px;
  z-index: 9998;
}

.album-photo {
  height: 210px;
  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: center;
}

.photo-1 {
  position: absolute;
  top: 15px;
  left: 20px;
  z-index: 9997;
}
</style>
