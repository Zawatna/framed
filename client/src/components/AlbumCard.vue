<script setup>
import { Album } from '@/models/Album.js';



defineProps({album: {type: Album}})
</script>


<template>
    <div class="container justify-content-center mb-5">
        <div class="row text-center">
            <div class="main-font">@{{ album.creator.name }}</div>
            <h2 class="main-font">{{ album.name }}</h2>
        </div>
            <div class="row gap-2 justify-content-center">
                    <img :src="album.coverImg" :alt="album.name">
                    <img :src="album.coverImg" :alt="album.name">
            <div>
            <div class="row gap-2 justify-content-center">
                    <img :src="album.coverImg" :alt="album.name">
                    <div class="grey-square bg-grey main-font d-flex align-items-center text-center">13 more photos...</div>
            </div>
            </div>
        </div>
    </div>
</template>

<!-- <div class="d-flex "> -->
    <!-- <img :src="album.photo[1]" :alt="album.name">
    <img :src="album.photo[2]" :alt="album.name">
    <img :src="album.photo[3]" :alt="album.name"> -->
<!-- </div> -->

<style lang="scss" scoped>
    .grey-square{
    height: 300px;
    width: 30vw;
    border: 10px;
    border-style:ridge;
    border-color: #bebebe;
    }

    img{
    height: 300px;
    width: 30vw;
    padding: 0;
    border: 10px;
    border-style:ridge;
    border-color: #bebebe;
    object-fit:cover;
    }

@media only screen and (max-width: 600px){
img{
    height: 15vh;
    width: 30vw;
    padding: 0;
    border: 10px;
    border-style:ridge;
    border-color: #bebebe;
    object-fit:cover;
}

.grey-square{
    height: 15vh;
    width: 30vw;
    border: 10px;
    border-style:ridge;
    border-color: #bebebe;
}

}
</style>