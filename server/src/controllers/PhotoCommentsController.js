import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { logger } from "../utils/Logger.js";
import { photoCommentsService } from "../services/PhotoCommentsService.js";

export class PhotoCommentsController extends BaseController {
    constructor() {
        super('api/photocomments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createPhotoComment)

    }

    async createPhotoComment(request, response, next) {
        logger.log('create photocomment 🏃‍♀️🖼️💬')
        try {
            const photoCommentData = request.body
            const userId = request.userInfo.id
            photoCommentData.creatorId = userId
            const photoComment = await photoCommentsService.createPhotoComment(photoCommentData)
            response.send(photoComment)
        } catch (error) {
            next(error)
        }

    }



}