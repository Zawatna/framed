<script setup>
import { AppState } from "@/AppState.js";
import AlbumPhotoButton from "@/components/AlbumPhotoButton.vue";
import { photoCommentsService } from "@/services/PhotoCommentsService.js";
import { photosService } from "@/services/PhotosService.js";
import { logger } from "@/utils/Logger.js";
import { Pop } from "@/utils/Pop.js";
import { computed, onMounted } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";

onMounted(() => {
  getPhotoById();
  getPhotoComments();
  // getPhotosByCreatorId();
});

const route = useRoute();
const router = useRouter();
const photo = computed(() => AppState.photo);
const account = computed(() => AppState.account);
const photoComments = computed(() => AppState.photoComments);
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

async function deletePhoto() {
  const confirmed = await Pop.confirm(
    "Are you sure you want to delete your photo?"
  );
  if (!confirmed) return;
  try {
    const photoId = route.params.photoId;
    await photosService.deleteAlbumPhoto(photoId);
    await photosService.deletePhoto(photoId);

    router.push({ name: "Home" });
  } catch (error) {
    Pop.error(error);
  }
}

async function getPhotoComments() {
  logger.log("get photo comments 🏃‍♀️🖼️💬");
  try {
    const photoId = route.params.photoId;
    await photoCommentsService.getPhotoComments(photoId);
  } catch (error) {
    Pop.error(error);
  }
}
async function likePhoto() {
  try {
    const photoId = photo.value.id;
    logger.log(photo.value.id);
    await photosService.likePhoto(photoId);
  } catch (error) {
    Pop.error(error);
    logger.error(error, "could not like photo");
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
  <div v-if="photo" class="container-fluid mb-5 main-font">
    <div class="row justify-content-center mb-5">
      <div class="row justify-content-center mb-5">
        <div class="frame justify-content-start mt-3 pb-1 px-1">
          <RouterLink :to="{ name: 'Photo Details', params: { photoId: photo.id } }">
            <div class="text-center">
              <img :src="photo.imgUrl" :alt="`@${photo.creator.name}'s posted photo`" class="img-fluid" />
            </div>
          </RouterLink>
          <div v-if="photo.creatorId != account?.id">
            <RouterLink :to="{ name: 'Profile', params: { profileId: photo?.creatorId } }">
              <h5 class="img-username">@{{ photo.creator.name }}</h5>
            </RouterLink>
          </div>
          <div v-else>
            <RouterLink :to="{ name: 'Profile', params: { profileId: photo?.creatorId } }">
              <h5 class="img-username">@{{ photo.creator.name }}</h5>
            </RouterLink>
          </div>
          <h4 class="img-desc main-font">{{ photo.description }}</h4>
          <div class="row align-items-center">
            <div class="col-12 d-flex ps-4 align-items-center justify-content-between">
              <div>
                <button class="btn fixed-button m-2" type="button" data-bs-toggle="modal"
                  data-bs-target="#commentModal">
                  <i class="mdi mdi-comment mdi-flip-h fs-1 text-light text-shadow"></i>
                </button>
                <span class="mt-2 ms-1 fs-3">{{ photoComments.length }}</span>
              </div>
              <div class="d-flex align-items-center">
                <p class="like-num me-1 fs-4">{{ photo.likes.length }}</p>
                <button @click="likePhoto()" class="btn fs-1 text-warning text-shadow">
                  <i v-if="photo.likes.find((id) => id == account?.id)" class="mdi mdi-heart"></i>
                  <i v-else class="mdi mdi-heart-outline"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ms-5 display-inline d-flex gap-4">
      <AlbumPhotoButton v-if="account" />
      <div>
        <button v-if="photo.creatorId == account?.id" @click="deletePhoto()" type="button"
          class="btn btn-danger text-light text-shadow">
          Delete this photo
        </button>
      </div>
    </div>
    <div class="row text-center bg-primary">
      <h1 v-if="photo.creatorId != account?.id" class="col-12 text-light mt-3 mb-3">
        More Photos from
        <RouterLink :to="{ name: 'Profile', params: { profileId: photo.creatorId } }">
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
  </div>
  <div v-else class="mt-5 container text-warning main-font">
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
