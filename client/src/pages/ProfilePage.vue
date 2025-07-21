<script setup>
import { photosService } from '@/services/PhotosService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

onMounted(() => {
  getUserPhotos();
})

const route = useRoute();

async function getUserPhotos() {
  try {
    const profileId = route.params.profileId;
    await photosService.getUserPhotos(profileId);
  }
  catch (error){
    Pop.error(error);
    logger.error('could not get user posts', error);
  }
}
</script>


<template>
  <section>
    
  </section>
</template>


<style lang="scss" scoped>

</style>