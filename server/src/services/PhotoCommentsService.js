import { dbContext } from "../db/DbContext.js";
import { logger } from "../utils/Logger.js";

class PhotoCommentsService {
    async createPhotoComment(photoCommentData) {

        // logger.log('creating photo comments🏃‍♀️🏃‍♀️🖼️💬💬😀', photoCommentData)
        const photoComment = await dbContext.PhotoComments.create(photoCommentData)
        await photoComment.populate('creator')
        return photoComment
    }


}

export const photoCommentsService = new PhotoCommentsService()