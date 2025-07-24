<script setup>
import { PhotoComment } from "@/models/Comment.js";

defineProps({
    photoComment: { type: PhotoComment, required: true },
});
</script>

<template>
    <div class="card">
        <div class="card-body">
            <img :src="" alt="">Image
            <h5 class="card-title">Name{{ photoComment.body }}</h5>
            <p class="card-text">Comment</p>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>