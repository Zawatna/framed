import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { logger } from "../utils/Logger.js";

class PhotoCommentsService {

    async deletePhotoComment(photoCommentId, userId) {
        logger.log('trying to delete Photo comment  🏃‍♀️💥🖼️💬')
        const photoComment = await dbContext.PhotoComments.findById(photoCommentId);

        if (photoComment == null)
            throw new BadRequest('No comment found')

        if (photoCommentId.creatorId != userId)
            throw new Forbidden("You cannot delete another user's comment!");

        await photoComment.deleteOne();

        return `The comment "${photoComment.body}" has been deleted!`



    }
    async createPhotoComment(photoCommentData) {

        // logger.log('creating photo comments🏃‍♀️🏃‍♀️🖼️💬💬😀', photoCommentData)
        const photoComment = await dbContext.PhotoComments.create(photoCommentData)
        await photoComment.populate('creator')
        return photoComment
    }


}

export const photoCommentsService = new PhotoCommentsService()