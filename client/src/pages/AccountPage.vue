<script setup>
import { AppState } from '@/AppState.js';
import { computed } from 'vue';


const account = computed(() => AppState.account);

</script>

<template>
  <div class="about text-center text-light text-shadow main-font">
    <div v-if="account">

      <h1 class="fancy-font">Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>
    </div>
    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>




    <button type="button" class="framed-font ">Edit Profile</button>
  </div>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
