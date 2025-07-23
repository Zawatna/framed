<script setup>

import { AppState } from '@/AppState.js';
import EditProfileForm from '@/components/EditProfileForm.vue';
import ProfileCard from '@/components/ProfileCard.vue';
import { profilesService } from '@/services/ProfilesService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';


onMounted(() => {
  getProfileById();

})


const profile = computed(() => AppState.profile)

const route = useRoute();

async function getProfileById() {
  try {
    const profileId = route.params.profileId
    await profilesService.getProfileById(profileId)
  }
  catch (error) {
    Pop.error(error);
    logger.error("profile by ID error 🧑‍🦳🧻", error)
  }
}


</script>


<template>
  <ProfileCard />

</template>


<style lang="scss" scoped></style>