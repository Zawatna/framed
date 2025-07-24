<script setup>
import { AppState } from "@/AppState.js";
import AlbumSearchCard from "@/components/AlbumSearchCard.vue";

import PhotoCard from "@/components/PhotoCard.vue";
import { albumsService } from "@/services/AlbumsService.js";

import { photosService } from "@/services/PhotosService.js";
import { Pop } from "@/utils/Pop.js";
import { computed, onMounted } from "vue";

onMounted(() => {
  getAllPhotos();
  getAllAlbums();
});

const photos = computed(() => AppState.photos);
const albums = computed(() => AppState.albums);

async function getAllPhotos() {
  try {
    await photosService.getAllPhotos();
  } catch (error) {
    Pop.error(error);
  }
}

async function getAllAlbums() {
  try {
    await albumsService.getAllAlbums();
  } catch (error) {
    Pop.error(error);
  }
}
</script>

<template>
  <div class="text-light main-font">
    <section>
      <div class="container-fluid flex-grow-1">
        <div class="row">
          <div class="">
            <p class="my-1 main-font text-secondary fs-3 shadow">
              Recent Photos
            </p>
          </div>
          <div class="col-12 overflow-set d-flex">
            <div v-for="photo in photos" :key="photo.id">
              <PhotoCard :photo="photo" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <br />
    <section class="container-fluid">
      <div class="row">
        <p class="fs-1">Check out these great albums</p>
        <div
          class="col-lg-3 col-md-4 px-5 mb-5"
          v-for="album in albums"
          :key="album.id"
        >
          <AlbumSearchCard :album />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.overflow-set {
  overflow-x: auto;
  scrollbar-width: none;
}

.photo-malarky {
  text-decoration: none;
  color: white; // color: var(--bs--black)
}
</style>
