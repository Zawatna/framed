<script setup>
import { AppState } from "@/AppState.js";
import { computed, ref } from "vue";

const editableSearchTerm = ref("");
const searchTerm = computed(() => AppState.searchTerm);
</script>

<template>
  <section class="contiainer-fluid main-font">
    <div class="row">
      <div class="col-12">
        <div class="d-flex flex-column background-blur text-light">
          <div>
            <input v-model="editableSearchTerm" type="text" id="search-bar" />
            <label for="search-bar"><i class="mdi mdi-magnify"></i></label>
          </div>
          <h1 v-if="searchTerm" class="fs-1 text-light px-3">
            Searching for {{ searchTerm }}
          </h1>
          <h1 v-else class="fs-1 text-light px-3">Start Searching</h1>
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
