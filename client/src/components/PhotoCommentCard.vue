<script setup>
import { PhotoComment } from "@/models/Comment.js";

defineProps({
    photoComment: { type: PhotoComment, required: true },
});
</script>

<template>
    <section>
        <div class="row">
            <div class="col-2">

                <img class="comment-creator-picture" :src="photoComment.creator.picture" alt="Comment creator's photo">
            </div>
            <div class="col-10">


                <h5 class="card-title">{{ photoComment.creator.name }}</h5>
                <div class="card p-3 m-5">
                    <div class="card-body">
                        <p class="card-text">{{ photoComment.body }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.comment-creator-picture {
    height: 8dvh;
    max-width: auto;
    aspect-ratio: 1/1;
    border-radius: 50%;
    border-width: 3px !important;
    border-style: solid;
    border-color: #F5F5F5;
}
</style>