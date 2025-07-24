<script setup>
import { PhotoComment } from "@/models/Comment.js";

defineProps({
  photoComment: { type: PhotoComment, required: true },
});
</script>

<template>
  <div class="card">
    <div class="card-body">
      <img src="" alt="" />Image
      <h4 class="card-title">Name{{ photoComment.creatorId.name }}</h4>
      <p class="card-text">Comment</p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
