<script setup>
import { AppState } from "@/AppState.js";
import AlbumPhotoButton from "@/components/AlbumPhotoButton.vue";
import { photoCommentsService } from "@/services/PhotoCommentsService.js";
import { photosService } from "@/services/PhotosService.js";
import { logger } from "@/utils/Logger.js";
import { Pop } from "@/utils/Pop.js";
import { computed, onMounted, ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";

onMounted(() => {
  getPhotoById();
  getPhotoComments();
  if (photo.value) {
    getPhotosByCreatorId();
  }
});

const route = useRoute();
const router = useRouter();
const photo = computed(() => AppState.photo);
const account = computed(() => AppState.account);
const photoComments = computed(() => AppState.photoComments);
// const photos = computed(() => AppState.photos);
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
  await getPhotosByCreatorId();
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
async function getPhotosByCreatorId() {
  try {
    const creatorId = photo.value.creatorId;
    await photosService.getUserPhotos(creatorId);
  } catch (error) {
    Pop.error(error);
    logger.error("getphotosbycreatorid");
  }
}

const isFlipped = ref(false);
function toggleView() {
  isFlipped.value = !isFlipped.value;
  logger.log(`the view is: ${isFlipped.value}`);
}
</script>

<template>
  <div v-if="photo">
    <section
      class="container-fluid mb-5 main-font flip-box"
      :class="{ 'flip-photo': isFlipped }"
    >
      <div class="row justify-content-center mb-5 flip-box-inner">
        <div class="row justify-content-center mb-5 flip-box-front">
          <div class="frame justify-content-start mt-3 pb-1 px-1">
            <div class="text-center">
              <img
                role="button"
                @click="toggleView()"
                :src="photo.imgUrl"
                :alt="`@${photo.creator.name}'s posted photo`"
                class="img-fluid"
              />
            </div>

            <div>
              <RouterLink
                :to="{
                  name: 'Profile',
                  params: { profileId: photo?.creatorId },
                }"
              >
                <h5 class="img-username">@{{ photo.creator.name }}</h5>
              </RouterLink>
            </div>

            <h4 class="img-desc main-font">{{ photo.description }}</h4>
            <div class="row align-items-center">
              <div
                class="col-12 d-flex ps-4 align-items-center justify-content-between"
              >
                <div>
                  <button
                    class="btn fixed-button m-2"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#commentModal"
                  >
                    <i
                      class="mdi mdi-comment mdi-flip-h fs-1 text-light text-shadow"
                    ></i>
                  </button>
                  <span class="mt-2 ms-1 fs-3">{{ photoComments.length }}</span>
                </div>
                <div class="d-flex align-items-center">
                  <p class="like-num me-1 fs-4">{{ photo.likes.length }}</p>
                  <button
                    @click="likePhoto()"
                    class="btn fs-1 text-warning text-shadow"
                  >
                    <i
                      v-if="photo.likes.find((id) => id == account?.id)"
                      class="mdi mdi-heart"
                    ></i>
                    <i v-else class="mdi mdi-heart-outline"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-center mb-5 flip-box-back">
          <div class="frame mt-3 pb-1 px-1">
            <div class="row">
              <div class="col-6 mt-2">
                <h2>
                  Taken On:
                  {{
                    photo.originalDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  }}
                </h2>
                <h2>
                  Uploaded On:
                  {{
                    photo.uploadedAt.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  }}
                </h2>
              </div>
              <div class="col-6 mt-2">
                <h1 class="mb-4">Tags:</h1>
                <div
                  class="d-flex flex-wrap justify-content-center align-items-center"
                >
                  <div
                    v-for="tag in photo.tags"
                    :key="tag.id"
                    class="badge border rounded bg-success text-light fs-3 px-1 me-2 ms-2 mb-2"
                  >
                    {{ tag.tag.name }}
                  </div>
                </div>
              </div>
            </div>
            <div v-if="photo.description">
              <h5 class="mt-5 mb-4 fs-1">{{ photo.description }}</h5>
            </div>
            <div class="col-5 mt-5 ms-2">
              <h2 v-if="photo.location">Location:</h2>
              <h3>{{ photo.location }}</h3>
            </div>
            <div class="row text-end mt-5 me-3">
              <div
                class="col-12 d-flex justify-content-between align-items-end mt-5"
              >
                <button
                  class="btn fs-1"
                  type="button"
                  @click="toggleView()"
                  title="flip photo over"
                >
                  <i class="mdi mdi-cached"></i>
                </button>
                <h4>
                  Photographed by:
                  <span>
                    <RouterLink
                      :to="{
                        name: 'Profile',
                        params: { profileId: photo.creatorId },
                      }"
                      >@{{ photo.creator.name }}
                    </RouterLink>
                  </span>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="ms-5 display-inline d-flex gap-4">
      <AlbumPhotoButton v-if="account" />
      <div>
        <button
          v-if="photo.creatorId == account?.id"
          @click="deletePhoto()"
          type="button"
          class="btn btn-danger text-light text-shadow"
        >
          Delete this photo
        </button>
      </div>
    </section>
    <section class="row text-center bg-primary mb-5">
      <h1 v-if="photo" class="col-12 text-light mt-3 mb-5">
        More Photos from
        <RouterLink
          :to="{ name: 'Profile', params: { profileId: photo.creatorId } }"
        >
          <span class="username">@{{ photo.creator.name }}</span>
        </RouterLink>
      </h1>
      <!-- TODO CREATE V-FOR ONCE PROFILE/PROFILE IMAGES ROUTE CREATED -->
    </section>
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
.flip-box {
  background-color: transparent;
  width: 525px;
  height: 100dvh;

  perspective: 1000px;
}

.flip-box-inner {
  position: relative;
  width: 100%;
  height: auto;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-photo .flip-box-inner {
  transform: rotateY(180deg);
}

.flip-box-front,
.flip-box-back {
  position: absolute;
  width: 100%;
  height: auto;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-box-front {
  color: black;
}

.flip-box-back {
  color: black;
  transform: rotateY(180deg);
}

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
  aspect-ratio: 2/2;
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
