<script setup>
import { AppState } from "@/AppState.js";
import ModalWrapper from "@/components/ModalWrapper.vue";
import PhotoUploadForm from "@/components/PhotoUploadForm.vue";
import PopChoice from "@/components/PopChoice.vue";
import AlbumForm from "@/components/AlbumForm.vue";
import { computed } from "vue";
import { AuthService } from "@/services/AuthService.js";
import AlbumPhotoForm from "./AlbumPhotoForm.vue";
import EditProfileForm from "./EditProfileForm.vue";
import ModalWrapperXL from "./ModalWrapperXL.vue";
import PhotoCommentForm from "./PhotoCommentForm.vue";
import PhotoCommentCard from "./PhotoCommentCard.vue";

const account = computed(() => AppState.account);
const album = computed(() => AppState.album);
const photoComments = computed(() => AppState.photoComments);

function updateImgI() {
  AppState.choicePhotoIndex++;
}

function login() {
  AuthService.loginWithRedirect();
}
</script>

<template>
  <section class="container-fluid fixed-bottom">
    <div class="row footer-wrapper">
      <div class="col-3">
        <RouterLink v-if="account"
          :to="{ name: 'Profile', params: { profileId: account.id } }"
        >
          <i
            v-if="account"
            class="mdi mdi-account footer-icon text-success"
          ></i>
          <i
            v-else
            @click="login()"
            role="button"
            class="mdi mdi-login footer-icon text-success"
          ></i>
        </RouterLink>
      </div>
      <div class="col-3">
        <RouterLink :to="{ name: 'Home' }">
          <i class="mdi mdi-home footer-icon text-danger"></i>
        </RouterLink>
      </div>
      <div class="col-3">
        <!--ADD CREATE IMAGE MODAL HERE-->
        <i class="col-3 mdi mdi-image footer-icon text-warning" role="button" data-bs-toggle="modal"
          data-bs-target="#popChoice" @click="updateImgI()"></i>
      </div>
      <div class="col-3">
        <RouterLink :to="{ name: 'Search' }">
          <i class="col-3 mdi mdi-magnify footer-icon text-secondary"></i>
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- NOTE MODAL WRAPPER SLOT FOR PHOTO Form -->
  <ModalWrapper modalId="photoUploadForm" modalHeader="Add A Photo">
    <PhotoUploadForm />
  </ModalWrapper>
  <!-- NOTE MODAL WRAPPER FOR "popChoice" MODAL -->
  <!-- NOTE All modals need to be on the footer to be interactable -->
  <ModalWrapper modalId="popChoice" modalHeader="What Would You Like to Create?">
    <PopChoice />
  </ModalWrapper>
  <ModalWrapper modalId="albumUploadForm" modalHeader="Add An Album">
    <AlbumForm />
  </ModalWrapper>
  <ModalWrapper v-if="account" modalId="albumPhoto" modalHeader="Which album would you like to add this photo to?">
    <AlbumPhotoForm />
  </ModalWrapper>

  <!-- photocomments -->
  <ModalWrapper modalId="commentModal" modalHeader="comments go here">
    <div v-for="photoComment in photoComments" :key="photoComment.creatorId">
      <PhotoCommentCard :photoComment="photoComment" />
    </div>
    <div>
      <PhotoCommentForm />
    </div>
  </ModalWrapper>
  <ModalWrapperXL modalId="editProfile" modalHeader="Update your profile!">
    <section v-if="account">
      <EditProfileForm />
    </section>
  </ModalWrapperXL>
  <ModalWrapper v-if="album"
    modalId="albumCommentModal"
    :modalHeader="'Comments for ' + album.name + ' album'"
  >
  </ModalWrapper>
</template>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.footer-icon {
  font-size: 60px;
  text-shadow: 1px 1px 3px black;
  transition: all 0.25s ease-in-out;

  &:hover {
    text-shadow: 1px 1px 2px yellow, 2px 2px 3px white, 3px 3px 2px orange;
    transition: all 0.25s linear;
  }

  &:active {
    text-shadow: 1px 1px 3px lightblue;
    transition: none;
  }
}

.footer-wrapper {
  height: 80px;
  background: #0f0050;
  background: radial-gradient(circle,
      rgba(15, 0, 80, 0.53) 33%,
      rgba(0, 0, 0, 0.6) 100%);
  backdrop-filter: blur(5px);
}
</style>
