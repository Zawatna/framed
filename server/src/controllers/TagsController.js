import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { tagsService } from "../services/TagsService.js";

export class TagsController extends BaseController{
    constructor(){
        super('api/tags')
        this.router
        .get('', this.getAllTags)
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createTag)
        .delete('/:tagId', this.deleteTag)
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
}