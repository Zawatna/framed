import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"

class AlbumTagsService{
    async deleteAlbumTag(albumTagId, userId) {
        const AlbumTag = await dbContext.AlbumTag.findById(albumTagId).populate('tag')
        if(AlbumTag.creatorId != userId) throw new Forbidden("You cannot delete another users album tag!")
        AlbumTag.deleteOne()
        return `Album tag ${AlbumTag.tag.name} has been deleted!`
    }
    async createAlbumTag(tagData) {
        const albumTag = await dbContext.AlbumTag.create(tagData)
        await albumTag.populate('tag')
        return albumTag
    }

}
export const albumTagsService = new AlbumTagsService()