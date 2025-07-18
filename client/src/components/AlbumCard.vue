<script setup>
import { Album } from '@/models/Album.js';
import { albumsService } from '@/services/AlbumsService.js';
import { Pop } from '@/utils/Pop.js';
import { onMounted, ref } from 'vue';


onMounted(() => {
    getAlbumPictureById()
})


const album = defineProps({ album: { type: Album } })
const albumPhoto = ref([])

async function getAlbumPictureById() {
    try {
        const albumId = album.album.id
        albumPhoto.value = await albumsService.getAlbumPictureById(albumId)
    }
    catch (error) {
        Pop.error(error);
    }
}
</script>


<template>
    <router-link :to="{ name: 'AlbumDetailsPage', params: { albumId: album.album.id } }">
        <div class="container justify-content-center mb-5">
            <div class="row text-center">
                <div class="main-font">@{{ album.album.creator.name }}</div>
                <h2 class="main-font">{{ album.album.name }}</h2>
            </div>
            <div class="container" v-if="albumPhoto[3]">
                <div class="row gap-2 justify-content-center">
                    <img :src="albumPhoto[0]?.photo.imgUrl" :alt="album.album.name">
                    <img :src="albumPhoto[1]?.photo.imgUrl" :alt="album.album.name">
                    <div>
                        <div class="row gap-2 justify-content-center" v-if="album.album.photoCount >= 3">
                            <img :src="albumPhoto[2]?.photo.imgUrl" :alt="album.album.name">
                            <div class="grey-square bg-grey main-font d-flex align-items-center text-center">
                                {{ album.album.photoCount - 3 }} more photos...</div>
                        </div>
                        <div class="row gap-2 justify-content-center" v-else>
                            <img :src="albumPhoto[3]?.photo.imgUrl" :alt="album.album.name">
                            <div class="grey-square bg-grey main-font d-flex align-items-center text-center">
                                {{ album.album.photoCount }} more photos...</div>
                        </div>
                    </div>
                </div>


            </div>
            <div v-else>
                <div class="row justify-content-center">
                    <div class="col-12 grey-square bg-grey main-font d-flex align-items-center text-center">Add photos
                        to see them here!</div>
                </div>
            </div>
        </div>
    </router-link>
</template>

<!-- <div class="d-flex "> -->
<!-- <img :src="album.photo[1]" :alt="album.name">
    <img :src="album.photo[2]" :alt="album.name">
    <img :src="album.photo[3]" :alt="album.name"> -->
<!-- </div> -->

<style lang="scss" scoped>
.grey-square {
    height: 300px;
    width: 30vw;
    border-width: 1.5vw;
    border-style: ridge;
    border-color: #bebebe;
}

img {
    height: 300px;
    width: 30vw;
    padding: 0;
    border-width: 1.5vw;
    border-style: ridge;
    border-color: #bebebe;
    object-fit: cover;
}

@media only screen and (max-width: 600px) {
    img {
        height: 15vh;
        width: 30vw;
        padding: 0;
        border: 10px;
        border-style: ridge;
        border-color: #bebebe;
        object-fit: cover;
    }

    .grey-square {
        height: 15vh;
        width: 30vw;
        border: 10px;
        border-style: ridge;
        border-color: #bebebe;
    }

    a {
        text-decoration: none;
        color: white // color: var(--bs--black)
    }

}
</style>