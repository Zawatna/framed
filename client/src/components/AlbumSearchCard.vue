<script setup>
import { Album } from "@/models/Album.js";

defineProps({ album: { type: Album } });
</script>

<template>
  <div>{{ album }}</div>
</template>

<style lang="scss" scoped></style>
