import { Auth0Provider } from "@bcwdev/auth0provider/lib/Auth0Provider.js";
import BaseController from "../utils/BaseController.js";
import { albumCommentsService } from "../services/AlbumCommentsService.js";
import { logger } from "../utils/Logger.js";


export class AlbumCommentsController extends BaseController{
    constructor(){
        super('api/albumcomments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createAlbumComment)
            .delete('/:commentId', this.deleteAlbumComment)
    }
    async deleteAlbumComment(request, response, next) {
        try {
          const albumCommentId = request.params.commentId
          const userId = request.userInfo.id
          const deletedComment = await albumCommentsService.deleteAlbumComment(albumCommentId, userId)
          response.send(deletedComment)
        }
        catch (error){
          next(error);
        }
    }

    async createAlbumComment(request, response, next) {
        logger.log('album comment incoming!')
        try {
            const commentBody = request.body
            const userId = request.userInfo.id
            commentBody.creatorId = userId
            const albumComment = await albumCommentsService.createAlbumComment(commentBody)
            response.send(albumComment)
        } catch (error) {
            next(error)
        }
    }
}