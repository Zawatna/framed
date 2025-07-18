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
                    <button class="fancy-font btn btn-warning rounded-pill">Follow Album</button>
                </div>
                <div class="row justify-content-center ">
                    <h4 class="font-grey col-5 text-end">@{{ album.creator.name }}</h4>
                    <div class="col-1 text-center">||</div>
                    <h4 class="font-grey col-5">@{{ album.photoCount }}</h4>
                </div>
                <div class="row fs-3">
                    <div class="text-center">
                        {{ album.description }}
                    </div>
                </div>
                <div class="row justify-content-center" v-for="albumtag in album.tags" :key="albumtag.id">
                    <div class="col-3 justify-content-center d-flex m-2">
                        <div class="btn btn-success rounded-pill text-dark">#{{ albumtag.tag.name }}</div>
                    </div>
                </div>
                <br>
            </div>
        </div>
    </div>
    <div v-else>loading <span class="mdi mdi-loading mdi-spin"></span></div>
    <div class="container-fluid" v-if="albumPhoto">
        <div class="row gap-2 justify-content-center">
            <div class="d-flex justify-content-center" v-for="albumPhotos in albumPhoto" :key="albumPhotos.id">
                <img class="album-image border-cream" :src="albumPhotos.photo.imgUrl"
                    :alt="albumPhotos.photo.creator.name">
                <!-- {{ albumPhotos.photo.imgUrl }} -->
            </div>
        </div>
    </div>
    <div v-else>add pictures to the album to see them here!</div>
</template>


<style lang="scss" scoped>
* {
    color: white
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

// img{
// height: 500px;
// width: 30vw;
// padding: 0;
// border: 10px;
// border-style:ridge;
// border-color: #bebebe;
// object-fit:cover;
// }</style>
