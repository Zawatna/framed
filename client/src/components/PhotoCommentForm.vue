<script setup>
import { photoCommentsService } from '@/services/PhotoCommentsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const editableCommentData = ref({
    body: '',
    photoId: ''
})

async function createComment() {
    logger.log('create a comment ✏️💬')
    try {
        editableCommentData.value.photoId = route.params.photoId.toString()
        await photoCommentsService.createComment(editableCommentData.value)
        editableCommentData.value.body = ''
    }
    catch (error) {
        Pop.error(error);
        logger.error('COULD NOT CREATE COMMENT', error)
    }
}

</script>


<template>
    <form @submit.prevent="createComment()">
        <textarea v-model="editableCommentData.body" class="form-control"
            placeholder="Add a comment to the conversation..." id="photo-comment" maxlength="250" required></textarea>
        <label for="photo-comment"></label>
        <button class="btn btn-success m-3" type="submit">Submit Comment</button>
    </form>
</template>


<style lang="scss" scoped></style>