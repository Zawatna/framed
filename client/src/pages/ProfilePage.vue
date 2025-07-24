<script setup>

import { AppState } from '@/AppState.js';
import AlbumSearchCard from '@/components/AlbumSearchCard.vue';
import PhotoSearchCard from '@/components/PhotoSearchCard.vue';
import ProfileCard from '@/components/ProfileCard.vue';
import { profilesService } from '@/services/ProfilesService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';


onMounted(() => {
  getProfileById();
  getAllProfileAlbums();
  getAllProfilePhotos()
})

const albums = computed(() => AppState.albums)
const photos = computed(() => AppState.photos)
const displayChecker = computed(() => AppState.displayChecker)
const route = useRoute();

async function getProfileById() {
  try {
    const profileId = route.params.profileId
    await profilesService.getProfileById(profileId)
  }
  catch (error) {
    Pop.error(error);
    logger.error("profile by ID error 🧑‍🦳🧻", error)
  }
}

async function getAllProfileAlbums() {
  try {
    const profileId = route.params.profileId
    await profilesService.getAllProfileAlbumns(profileId);
  } catch (error) {
    Pop.error(error);
    logger.error("Album by Profile error", error)
  }
}
async function getAllProfilePhotos() {
  try {
    const profileId = route.params.profileId
    await profilesService.getAllProfilePhotos(profileId);
  } catch (error) {
    Pop.error(error);
    logger.error("Photos by Profile error ---->", error)
  }
}

function changeDisplayChecker(passedValue) {
  AppState.displayChecker = passedValue
}


</script>


<template>
  <ProfileCard />
  <section class="contiainer main-font">

  </section>
  <div class="container">
    <div class="row my-3">
      <div class="col d-flex justify-content-center ">
        <button @click="changeDisplayChecker('albums')" class="btn btn-warning mx-3">My Albums</button>
        <button @click="changeDisplayChecker('photos')" class="btn btn-success mx-3">My Photos</button>
        <button @click="changeDisplayChecker('followedAlbumns')" class="btn btn-warning mx-3">Albums I Follow</button>
      </div>
    </div>
  </div>
  <section v-if="displayChecker == 'albums'" class="container-fluid">
    <div class="row">
      <p class="fs-1 text-white text-center">Check out these great albums</p>
      <div class="col-lg-3 col-md-4 px-5 mb-5" v-for="album in albums" :key="album.id">
        <AlbumSearchCard :album />
      </div>
    </div>
  </section>

  <section v-else-if="displayChecker == 'photos'" class="text-light">
    <div class="row d-flex mb-5 mx-3">
      <div class="col-lg-3 col-md-6 pt-2" v-for="photo in photos" :key="photo.id">
        <PhotoSearchCard :photo />
      </div>
    </div>
  </section>

  <section v-else class="d-flex justify-content-center">
    <h2 class="text-center text-warning my-5 bg-dark col-md-6">Select a tab above to view it here</h2>
  </section>
</template>


<style lang="scss" scoped></style>