<script setup>
import { Album } from "@/models/Album.js";

defineProps({ album: { type: Album } });
</script>

<template>
  <div>{{ album.photos[0] }}</div>
</template>

<style lang="scss" scoped></style>
