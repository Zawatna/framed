import { AppState } from "@/AppState.js"
import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { PhotoComment } from "@/models/Comment.js"

class PhotoCommentsService {
    async deletePhotoComment(photoCommentId) {
        const response = await api.delete(`api/photocomments/${photoCommentId}`);
        logger.log('deleted photocomment💥💥💬', response.data);
        const photoComments = AppState.photoComments;
        const photoCommentsIndex = photoComments.findIndex((photoComment) => photoComment.id == photoCommentId)
        photoComments.splice(photoCommentsIndex, 1)
    }
    async createComment(editableCommentData) {
        const response = await api.post('api/photocomments', editableCommentData)
        logger.log('✏️💬😀 Created Comment', response.data)
    }
    async getPhotoComments(photoId) {
        // logger.log('Service is getting photo comments 🏃‍♀️🏃‍♀️🖼️💬🏃‍♀️', photoId)
        AppState.photoComments = []
        const response = await api.get(`api/photos/${photoId}/comments`)
        logger.log('Got photocomments by photo ID 🏃‍♀️🖼️💬💬🪪😀', response.data)
        const photoComments = response.data.map(pojo => new PhotoComment(pojo))
        AppState.photoComments = photoComments

    }
}

export const photoCommentsService = new PhotoCommentsService()