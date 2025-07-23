<script setup>
import { AppState } from '@/AppState.js';
import { albumsService } from '@/services/AlbumsService.js';
import { photosService } from '@/services/PhotosService.js';
import { profilesService } from '@/services/ProfilesService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import EditProfileForm from './EditProfileForm.vue';


onMounted(() => {
  getProfileById();
  getUserPhotos();
  getTagCount();
})

const account = computed(() => AppState.account)
const profile = computed(() => AppState.profile)
const profileTags = computed(() => AppState.profileTags)

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

async function getUserPhotos() {
  try {
    const profileId = route.params.profileId;
    await photosService.getUserPhotos(profileId);
  }
  catch (error) {
    Pop.error(error);
    logger.error('could not get user posts', error);
  }
}

async function getTagCount() {
  try {
    const profileId = route.params.profileId;
    const albumTags = await albumsService.getMostAlbumsTagsById(profileId)
    logger.log("Album Tags", albumTags)
  }
  catch (error) {
    Pop.error(error);
    logger.error(error)
  }
}


</script>


<template>
  <section v-if="profile" class="container-fluid">

    <button v-if="account" class="btn bg-secondary fixed-button m-2" type="button" data-bs-toggle="modal"
      data-bs-target="#editProfile">
      Edit Profile
    </button>

    <div class="row">
      <div class="col-md-3 p-3 text-center">
        <img class=" profile-picture border border-light" :src="profile.picture"
          :alt="`picture of the profile owner: ${profile.name}`">
      </div>
      <div class="ps-md-3 ps-lg-0 col-md-9 p-0 d-flex align-items-center flex-column">
        <h1 class="my-3 text-light text-shadow fancy-font">{{ profile.name }}</h1>
        <p class="text-light text-shadow main-font text-center m-0 mb-3 px-3 fs-4">{{ profile.bio }}</p>
      </div>
    </div>

  </section>

  <section v-if="profile" class="container-fluid text-light border-bottom ">
    <div class="row">
      <div class="col mt-3">
        <h3 class="text-light text-shadow text-start text-decoration-underline m-0">{{ profile.name }}'s Most
          Used Tags
        </h3>
        <div class="d-flex gap-3 text-center text-shadow justify-content-around ">
          <p v-for="(tagObject, index) in profileTags.slice(0, 5)" :key="index"
            class=" my-3 tag-style px-2 rounded-pill">{{
              tagObject.tag }}
          </p>
        </div>

      </div>
    </div>
  </section>

  <!-- <section v-if="profile">
    <EditProfileForm />
  </section> -->
</template>


<style lang="scss" scoped>
.profile-picture {
  height: 15dvh;
  max-width: auto;
  aspect-ratio: 1/1;
  border-radius: 50%;
  border-width: 3px !important;


  @media screen and (min-width: 768px) {
    height: 25dvh;
  }

  @media screen and (min-width:2560px) {
    height: 30dvh;
  }

}
</style>