<script setup>
import { AppState } from '@/AppState.js';
import { profilesService } from '@/services/ProfilesService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted, ref } from 'vue';

let FramedCreators = ref([])
computed(()=> FramedCreators)
const profiles = [
  {name: 'Anthony', profileId: '6883a8f9e4cbf0e7c6fa9a26'},
  {name: 'Greg', profileId: '68531eb14fff83a1438f0b52'},
  {name: 'Julia', profileId: '6877e5c630869a91f0f2dc3a'},
  {name: 'Owen', profileId: '6883a58c2d6378b4827b2ff4'},
  {name: 'Ryan', profileId: '6877e8a31b42de13a18c6299'},
];


async function getProfilesForAbout(){
  try {
    
    logger.log('profile list', profiles)
    for (let i = 0; i < profiles.length; i++) {
        await profilesService.getProfileById(profiles[i].profileId)
        FramedCreators.value.push(AppState.profile)
      }
    logger.log("full framed", FramedCreators)
  }
catch (error){
  Pop.error(error);
}
}


onMounted(()=> getProfilesForAbout())
</script>

<template>
  <section class="bg-blur  main-font">
    <div class="mt-5 d-flex justify-content-center">
      <img
      class="navbar-brand ms-4 rounded"
      alt="logo"
      src="../assets/img/framed-logo.png"
      height="45"
      />
      <b class="big-logo framed-font text-warning ms-1 mt-4">ramed</b>
    </div>
    <div class="text-center container">

          <p class="px-5 fs-5 mt-4">
      This project was created primarily using vue and node. This website is the capstone project for the CodeWorks© Immersive Full Stack course. 
      This "capstone" acts as a sort of final test to show off what we have learned so far.
    </p>
    <p class="px-5 fs-5 pt-3">
      The Framed website is a mobile-forward image sharing website directed at a 25+ age group, 
      playing off of early 2000's nostalgia with the color scheme and background being examples of this.
      The functionality of the site is quite extensive. 
    </p>
      <div class="fs-2 mb-3 mt-4 col-12">An App By:</div>
      <div v-for="FramedCreator in FramedCreators" :key="FramedCreator.profileId" class="mb-4">
        <div class="d-flex align-items-center justify-content-center">
          <img :src="FramedCreator.picture" class="pfp" alt="">
          <RouterLink :to="{ name: 'Profile', params: { profileId: FramedCreator.id },}">
            <div class="ms-3 fs-2 fw-bold fancy-font">{{FramedCreator.name}}</div>
          </RouterLink>
        </div>
        <div v-if="FramedCreator.bio"  class="fs-5" >{{ FramedCreator.bio }}</div>
        <div v-else  class="fs-5" >no bio available</div>
      </div>
      <!-- <div class="row justify-content-center bg-clearish py-3 rounded-pill">
        <div class="col-md-4 pb-3 pb-md-0">
          <h3>Scrum Leader </h3>
          <h5>Julia Kapsoff</h5>
      </div>
      <div class="col-md-4 pb-3 pb-md-0">
        <h3>Product Owner </h3>
        <h5>Ryan Craker</h5>
      </div>
      <div class="col-md-4 pb-3 pb-md-0">
        <h3>Scrum H.R. Manager</h3>
        <h5>Owen Meacham</h5>
      </div>
      <div class="col-md-4 pb-3 pb-md-0">
        <h3>Worker #1</h3>
        <h5>Greg Marlin</h5>
      </div>
      <div class="col-md-4 pb-3 pb-md-0">
        <h3>Worker #2</h3>
        <h5>Anthony Rossman</h5>
      </div>
    </div>
    </div> -->
  </div>
  </section>
  <br>
</template>

<style scoped lang="scss">
*{
  text-decoration: none;
  color:white;
}

img {
  border-radius: 10%;
  width: auto;
  width: 11vw ;
  height:auto ;
}
.framed-font {
  font-size: 6vw;
}
.bg-blur{

  height: 80px;
  background: #0f0050;
  background: radial-gradient(circle,
      rgba(15, 0, 80, 0.53) 33%,
      rgba(0, 0, 0, 0.6) 100%);
  backdrop-filter: blur(5px);
  height:100%;
  padding-bottom:30px
}

.bg-clearish{
  background-color: rgba(0, 0, 0, 0.642);
}
.pfp{
  width: 50px;
  aspect-ratio: 1/1;
  border-radius: 50%;
}
</style>