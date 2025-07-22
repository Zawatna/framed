<script setup>
import { AppState } from "@/AppState.js";
import { accountService } from "@/services/AccountService.js";
import { logger } from "@/utils/Logger.js";
import { Pop } from "@/utils/Pop.js";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
const account = computed(() => AppState.account);
const route = useRoute();
const userAlbums = computed(() => AppState.userAlbums);

watch(account, getAlbumsByProfileId);

const albumId = ref("");

async function getAlbumsByProfileId() {
  if (!account.value) {
    return;
  }
  try {
    const albums = await accountService.getAlbumsByAccountId();
    logger.log(albums);
  } catch (error) {
    logger.error(error);
    Pop.error(error);
  }
}
async function addPhotoToAlbum() {
  try {
    logger.log(albumId.value);
  } catch (error) {
    logger.error(error);
    Pop.error(error);
  }
}
</script>

<template>
  <form @submit.prevent="addPhotoToAlbum()">
    <div>
      <select
        v-model="albumId"
        class="form-select"
        aria-label="Default select example"
        required
      >
        <option selected disabled>Select Your Album</option>
        <option v-for="album in userAlbums" :key="album.id" :value="album.id">
          {{ album.name }}
        </option>
      </select>
      <button type="submit">Add this photo to your album</button>
    </div>
  </form>
</template>

<style lang="scss" scoped></style>
