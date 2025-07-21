<script setup>
import { onMounted, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '@/AppState.js';
import { Pop } from '@/utils/Pop.js';
import { logger } from "@/utils/Logger.js"
import { albumsService } from '@/services/AlbumsService.js';

const route = useRoute()

const album = computed(() => AppState.album)
const albumPhoto = ref([])

const gridPattern = ref(['box-md', 'box-sm', 'box-sm', ])



async function getAlbumById() {
    try {
        const albumId = route.params.albumId
        await albumsService.getAlbumById(albumId)
    }
    catch (error) {
        Pop.error(error);
        logger.error(error)
    }
}

async function getAlbumPictureById() {
    try {
        const albumId = route.params.albumId
        albumPhoto.value = await albumsService.getAlbumPictureById(albumId)
        // logger.log('album photo?', albumPhoto);
    }
    catch (error) {
        Pop.error(error);
        logger.error(error)
    }
}


onMounted(() => {
    getAlbumById()
    getAlbumPictureById()
})

</script>


<template>
    <div v-if="AppState.album" class="main-font">
        <div class="small-container mx-auto mt-4">
            <div class="row">
                <h2 class="col-6 justify-content-md-end d-flex">{{ album.name }}</h2>
                <div class="col-6 d-flex justify-content-center align-items-center justify-content-md-start">
                    <!-- TODO - make button work -->
                    <!-- <button class="fancy-font btn btn-warning rounded-pill">Follow Album</button> -->
                    <button class="button-92" role="button">Follow Album</button>
                </div>
                <div class="row justify-content-center mt-3">
                  <div class="col-5">
                    <RouterLink :to="{ name: 'Profile', params: { profileId: album.creator.id } }">
                      <h4 class="font-grey text-end">@{{ album.creator.name }}</h4>
                    </RouterLink>
                  </div>
                    <div class="col-1 text-center">||</div>
                    <h4 class="font-grey col-5">{{ album.photoCount }} photos</h4>
                </div>
                <div class="row fs-3">
                    <div class="text-center">
                        {{ album.description }}
                    </div>
                </div>
                <div v-if="album.photoCount">
                    <div class="row justify-content-center" v-for="albumtag in album.tags" :key="albumtag.id" >
                        <div class="col-3 justify-content-center d-flex m-2">
                            <div class="button before">#{{ albumtag.tag.name }}</div>
                        </div>
                    </div>
                </div>
                <h3 v-else class="mt-3 text-center">Add pictures to see them here!</h3>
                <br>
            </div>
        </div>
    </div>
    <div v-else>loading <span class="mdi mdi-loading mdi-spin"></span></div>
    <!-- SECTION ALBUM PHOTOS  -->
    <!-- <div class="container-fluid" v-if="albumPhoto">
      <div class="row gap-2 justify-content-center">
          <div class="d-flex justify-content-center col-lg-3 mx-lg-3 col-md-5 mx-md-2" v-for="albumPhotos in albumPhoto" :key="albumPhotos.id">
              <img class="album-image border-cream" :src="albumPhotos.photo.imgUrl"
                  :alt="albumPhotos.photo.creator.name">
              
          </div>
      </div>
    </div> -->
    <div class="container-fluid" v-if="albumPhoto">
      <div class="wrapper">

        <div v-for="(albumPhotos, n) in albumPhoto" :key="`albumPhotos-${n}`" :class="gridPattern[n % gridPattern.length]">
          
            <img :src="albumPhotos.photo.imgUrl" class="img-fluid w-100">
          
        </div>

      </div>
    </div>
    <!-- !SECTION -->
    <!-- <div v-else>add pictures to the album to see them here!</div> -->

</template>


<style lang="scss" scoped>

img {
  border: 2px solid tan;
}

.wrapper {
  display: grid;
  // grid-auto-flow: column;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
}

.box-md{
  grid-column: auto / span 2;
  grid-row: auto / span 2;
}

.box-sm{
grid-column: auto / span 1;
  grid-row: auto / span 1;
}

// .box0 {
//   grid-column-start: 1;
//   grid-column-end: 3;
//   grid-row-start: 1;
//   grid-row-end: 5;
// }

// .box1 {
//   grid-column-start: 3;
//   grid-column-end: 4;
//   grid-row-start: 1;
//   grid-row-end: 3;
// }

// .box2 {
//   grid-column-start: 4;
//   grid-column-end: 5;
//   grid-row-start: 1;
//   grid-row-end: 3;
// }

// .box3 {
//   grid-column-start: 3;
//   grid-column-end: 5;
//   grid-row-start: 2;
//   grid-row-end: 4;
// }

// .box4 {
//   grid-column-start: 1;
//   grid-column-end: 2;
//   grid-row-start: 3;
//   grid-row-end: 4;
// }

// .box5 {
//   grid-column-start: 2;
//   grid-column-end: 3;
//   grid-row-start: 3;
//   grid-row-end: 4;
// }

* {
    color: white
}

a {
  text-decoration: none;
  color: rgb(163, 162, 162);
}

.font-grey {
    color: rgb(195, 195, 195);
}

.small-container {
    width: 80vw;
}

.album-image {
    height: 250px;
    width: auto;
    object-fit: cover;
}

.border-cream {
    border: 10px;
    border-style: ridge;
    border-color: #bebebe;
}



.button-92 {
  --c: #fff;
  /* text color */
  background: linear-gradient(90deg, #0000 33%, #fff5, #0000 67%) var(--_p,100%)/300% no-repeat,
    #004dff;
  /* background color */
  color: #0000;
  border: none;
  transform: perspective(500px) rotateY(calc(20deg*var(--_i,-1)));
  text-shadow: calc(var(--_i,-1)* 0.08em) -.01em 0   var(--c),
    calc(var(--_i,-1)*-0.08em)  .01em 2px #0004;
  outline-offset: .1em;
  transition: 0.3s;
}

.button-92:hover,
.button-92:focus-visible {
  --_p: 0%;
  --_i: 1;
}

.button-92:active {
  text-shadow: none;
  color: var(--c);
  box-shadow: inset 0 0 9e9q #0005;
  transition: 0s;
}

.button-92 {
  font-weight: bold;
  font-size: 2rem;
  margin: 0;
  cursor: pointer;
  padding: .1em .3em;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3em;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', 'Open Sans', system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
}

.button.before {
  position: relative;
  border: 1px solid #0360df;
  border-radius: 50px;
  padding: 8px 16px;
  min-width: 8em;
  background-color: #0360df;
  background-image:
    radial-gradient(75% 50% at 50% 0%, #f4feff, transparent),
    radial-gradient(75% 35% at 50% 85%, #8de3fc, transparent);
  box-shadow:
    inset 0 -2px 4px 1px rgba(17, 110, 231, .6),
    inset 0 -4px 4px 1px rgba(141, 227, 252, 1),
    inset 0 0 2px 1px rgba(255, 255, 255, .2),
    0 1px 4px 1px rgba(17, 110, 231, .2),
    0 1px 4px 1px rgba(0, 0, 0, .1);
  color: #fff;
  text-align: center;
  text-shadow: 0 1px 1px #116ee7;
  transition-property: border-color, transform, background-color;
  transition-duration: .2s;
  
  &::after {
    content: '';
    position: absolute;
    top: 1px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50px;
    width: 80%;
    height: 40%;
    background-image: linear-gradient(to bottom, #f4feff, transparent);
    opacity: .75;
  }
  
  &:hover {
    transform: scale(1.04);
  }
  
  &:active {
    border-color: #0048d5;
    transform: scale(.96);
    background-color: #0048d5;
  }
}

.button.after {
  position: relative;
  z-index: 0;
  border: 1px solid #3247cf;
  border-radius: 8px;
  padding: 8px 16px;
  min-width: 8em;
  background-image: linear-gradient(180deg, #4098ff, #4058ff 62%, #4075ff);
  box-shadow: 
    inset 0 1px 0px rgba(255, 255, 255, .2),
    inset 0 -1px 0px rgba(0, 0, 0, .2),
    0 1px 2px rgba(0, 0, 0, .2);
  font-family: 'Roobert', sans-serif;
  font-weight: 500;
  text-align: center;
  color: #fff;
  text-shadow: 0 1px rgba(0, 0, 0, .2);
  transition-property: border-color, transform;
  transition-duration: .2s;
  will-change: transform;
  
  @media (hover: hover) {
    &:hover {
      transform: scale(1.04);
    }
  }
  &:active {
    border-color: #192ba1;
    transform: scale(.98);
  }

}

.button-label {
  font-style: italic;
  color: #c0c0d8;
}



// img{
// height: 500px;
// width: 30vw;
// padding: 0;
// border: 10px;
// border-style:ridge;
// border-color: #bebebe;
// object-fit:cover;
</style>
