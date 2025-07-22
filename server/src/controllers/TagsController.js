import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { tagsService } from "../services/TagsService.js";
import { albumTagsService } from "../services/AlbumTagsService.js";
import { photoTagsService } from "../services/PhotoTagsService.js"

export class TagsController extends BaseController {
    constructor() {
        super('api/tags')
        this.router
            .get('', this.getAllTags)
            .get('/:tagId/albums', this.getAlbumsbyTagId)
            .get('/:tagId/photos', this.getPhotobyTagId)
            .get('/search', this.getTagsByQuery)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTag)
            .delete('/:tagId', this.deleteTag)
    }
    async getPhotobyTagId(request, response, next) {
        try {
            const tagId = request.params.tagId
            const photos = await photoTagsService.getPhotobyTagId(tagId)
            response.send(photos)
        } catch (error) {
            next(error)
        }
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

    async deleteTag(request, response, next) {
        const tagId = request.params.tagId
        try {
            const deleteTag = await tagsService.deleteTag(tagId)
            response.send(deleteTag)
        } catch (error) {
            next(error)
        }
    }
    async getAllTags(request, response, next) {
        try {
            const tags = await tagsService.getAllTags()
            response.send(tags)
        } catch (error) {
            next(error)
        }
    }
    async createTag(request, response, next) {
        const tagData = request.body
        try {
            const newTag = await tagsService.createTag(tagData)
            response.send(newTag)
        } catch (error) {
            next(error)
        }
    }

    async getTagsByQuery(request, response, next) {
        try {
            const tagsQuery = request.query.query;
            const photoTags = await tagsService.getPhotoTagsByQuery(tagsQuery);
            const albumTags = await tagsService.getAlbumTagsByQuery(tagsQuery);
            const combinedTagsArr = await [photoTags, albumTags]
            response.send(combinedTagsArr);
        } catch (error) {
            next(error);
        }
    }
}