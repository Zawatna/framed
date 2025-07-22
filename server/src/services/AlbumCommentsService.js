import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"

class AlbumCommentsService {
    async deleteAlbumComment(albumCommentId, userId) {
        const albumComment = await dbContext.AlbumComments.findById(albumCommentId)
        if(albumComment == null) throw new BadRequest('No comment with that id')
        if(albumCommentId.creatorId != userId) throw new Forbidden('You cannot delete another users comment')
        await albumComment.deleteOne()
        return `the comment with an id of ${albumCommentId} has been deleted!`
    }

    async createAlbumComment(commentBody) {
        const albumComment = await dbContext.AlbumComments.create(commentBody)
        albumComment.populate('creator')
        return albumComment
    }


}

export const albumCommentsService = new AlbumCommentsService()