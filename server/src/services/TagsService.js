import { dbContext } from "../db/DbContext.js"

class TagsService {
    async checkForNewTags(tags) {
        const currentTags = dbContext.Tags.find()
    }
    async deleteTag(tagId) {
        const deletedTag = await dbContext.Tags.findById(tagId)
        await deletedTag.deleteOne()
        return `${deletedTag.name} has been deleted!`
    }
    async getAllTags() {
        const tags = await dbContext.Tags.find()
        return tags
    }

    async createTag(tagData) {
        const tag = await dbContext.Tags.create(tagData)
        return tag
    }

}

export const tagsService = new TagsService()