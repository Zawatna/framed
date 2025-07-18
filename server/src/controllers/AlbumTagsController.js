import { Auth0Provider } from "@bcwdev/auth0provider/lib/Auth0Provider.js";
import BaseController from "../utils/BaseController.js";
import { albumTagsService } from "../services/AlbumTagsService.js";

export class AlbumTagsController extends BaseController{
    constructor(){
        super('api/albumtags')
        this.router
        .get('/:tagId/albums', this.getAlbumsbyTagId)
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createAlbumTag)
        .delete('/:albumTag', this.deleteAlbumTag)
    }

        async getAlbumsbyTagId(request, response, next) {
            try {
                const tagId = request.params.tagId
                const albums = await albumTagsService.getAlbumsbyTagId(tagId)
                response.send(albums)
            } catch (error) {
                next(error)
            }
        }

    async deleteAlbumTag(request, response, next) {
        const albumTagId = request.params.albumTag
        const userId = request.userInfo.id
        try {
            const deleteAlbumTag = await albumTagsService.deleteAlbumTag(albumTagId, userId)
            response.send(deleteAlbumTag)
        } catch (error) {
            next(error)
        }
    }
    async createAlbumTag(request, response, next) {
        try {
            const tagData = request.body
            const userId = request.userInfo.id
            tagData.creatorId = userId
            const tag = await albumTagsService.createAlbumTag(tagData)
            response.send(tag)
        } catch (error) {
            next(error)
        }
    }
}