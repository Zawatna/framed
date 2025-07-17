<script setup>
import { albumService } from '@/services/AlbumService.js';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

onMounted(()=> getAlbumById())


async function getAlbumById() {
    const albumId = route.params.albumId
    await albumService.getAlbumById(albumId)
}
</script>


<template>
    <div>
        <div>test</div>
        Album page!!!!
    </div>
    </template>


<style lang="scss" scoped>
*{
    color: white
}
</style>