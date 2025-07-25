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
    <div v-for="comment in comments" :key="comment.id" class="col-12">
      <div class="d-flex justify-content-between mb-2 align-items-center">
        <img
          class="commenter-photo"
          :src="comment.creator.picture"
          :alt="comment.creator.name"
        />
        <p>{{ comment.body }}</p>
      </div>
    </div>
    <div class="comment-bar">
      <form @submit.prevent="submitComment()">
          <div class="d-flex align-items-end">
            <div class="w-100">
              <div class="form-floating">
                <textarea
                  v-model="commentBody"
                  name="body"
                  class="form-control"
                  title="comment body"
                  id="commentBody"
                  placeholder="Leave a comment here"
                ></textarea>
                <label for="commentBody">Leave a comment here</label>
              </div>
            </div>
            <button
              type="submit"
              class="btn w-25 text-center p-0 ms-2 fs-4 position-absolute">
              <i class="mdi mdi-send"></i>
            </button>
          </div>
        </form>
      </div>
  </section>
</template>

<style lang="scss" scoped>
textarea {
  resize: none;
  height: 4rem;
  width: 100%;
}

.comment-bar {
  position: sticky;
  bottom: 5%;
}

@media (max-width: 433px) {
  .position-absolute {
    right: 0;
    margin-right: 0px;
  }
}

@media (min-width: 434px) and (max-width: 575px) {
    .position-absolute {
    right: 0;
    margin-right: -15px;
  }
}

@media (min-width: 576px) and (max-width: 991px) {
  .position-absolute {
    right: 0;
    margin-right: -20px;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .position-absolute {
    right: 0;
    margin-right: -55px;
  }
}
@media (min-width: 1200px) {
  .position-absolute {
    right: 0;
    margin-right: -100px;
  }
}


.mdi-send {
  color: var(--bs-warning);

  &:hover {
    color: var(--bs-success);
  }

  &:active {
    border: none;
    color: var(--bs-primary);
  }
}

.btn:active {
  border: 1px transparent;
}

.commenter-photo {
  height: 100px;
  aspect-ratio: 1/1;
  border-radius: 50%;
}
</style>
