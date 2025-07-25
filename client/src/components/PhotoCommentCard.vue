<script setup>
import { AppState } from "@/AppState.js";
import { PhotoComment } from "@/models/Comment.js";
import { photoCommentsService } from "@/services/PhotoCommentsService.js";
import { logger } from "@/utils/Logger.js";
import { Pop } from "@/utils/Pop.js";
import { computed } from "vue";

const props = defineProps({
    photoComment: { type: PhotoComment, required: true },
});

async function deletePhotoComment() {
    logger.log('deleting comment 🏃‍♀️💥💬')
    const confirmed = await Pop.confirm(`Are you sure you want to delete your comment ${props.photoComment.body}`)
    if (!confirmed) {
        return
    }
    try {
        await photoCommentsService.deletePhotoComment(props.photoComment.id)
    } catch (error) {
        Pop.error(error);
        logger.error('COULD NOT DELETE COMMENT🥹', error)
    }
}

const account = computed(() => AppState.account)

</script>

<template>
    <section>
        <div class="row mb-0">
            <div class="col-1 d-flex align-items-center">
                <img class="comment-creator-picture m-2" :src="photoComment.creator.picture"
                    alt="Comment creator's photo">
            </div>
            <div class="col-11">
                <div class="d-flex flex-column m-2 ms-5">
                    <h5 class="card-title text-start mb-2">{{ photoComment.creator.name }}</h5>
                    <div class="card-body bg-secondary p-2 comment-container">
                        <p class="card-text text-start">{{ photoComment.body }}
                            <span @click="deletePhotoComment()" v-if="account?.id == photoComment.creatorId"
                                class="button"><i class="mdi mdi-delete text-warning"></i></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.comment-creator-picture {
    height: 8dvh;
    max-width: auto;
    aspect-ratio: 1/1;
    border-radius: 50%;
    border-width: 3px !important;
    border-style: solid;
    border-color: #F5F5F5;
}

.comment-container {
    width: 98%;
    color: #1E1E1E;
    border-radius: 20px;
    border-width: 2px;
    border-style: solid;
    border-color: #1E1E1E;
    font-weight: 400;
}
</style>