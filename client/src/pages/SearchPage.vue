<script setup>
import { AppState } from "@/AppState.js";
import AlbumSearchCard from "@/components/AlbumSearchCard.vue";
import PhotoSearchCard from "@/components/PhotoSearchCard.vue";
import ProfileSearchCard from "@/components/ProfileSearchCard.vue";
import { albumsService } from "@/services/AlbumsService.js";
import { photosService } from "@/services/PhotosService.js";
import { profilesService } from "@/services/ProfilesService.js";
import { tagsService } from "@/services/TagsService.js";
import { logger } from "@/utils/Logger.js";
import { Pop } from "@/utils/Pop.js";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
// SECTION variables
const photos = computed(() => AppState.photos);
const albums = computed(() => AppState.albums);
const profiles = computed(() => AppState.profiles);
const searchTerm = computed(() => AppState.searchTerm);
const editableSearchTerm = ref("");
const searchTypes = ["albums", "photos", "profiles", "tags"];
const selectedSearch = ref("albums");
const route = useRoute();
// !SECTION
onMounted(() => {
  searchFramed(selectedSearch.value);
  editableSearchTerm.value = searchTerm.value;
});
async function searchFramed(type) {
  route.query.value = selectedSearch.value;
  selectedSearch.value = type;
  const queryTerm = editableSearchTerm.value || editableSearchTerm.value;
  try {
    if (type == "albums") {
      const albums = await albumsService.getAlbumsByQuery(queryTerm);
      logger.log("getting Albums" + albums);
    }
    if (type == "photos") {
      const photos = await photosService.getPhotosByQuery(queryTerm);
      logger.log("here are the photos", photos);
    }
    if (type == "profiles") {
      const profiles = await profilesService.getProfilesByQuery(queryTerm);
      logger.log("getting profiles", profiles);
    }
    if (type == "tags") {
      const photoTags = await tagsService.getPhotoTagsByQuery(queryTerm);
      // const albumTags = await tagsService.getAlbumTagsByQuery(queryTerm);
      logger.log("getting Albums", photoTags);
    }
  } catch (error) {
    Pop.error(error);
    logger.error("could not search framed");
  }
}
</script>

<template>
  <div
    class="d-flex flex-column shadow text-center text-light ps-3 mb-3 justify-content-center align-items-center main-font">
    <h1 v-if="searchTerm" class="fs-1 text-light">
      Searching for {{ searchTerm }} {{ selectedSearch }}
    </h1>
    <h1 v-else class="fs-1 text-light px-3">Start Searching</h1>
    <form @submit.prevent="searchFramed(selectedSearch)">
      <div class="gap-3 d-flex">
        <input v-model="editableSearchTerm" type="text" id="search-bar" />
        <label for="search-bar" aria-label="search bar" aria-labelledby="search bar"></label>
        <button type="submit">Search<i class="mdi mdi-magnify"></i></button>
      </div>
    </form>
  </div>
  <section class="contiainer main-font">
    <div class="row">
      <div class="col-12">
        <div class="d-flex gap-2 justify-content-center">
          <button v-for="type in searchTypes" :key="type" type="button" @click="searchFramed(type)" :class="selectedSearch != type
              ? 'btn-warning text-light'
              : 'btn-success fw-bold'
            " class="btn fs-5">
            {{ type }}
          </button>
        </div>
      </div>
    </div>
    <section v-if="selectedSearch == 'albums'" class="text-light">
      <div class="row d-flex mb-5 mx-3">
        <div class="col-lg-3 col-md-6 pt-2" v-for="album in albums" :key="album.id">
          <AlbumSearchCard :album />
        </div>
      </div>
    </section>
    <section v-if="selectedSearch == 'photos'" class="text-light">
      <div class="row d-flex mb-5 mx-3">
        <div class="col-lg-3 col-md-6 pt-2" v-for="photo in photos" :key="photo.id">
          <PhotoSearchCard :photo />
        </div>
      </div>
    </section>
    <section v-if="selectedSearch == 'profiles'" class="text-light">
      <div class="row d-flex mb-5 mx-3">
        <div class="col-md-3 pt-2" v-for="profile in profiles" :key="profile.id">
          <ProfileSearchCard :profile />
        </div>
      </div>
    </section>
    <section v-if="selectedSearch == 'tags'" class="text-light">
      <div class="row d-flex mb-5 mx-3">
        <div class="col-md-6">
          <div class="my-2">
            <span class="fs-1 search-label">Photos</span>
          </div>
          <div class="row">
            <div class="col-lg-6" v-for="photo in photos" :key="photo.id">
              <PhotoSearchCard :photo />
            </div>
          </div>
        </div>
        <div class="col-md-6 border-start">
          <div class="my-2">
            <span class="fs-1 search-label">Albums</span>
          </div>
          <div class="row">
            <div class="col-lg-6" v-for="album in albums" :key="album.id">
              <AlbumSearchCard :album />
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.shadow {
  text-shadow: 0px 1px 3px black;
}

.search-label {
  position: sticky;
  top: 0;
  z-index: 9999;
  text-shadow: 0px 1px 3px black;
  background-color: var(--bs-primary);
  padding: 0.3rem;
  padding-top: 0;
  margin-bottom: 3rem;
  border-radius: 20px;
  box-shadow: 0px 1px 3px var(--bs-secondary);
}
</style>
