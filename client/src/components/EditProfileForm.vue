<script setup>
import { AppState } from '@/AppState.js';
import { accountService } from '@/services/AccountService.js';
import { Pop } from '@/utils/Pop.js';
import { Modal } from 'bootstrap';
import { onMounted, ref } from 'vue';




onMounted(() => {

})

const profile = AppState.profile

async function editProfile() {
  try {
    await accountService.editAccountInfo(formData.value)

    formData.value = {
      bio: '',
      picture: '',
      name: '',
    }
    Modal.getOrCreateInstance('#editProfile').hide()

  }
  catch (error) {
    Pop.error(error);
  }
}


const formData = ref(
  {
    bio: profile.bio ? profile.bio : 'No current Bio',
    picture: profile.picture,
    name: profile.name,
    // email: ''
  }
)

</script>


<template>
  <section>

    <form @submit.prevent="editProfile()" class="container-fluid">
      <div class="row">
        <div class="col-12 mt-3 d-flex flex-wrap justify-content-around">

          <div v-if="formData.picture" class="mb-3 col-12 d-flex flex-wrap justify-content-center">
            <div class="col-12 text-center my-3 fs-3">
              <small class="m-3 bg-info rounded px-2 py-1 text-black ">Image preview</small>

            </div>

            <img :src="formData.picture" alt="Your photo image" class="img-fluid profile-picture">
          </div>

          <div class=" form-floating mb-3 col-md-5">
            <input v-model="formData.picture" type="url" required class="form-control" id="photo-imgUrl"
              placeholder="Upload Photo" maxlength="500">
            <label for="photo-imgUrl">Upload Profile Photo</label>
          </div>


          <div class=" form-floating mb-3 col-md-5">
            <input v-model="formData.name" type="text" minlength="3" maxlength="50" class="form-control" id="photo-name"
              placeholder="Change your name">
            <label for="photo-name">Change your profile name</label>
          </div>

          <div class="col-md-8 form-floating mb-3">
            <textarea v-model="formData.bio" type="text" maxlength="500" class="form-control text-area-size"
              id="photo-description" placeholder="Describe the photo"></textarea>
            <label for="photo-description">Fill out your bio</label>
          </div>



          <div class="col-12 text-center">
            <button class="btn bg-white text-green my-3 mb-5">Submit <i class="mdi mdi-plus"></i></button>
          </div>


        </div>
        <div>This is the best day ever</div>
      </div>
    </form>
  </section>
</template>


<style lang="scss" scoped>
.photo-preview {
  height: 150px !important;
  aspect-ratio: 1/1 !important;

}

.text-area-size {

  min-height: 8rem !important;
}

.profile-picture {
  height: 15dvh;
  max-width: auto;
  aspect-ratio: 1/1;
  border-radius: 50%;
  border-width: 3px !important;


  @media screen and (min-width: 768px) {
    height: 25dvh;
  }

  @media screen and (min-width:2560px) {
    height: 30dvh;
  }

}
</style>