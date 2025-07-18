<script setup>
import { AppState } from "@/AppState.js";
import { albumsService } from "@/services/AlbumsService.js";
import { logger } from "@/utils/Logger.js";
import { Pop } from "@/utils/Pop.js";
import { computed, ref, watch } from "vue";
// SECTION variables
const editableSearchTerm = ref("");
const searchTerm = computed(() => AppState.searchTerm);
const searchTypes = ["albums", "photos", "profiles", "tags"];
const selectedSearch = ref("albums");
// !SECTION
watch(selectedSearch, searchFramed);

async function searchFramed(type) {
  try {
    selectedSearch.value = type ? type : selectedSearch.value;
    if (selectedSearch.value == "albums") {
      const albums = await albumsService.getAlbumsByQuery(
        editableSearchTerm.value
      );
      logger.log(albums);
    }
  } catch (error) {
    Pop.error(error);
    logger.error("could not search framed");
  }
}
</script>

<template>
  <div class="d-flex flex-column background-blur text-center text-light ps-3 justify-content-center align-items-center">
    <h1 v-if="searchTerm" class="fs-1 text-light">
      Searching for {{ searchTerm }}
    </h1>
    <h1 v-else class="fs-1 text-light px-3">Start Searching</h1>
    <div class="gap-3 d-flex">
      <input v-model="editableSearchTerm" type="text" id="search-bar" />
      <label for="search-bar"><button>Search <i class="mdi mdi-magnify"></i></button></label>
    </div>
  </div>
  <section class="contiainer-fluid main-font">
    <div class="row">
      <div class="col-12">
        <div>
          <button v-for="type in searchTypes" :key="type" type="button" @click="searchFramed(type)">
            {{ type }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.background-blur {
  backdrop-filter: blur(3px);
  text-shadow: 0px 1px 3px black;
}
</style>
