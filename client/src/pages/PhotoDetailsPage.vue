<script setup>
import { AppState } from "@/AppState.js";
import AlbumPhotoButton from "@/components/AlbumPhotoButton.vue";
import { photosService } from "@/services/PhotosService.js";
import { logger } from "@/utils/Logger.js";
import { Pop } from "@/utils/Pop.js";
import { computed, onMounted } from "vue";
import { RouterLink, useRoute } from "vue-router";

onMounted(() => {
  getPhotoById();
  // getPhotosByCreatorId();
});

const route = useRoute();
const photo = computed(() => AppState.photo);
const account = computed(() => AppState.account);
// TODO Add Tags once populated in appstate
// TODO Add Comments once populated in appstate
// TODO Add Profile once BE Getter is created

async function getPhotoById() {
  try {
    const photoId = route.params.photoId;
    await photosService.getPhotoById(photoId);
  } catch (error) {
    Pop.error(error);
    logger.log("could not get photo by id", error);
  }
}

async function deletePhoto(){
  const confirmed = await Pop.confirm('Are you sure you want to delete your photo?')
  if(!confirmed) return
  try {
    const photoId = route.params.photoId
    await photosService.deletePhoto(photoId)
  }
  catch (error){
    Pop.error(error);
  }

}

// async function getPhotosByCreatorId() {
//   try {
//     const creatorId = account;
//     await photosService.getUserPhotos(creatorId);
//   }
//   catch (error){
//     Pop.error(error);
//   }
// }
</script>

<template>
  <div v-if="photo && photo.creator" class="container-fluid mb-5">
    <div class="row justify-content-center mb-5">
      <div class="row justify-content-center mb-5">
        <div class="frame justify-content-start mt-3 pb-1 px-1">
          <RouterLink
            :to="{ name: 'Photo Details', params: { photoId: photo.id } }"
          >
            <div class="text-center">
              <img
                :src="photo.imgUrl"
                :alt="`@${photo.creator.name}'s posted photo`"
                class="img-fluid"
              />
            </div>
          </RouterLink>
          <div v-if="photo.creatorId != account?.id">
            <RouterLink
              :to="{ name: 'Profile', params: { profileId: photo?.creatorId } }"
            >
              <h5 class="img-username">@{{ photo.creator.name }}</h5>
            </RouterLink>
          </div>
          <div v-else>
            <RouterLink
              :to="{ name: 'Profile', params: { profileId: photo?.creatorId } }"
            >
              <h5 class="img-username">@{{ photo.creator.name }}</h5>
            </RouterLink>
          </div>
          <h4 class="img-desc main-font">{{ photo.description }}</h4>
          <div class="row align-items-center">
            <div class="col-4 d-flex ps-4">
              <i class="mdi mdi-comment display-3 text-light"></i>
              <p class="mt-2 ms-1 fs-4">33</p>
            </div>
            <div class="col-4 text-center" v-if="photo.creatorId == account?.id">
              <button @click="deletePhoto()" type="button" class="btn btn-danger fs-5" >Delete</button>
            </div>
            <div class="col-4 text-end justify-content-end d-flex pe-4">
              <p class="like-num me-1 fs-4">1.3K</p>
              <i class="mdi mdi-heart text-warning display-3" role="button"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AlbumPhotoButton />
    <div class="row text-center bg-primary">
      <h1
        v-if="photo.creatorId != account?.id"
        class="col-12 text-light mt-3 mb-3"
      >
        More Photos from
        <RouterLink
          :to="{ name: 'Profile', params: { profileId: photo.creatorId } }"
        >
          <span class="username">@{{ photo.creator.name }}</span>
        </RouterLink>
      </h1>
      <h1 v-else class="col-12 text-light mt-3 mb-3">
        More Photos from
        <RouterLink :to="{ name: 'Account' }">
          <span class="username">@{{ photo.creator.name }}</span>
        </RouterLink>
      </h1>
    </div>
    <!-- TODO CREATE V-FOR ONCE PROFILE/PROFILE IMAGES ROUTE CREATED -->

    <div class="row justify-content-center mb-5">
      <div class="frame justify-content-start mt-3 pb-1 px-1">
        <RouterLink
          :to="{ name: 'Photo Details', params: { photoId: photo.id } }"
        >
          <div class="">
            <img
              :src="photo.imgUrl"
              :alt="`@${photo.creator.name}'s posted photo`"
              class="img-fluid"
            />
          </div>
        </RouterLink>
        <div v-if="photo.creatorId != account?.id">
          <RouterLink
            :to="{ name: 'Profile', params: { profileId: photo?.creatorId } }"
          >
            <h5 class="img-username">@{{ photo.creator.name }}</h5>
          </RouterLink>
        </div>
        <div v-else>
          <RouterLink
            :to="{ name: 'Profile', params: { profileId: photo?.creatorId } }"
          >
            <h5 class="img-username">@{{ photo.creator.name }}</h5>
          </RouterLink>
        </div>
        <h4 class="img-desc main-font">{{ photo.description }}</h4>
        <div class="row align-items-center">
          <div class="col-6 d-flex ps-4">
            <i class="mdi mdi-comment display-3 text-light"></i>
            <p class="mt-2 ms-1 fs-4">33</p>
          </div>
          <div class="col-6 text-end justify-content-end d-flex pe-4">
            <p class="like-num me-1 fs-4">1.3K</p>
            <i class="mdi mdi-heart text-warning display-3" role="button"></i>
          </div>
        </div>
      </div>
    </div>
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
  border-radius: 5%;
  padding-inline: 10px;
  padding-top: 5px;
}

.frame {
  background-image: url(https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3B4NjUwODQ3LWltYWdlLWt3dnZhaDBvLmpwZw.jpg);
  object-fit: cover;
  background-repeat: no-repeat;
  border-radius: 3%;
  width: 700px;
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
