<script setup>
import { Account } from "@/models/Account.js";

defineProps({ profile: Account });
</script>

<template>
  <RouterLink :to="{ name: 'Profile', params: { profileId: profile.id } }">
    <div class="text-center profile-card">
      <img class="profile-pic" :src="profile.picture" :alt="profile.name" />
      <p class="fs-3">{{ profile.name }}</p>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
.profile-card {
  background-color: var(--bs-primary);
  width: 70%;
  padding: 0.3rem;
  color: var(--bs-success);
  border-radius: 30px;
  transition: ease 0.4s;
  text-shadow: 0px 0px 1px var(--bs-light);
  border: solid thin var(--bs-light);
  &:hover {
    box-shadow: 0px 2px 5px var(--bs-light);
    transition: ease 0.2s;
    transform: scale(1.05);
  }
}
.profile-pic {
  border: solid thin var(--bs--secondary);
  height: 150px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}
</style>
