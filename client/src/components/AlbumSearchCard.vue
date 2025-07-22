<script setup>
import { Album } from "@/models/Album.js";
import { RouterLink } from "vue-router";

defineProps({ album: { type: Album } });
</script>

<template>
  <div v-if="album.photos?.length > 0" class="album-card">
    <RouterLink
      :to="{ name: 'AlbumDetailsPage', params: { albumId: album.id } }"
    >
      <div>
        <span class="album-title main-font">
          {{ album.name }} by <b>{{ album.creator.name }}</b>
        </span>
      </div>
      <div class="">
        <img
          src="../assets/img/polaroid-frame-PNG-for-photoshop.png"
          class="polaroid-frame-1"
        />
        <img
          class="album-photo photo-1"
          :src="album.photos[0].photo.imgUrl"
          :alt="album.photos[0].photo.name"
        />
      </div>
      <div class="position-relative">
        <img
          src="../assets/img/polaroid-frame-PNG-for-photoshop.png"
          class="polaroid-frame-2"
        />
        <img
          class="album-photo photo-2"
          :src="
            album.photos[1]?.photo.imgUrl || '../assets/img/framed-logo.png'
          "
          :alt="album.photos[1]?.photo.name || 'framed logo'"
        />
      </div>
      <div class="position-relative">
        <div>
          <img
            src="../assets/img/polaroid-frame-PNG-for-photoshop.png"
            class="polaroid-frame-3"
          />
          <img
            class="album-photo photo-3 polaroid-frame"
            :src="
              album.photos[2]?.photo.imgUrl || '../assets/img/framed-logo.png'
            "
            :alt="album.photos[2]?.photo.name || 'framed logo'"
          />
        </div>
      </div>
    </RouterLink>
  </div>
  <div v-else class="album-card">
    <RouterLink
      :to="{ name: 'AlbumDetailsPage', params: { albumId: album.id } }"
    >
      <div>
        <span class="album-title main-font">
          {{ album.name }} by <b>{{ album.creator.name }}</b>
        </span>
      </div>
      <div class="position-relative">
        <img
          src="../assets/img/polaroid-frame-PNG-for-photoshop.png"
          class="polaroid-frame-1"
        />
        <img
          class="album-photo photo-1 polaroid-frame"
          src="../assets/img/framed-logo.png"
          alt="framed logo"
        />
      </div>
      <div class="position-relative">
        <img
          src="../assets/img/polaroid-frame-PNG-for-photoshop.png"
          class="polaroid-frame-2"
        />
        <img
          class="album-photo photo-2 polaroid-frame"
          src="../assets/img/framed-logo.png"
          alt="framed logo"
        />
      </div>
      <div class="position-relative">
        <div>
          <img
            src="../assets/img/polaroid-frame-PNG-for-photoshop.png"
            class="polaroid-frame-3"
          />
          <img
            class="album-photo photo-3 polaroid-frame"
            src="../assets/img/framed-logo.png"
            alt="framed logo"
          />
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.album-card {
  position: relative;
  height: 350px;
}
.polaroid-frame-1 {
  height: 300px;
  position: absolute;
  top: -10px;
  left: -90px;
  z-index: 9998;
}
.polaroid-frame-2 {
  height: 300px;
  position: absolute;
  top: 15px;
  left: -40px;
  z-index: 9996;
}
.polaroid-frame-3 {
  height: 300px;
  position: absolute;
  top: 40px;
  left: 10px;
  z-index: 9994;
}
.album-title {
  z-index: 9999;
  position: absolute;
  max-width: 300px;
  background-color: var(--bs-primary);
  padding: 0.3rem;
  border-radius: 15px;
  top: 100px;
  left: 20px;
  color: var(--bs-light);
  text-shadow: 0px 0px 2px black;
}
.album-photo {
  height: 210px;
  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: center;
}
.photo-1 {
  position: absolute;
  top: 15px;
  left: 20px;
  z-index: 9997;
}
.photo-2 {
  position: absolute;
  top: 40px;
  left: 65px;
  z-index: 9995;
}
.photo-3 {
  position: absolute;
  top: 65px;
  left: 110px;
  z-index: 9993;
}
</style>
