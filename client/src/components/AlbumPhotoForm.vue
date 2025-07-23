<script setup>
import { AppState } from "@/AppState.js";
import { accountService } from "@/services/AccountService.js";
import { albumsService } from "@/services/AlbumsService.js";
import { logger } from "@/utils/Logger.js";
import { Pop } from "@/utils/Pop.js";
import { Modal } from "bootstrap";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
const account = computed(() => AppState.account);
const route = useRoute();
const userAlbums = computed(() => AppState.userAlbums.filter(album => album.isArchived == false));

watch(account, getAlbumsByProfileId);

const albumId = ref("");

async function getAlbumsByProfileId() {
  if (!account.value) {
    return;
  }
  try {
    const albums = await accountService.getAlbumsByAccountId();
    logger.log("getting your albums" + albums);
  } catch (error) {
    logger.error(error);
    Pop.error(error);
  }
}
async function addPhotoToAlbum() {
  try {
    const photoId = route.params.photoId;
    const album = albumId.value;
    logger.log(photoId, album);
    const albumPhoto = await albumsService.addPhotoToAlbum(photoId, album);
    Modal.getOrCreateInstance("#albumPhoto").hide();
    albumId.value = "";
    Pop.success(albumPhoto);
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
