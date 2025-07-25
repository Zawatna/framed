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
        <textarea v-model="editableCommentData.body" class="form-control comment-container mt-3"
            placeholder="Add a comment to the conversation..." id="photo-comment" maxlength="250" required></textarea>
        <label for="photo-comment"></label>
        <button class="btn btn-success m-3" type="submit">Submit Comment</button>
    </form>
</template>


<style lang="scss" scoped>
.comment-container {
    background-color: #BEBEBE;
    color: #1E1E1E;
    width: 460px;
    border-radius: 20px;
    border-width: 2px;
    border-style: solid;
    border-color: #1E1E1E;
    font-weight: 500;

}
</style>