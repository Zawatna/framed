import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"

class AlbumTagsService {
    async getAlbumTagsCountByProfileId(profileId) {
        const albumTags = await dbContext.AlbumTags.find({ creatorId: profileId }).populate('tag')
        const tagNames = await albumTags.map(albumTag => ({ name: albumTag.tag.name }))
        const names = await tagNames.map(data => data.name)
        return names
    }

    async getAlbumsbyTagId(tagId) {
        const tags = await dbContext.AlbumTags.find({ tagId: tagId }).populate('album')
        return tags;
    }

    async deleteAlbumTag(albumTagId, userId) {
        const albumTag = await dbContext.AlbumTags.findById(albumTagId).populate(
            "tag"
        );
        if (albumTag.creatorId != userId)
            throw new Forbidden("You cannot delete another users album tag!");
        albumTag.deleteOne();
        return `Album tag ${albumTag.tag.name} has been deleted!`;
    }
    async createAlbumTag(tagData) {
        const albumTag = await dbContext.AlbumTags.create(tagData);
        return albumTag;
    }
}
export const albumTagsService = new AlbumTagsService()