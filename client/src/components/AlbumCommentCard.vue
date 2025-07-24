<script setup>
import { AppState } from "@/AppState.js";
import { albumCommentsService } from "@/services/AlbumCommentsService.js";
import { logger } from "@/utils/Logger.js";
import { Pop } from "@/utils/Pop.js";
import { Modal } from "bootstrap";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const commentBody = ref("");
const comments = computed(() => AppState.album.comments);

async function submitComment() {
  try {
    const albumId = route.params.albumId;
    const body = commentBody.value;
    logger.log(albumId, body);
    await albumCommentsService.submitComment(albumId, body);
    commentBody.value = "";
    Modal.getOrCreateInstance("#albumCommentModal").hide();
  } catch (error) {
    Pop.error(error);
    logger.error(error);
  }
}
</script>

<template>
  <section class="container-fluid main-font">
    <form @submit.prevent="submitComment()">
      <div class="row">
        <div class="col-11">
          <div class="form-floating">
            <textarea
              v-model="commentBody"
              name="body"
              class="form-control"
              title="comment body"
              id="commentBody"
            ></textarea>
            <label for="commentBody">Leave a comment here</label>
          </div>
        </div>
        <div class="col-1">
          <button
            type="submit"
            class="btn btn-success w-100 h-100 text-center p-0"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
    <hr />
    <div v-for="comment in comments" :key="comment.id" class="col-12">
      <div>
        <span>{{ comment.body }}</span>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
textarea {
  resize: none;
  height: 4rem;
  width: 100%;
}
</style>
